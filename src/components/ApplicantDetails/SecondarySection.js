import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateStudentSecondaryEducation } from "../../api/api"; // Adjust the import path

const SecondaryEducationSection = ({ educationDetails = [], studentId }) => {
  const queryClient = useQueryClient();
  
  const [records, setRecords] = useState(educationDetails);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newRecord, setNewRecord] = useState({
    school: "",
    qualification: "",
    country: "",
    period: "",
  });


  const handleChange = (e, index) => {
    const updated = records.map((rec, i) =>
      i === index ? { ...rec, [e.target.name]: e.target.value } : rec
    );
    setRecords(updated);
  };

  const handleNewChange = (e) => {
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setEditingIndex(null);
    await updateRecordsOnServer(records);
  };

  const handleAdd = async () => {
    if (!newRecord.school || !newRecord.qualification) return;
    const updated = [...records, newRecord];
    setRecords(updated);
    setNewRecord({ school: "", qualification: "", country: "", period: "" });
    await updateRecordsOnServer(updated);
  };

  const handleDelete = async (index) => {
    const updated = records.filter((_, i) => i !== index);
    setRecords(updated);
    await updateRecordsOnServer(updated);
  };

  const handleCancel = () => {
    setRecords(educationDetails);
    setEditingIndex(null);
  };

  const updateRecordsOnServer = async (updatedRecords) => {
    try {
      await updateStudentSecondaryEducation(studentId, updatedRecords);
      toast.success("Secondary education updated!");
      queryClient.invalidateQueries(["studentSecondaryEducation", studentId]);
    } catch (error) {
      handleCancel(); // Reset to original records on error
      toast.error("Failed to update: " + error.message);
      console.error("Update failed", error);
    }
  };

  return (
    <div className="Academic-section">
      <div className="section-header">
        <h4 className="section-title">Secondary Education</h4>
        <button className="add-button" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Add Secondary Education
        </button>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Secondary School</th>
              <th>Qualification</th>
              <th>Country</th>
              <th>Period</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                {editingIndex === index ? (
                  <>
                    <td><input name="school" value={record.school} onChange={(e) => handleChange(e, index)} /></td>
                    <td><input name="qualification" value={record.qualification} onChange={(e) => handleChange(e, index)} /></td>
                    <td><input name="country" value={record.country} onChange={(e) => handleChange(e, index)} /></td>
                    <td><input name="period" value={record.period} onChange={(e) => handleChange(e, index)} /></td>
                    <td>
                      <button onClick={handleSave}><FaSave /></button>
                      <button onClick={handleCancel}><FaTimes /></button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{record.school}</td>
                    <td>{record.qualification}</td>
                    <td>{record.country}</td>
                    <td>{record.period}</td>
                    <td>
                      <button className="edit-btn" onClick={() => setEditingIndex(index)}><FaEdit /></button>
                      <button className="delete-btn" onClick={() => handleDelete(index)}><FaTrash /></button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            <tr>
              <td><input name="school" value={newRecord.school} onChange={handleNewChange} /></td>
              <td><input name="qualification" value={newRecord.qualification} onChange={handleNewChange} /></td>
              <td><input name="country" value={newRecord.country} onChange={handleNewChange} /></td>
              <td><input name="period" value={newRecord.period} onChange={handleNewChange} /></td>
              <td><button onClick={handleAdd}>Add</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SecondaryEducationSection;
