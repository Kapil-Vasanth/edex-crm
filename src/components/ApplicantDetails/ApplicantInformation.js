import React, { useEffect, useState } from "react";
import { updateStudent, uploadStudentAvatar, API } from "../../api/api";
import {  useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function ApplicantInformation({applicantDetail}) {
  console.log("applicant rendered");
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(applicantDetail);
  const handleEditToggle = () => setIsEditing((prev) => !prev);
  
  const [avatarPreview, setAvatarPreview] = useState(
    formData.avatar ? `${API.defaults.baseURL}/${formData.avatar}` : null
  );

  useEffect(() => {
    const currentRole = localStorage.getItem("role");
    if (currentRole === "student") {
      setIsEditing(true);
    }
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "image/jpeg") {
      try {
        const updatedAvatar = await uploadStudentAvatar(formData._id, file);
        console.log(`${API.defaults.baseURL}/${updatedAvatar.avatar}`)
        setAvatarPreview(`${API.defaults.baseURL}/${updatedAvatar.avatar}?t=${Date.now()}`);
        setFormData((prev) => ({
          ...prev,
          avatar: updatedAvatar.avatar,
        }));
        queryClient.invalidateQueries(["applicants", formData._id]); // Invalidate the query to refetch data
        toast.success("Profile photo updated successfully!");
      } catch (error) {
        toast.error("Error uploading profile photo. Please try again.");
      }
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
      toast.success("Updated Personal successfully!");
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
    date_of_form_filed: { type: "date" },
    offer_of_place: { type: "date" },
    dob: { type: "date" },
    funds_loan: { type: "date" },
    funds_direct_deposit: { type: "date" },
    sop : { type: "date" },
    passport_expiry: { type: "date" },
  };

  const renderField = (label, name, onlyForRole = null) => {

    const currentRole = localStorage.getItem("role"); // "agent", "student", etc.

    if (onlyForRole && currentRole !== onlyForRole) {
      return null; // Skip rendering if role doesn't match
    }
    const config = fieldConfig[name];
    const value = formData[name] || "";
  
    const renderInput = () => {
      switch (config?.type) {
        case "select":
          return (
            <select
              name={name}
              value={value}
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
          );
        case "date":
          return (
            <input
              type="date"
              name={name}
              value={value}
              onChange={handleChange}
              className="info-edit-input"
            />
          );
        case "textarea":
          return (
            <textarea
              name={name}
              value={value}
              onChange={handleChange}
              className="info-edit-input"
              rows={3}
            />
          );
        default:
          return (
            <input
              type="text"
              name={name}
              value={value}
              onChange={handleChange}
              className="info-edit-input"
            />
          );
      }
    };
  
    return (
      <div className="info-item" key={name}>
        <span className="info-label">{label}</span>
        {isEditing ? renderInput() : <span className="info-value">{value}</span>}
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
            <div className="edit-actions">
            <button onClick={handleEditToggle} className="edit-btn">
              Edit
            </button>
            </div>
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
          {renderField("College ID", "college_id", "agent")}
          {renderField("First Name", "first_name")}
          {renderField("Last Name", "last_name")}
          {renderField("Institution", "university")}
          {renderField("Date of Birth", "dob")}
          {renderField("Gender", "gender")}
          {renderField("Country", "country")}
          {renderField("Citizenship", "citizenship")}
          {renderField("Email", "email")}
          {renderField("Mobile", "phone")}
          {renderField("Passport#", "passport")}
          {renderField("Passport Expiry", "passport_expiry")}
          {renderField("IELTS/PTE", "ielts")}
          {renderField("Date of Form Filed", "date_of_form_filed", "agent")}
          {renderField("Offer of Place", "offer_of_place", "agent")}
          {renderField("Funds loan", "funds_loan")}
          {renderField("Funds Direct Deposit", "funds_direct_deposit", "agent")}
          {renderField("SOP", "sop", "agent")}
          
        </div>
      </div>
    </div>
  );
}

export default ApplicantInformation;
