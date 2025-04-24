import React, { useState } from "react";
import { updateStudent } from "../../api/api";
import {  useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function ApplicantInformation({applicantDetail}) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(applicantDetail);
  const handleEditToggle = () => setIsEditing((prev) => !prev);

  const [avatarPreview, setAvatarPreview] = useState(formData.avatar_url || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/jpeg") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          avatar_url: reader.result, // Save base64 in formData
        }));
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a JPG image.");
    }
  };


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

 

  const handleSave = async () => {
    try {
      const updatedStudent = await updateStudent(formData._id, formData);
      console.log("Updated Data:", updatedStudent);
      queryClient.invalidateQueries(["applicants", formData._id]); // Invalidate the query to refetch data
      setIsEditing(false);
    } catch (error) {
      handleCancel(); // Reset to original data on error
      toast.error("Error saving changes. Please try again.");
      console.error("Error saving data:", error);
    }
  };

  const handleCancel = () => {
    setFormData(applicantDetail); // Reset to original data
    setIsEditing(false);
  };

  // Config to define which fields are selects
  const fieldConfig = {
    gender: {
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    
  };

  const renderField = (label, name) => {
    const config = fieldConfig[name];

    return (
      <div className="info-item" key={name}>
        <span className="info-label">{label}</span>
        {isEditing ? (
          config?.type === "select" ? (
            <select
              name={name}
              value={formData[name] || ""}
              onChange={handleChange}
              className="info-edit-input"
            >
              <option value="">-- Select --</option>
              {config.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              name={name}
              value={formData[name] || ""}
              onChange={handleChange}
              className="info-edit-input"
            />
          )
        ) : (
          <span className="info-value">{formData[name]}</span>
        )}
      </div>
    );
  };

  return (
    <div className="details-responsive">
      <div className="applicant-info-container">
        <div className="applicant-info-header">
          <h3 className="info-title">Personal Information</h3>
          <div className="divider"></div>
          {!isEditing ? (
            <button onClick={handleEditToggle} className="edit-btn">
              Edit
            </button>
          ) : (
            <div className="edit-actions">
              <button onClick={handleSave} className="save-btn">
                Save
              </button>
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="profile-photo-section">
          <h4 className="info-title">Profile Photo</h4>
          <div className="profile-photo-wrapper">
            <img
              src={avatarPreview || "https://www.w3schools.com/howto/img_avatar.png"}
              alt="Profile"
              className="profile-photo"
            />
            {isEditing && (
              <input
                type="file"
                accept="image/jpeg"
                onChange={handleImageChange}
                className="photo-upload-input"
              />
            )}
          </div>
        </div>


        <div className="info-grid">
          
          {renderField("Student ID", "student_id")}
          {renderField("First Name", "first_name")}
          {renderField("Last Name", "last_name")}
          {renderField("University", "university")}
          {renderField("Date of Birth", "dob")}
          {renderField("Gender", "gender")}
          {renderField("Country", "country")}
          {renderField("Citizenship", "citizenship")}
          {renderField("Email", "email")}
          {renderField("Phone No.", "phone")}
          {renderField("Passport No.", "passport")}
          {renderField("IELTS/PTE", "ielts")}
          {renderField("Application Status", "status")}
        </div>
      </div>
    </div>
  );
}

export default ApplicantInformation;
