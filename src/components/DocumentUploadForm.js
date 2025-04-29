import React, { useState } from "react";
import { getStudentById, uploadStudentDocument } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const documentOptions = [
  { value: 1, label: "Application For Enrolment" },
  { value: 82, label: "COMPACT Application Form" },
  { value: 92, label: "Passport" },
  { value: 91, label: "Birth Certificate" },
  { value: 152, label: "Certificate of Citizenship" },
  { value: 153, label: "Marriage Certificate" },
  { value: 58, label: "Valid Visa" },
  { value: 141, label: "OOP" },
  { value: 90, label: "University Workshop Form" },
  { value: 166, label: "UAO Tertiary" },
  { value: 4, label: "Tertiary Results" },
  { value: 167, label: "UAO Secondary" },
  { value: 5, label: "Secondary Results" },
  { value: 6, label: "Overseas Qualifications" },
  { value: 7, label: "English Language Results" },
  { value: 10, label: "Cover Sheet" },
  { value: 9, label: "References" },
  { value: 11, label: "Addendum" },
  { value: 12, label: "Student Cover Letter" },
  { value: 13, label: "CV" },
  { value: 14, label: "Accommodation Application" },
  { value: 8, label: "Miscellaneous" },
  { value: 15, label: "Third Party Release Authorisation" },
  { value: 16, label: "Multiple Application Status" },
  { value: 17, label: "Application for Academic Credit" },
  { value: 18, label: "Insurance Certificate" },
  { value: 19, label: "Medical Reports" },
  { value: 20, label: "Police Clearance" },
];

export default function DocumentUploadForm() {
  const { id: applicantId } = useParams();
  const navigate = useNavigate();

  const { data: applicant, isLoading, isError, error } = useQuery({
    queryKey: ['applicant', applicantId],
    queryFn: () => getStudentById(applicantId),
    enabled: !!applicantId,
  });

  const [formData, setFormData] = useState({
    documentType: "",
    comment: "",
    file: null,
    certified: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedOption = documentOptions.find(
      (opt) => opt.value.toString() === formData.documentType
    );

    if (!formData.file) {
      alert("Please select a file.");
      return;
    }

    const fileName = formData.file.name;

    // Construct FormData object
    const uploadData = new FormData();
    uploadData.append("document", formData.file);                     // actual file
    uploadData.append("document_type", selectedOption?.label || "Unknown Document");
    uploadData.append("file_name", fileName);                          
    uploadData.append("certified", formData.certified ? "yes" : "no");
    uploadData.append("certified_by", "");                            
    uploadData.append("certified_date", ""); 
    uploadData.append("expiry_date", "");                              
    uploadData.append("comment", formData.comment || "");             

    try {
      const res = await uploadStudentDocument(applicant._id, uploadData);
      if (!res) throw new Error("Failed to upload");
      toast.success("Document uploaded successfully");
      navigate(`/ApplicantDetails/${applicantId}?tab=documents`);

    } catch (err) {
      console.error(err);
      toast.error("Error uploading document: " + err.message);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching applicant data: {error.message}</div>;

  return (
    <div className="document-upload-container">
      <h2>Upload Document</h2>
      <p>Please fill in the details below to upload your document.</p>
      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Document Type<span className="required">*</span></label>
          <select
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            required
          >
            <option value="">Select document</option>
            {documentOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Comment</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>File<span className="required">*</span></label>
          <input
            type="file"
            name="file"
            accept=".pdf"
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="certified"
              checked={formData.certified}
              onChange={handleChange}
            /> Certified
          </label>
          <div className="certified-info">
            <ul>
              <li>Stamp the copy with your company stamp/name,</li>
              <li>Write 'Certified True Copy of Original' with signature, title, and date</li>
            </ul>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit">Upload</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
