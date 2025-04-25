import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateStudentLanguageProficiency } from "../../api/api"; // Ensure this function is defined

const LanguageProficiencySection = ({ languageProficiency = [], studentId }) => {
  const queryClient = useQueryClient();

  const [records, setRecords] = useState(languageProficiency);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newRecord, setNewRecord] = useState({
    language: "",
    description: "",
    yes_no: "Yes",
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
    if (!newRecord.language || !newRecord.description) return;
    const updated = [...records, newRecord];
    setRecords(updated);
    setNewRecord({ language: "", description: "", yes_no: "Yes" });
    await updateRecordsOnServer(updated);
  };

  const handleDelete = async (index) => {
    const updated = records.filter((_, i) => i !== index);
    setRecords(updated);
    await updateRecordsOnServer(updated);
  };

  const handleCancel = () => {
    setRecords(languageProficiency);
    setEditingIndex(null);
  };

  const updateRecordsOnServer = async (updatedRecords) => {
    try {
      await updateStudentLanguageProficiency(studentId, updatedRecords);
      toast.success("Language proficiency updated!");
      queryClient.invalidateQueries(["studentLanguageProficiency", studentId]);
    } catch (error) {
      handleCancel();
      toast.error("Failed to update: " + error.message);
      console.error("Update failed", error);
    }
  };

  return (
    <div className="Academic-section">
      <div className="section-header">
        <h4 className="section-title">Language Proficiency</h4>
        <button className="add-button" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Add Language
        </button>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Language</th>
              <th>Description</th>
              <th>Yes/No</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                {editingIndex === index ? (
                  <>
                    <td><input name="language" value={record.language} onChange={(e) => handleChange(e, index)} /></td>
                    <td><input name="description" value={record.description} onChange={(e) => handleChange(e, index)} /></td>
                    <td>
                      <select name="yes_no" value={record.yes_no} onChange={(e) => handleChange(e, index)}>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={handleSave}><FaSave /></button>
                      <button onClick={handleCancel}><FaTimes /></button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{record.language}</td>
                    <td>{record.description}</td>
                    <td>{record.yes_no}</td>
                    <td>
                      <button className="edit-btn" onClick={() => setEditingIndex(index)}><FaEdit /></button>
                      <button className="delete-btn" onClick={() => handleDelete(index)}><FaTrash /></button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            <tr>
              <td><input name="language" value={newRecord.language} onChange={handleNewChange} /></td>
              <td><input name="description" value={newRecord.description} onChange={handleNewChange} /></td>
              <td>
                <select name="yes_no" value={newRecord.yes_no} onChange={handleNewChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </td>
              <td><button onClick={handleAdd}>Add</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LanguageProficiencySection;
