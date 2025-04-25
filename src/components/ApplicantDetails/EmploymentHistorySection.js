import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateStudentEmploymentHistory } from "../../api/api"; // Make sure this function exists

const EmploymentHistorySection = ({ employmentHistory = [], studentId }) => {
  const queryClient = useQueryClient();
  
  const [records, setRecords] = useState(employmentHistory);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newRecord, setNewRecord] = useState({
    employer: "",
    period: "",
    position: "",
    nature_of_work: "",
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
    if (!newRecord.employer || !newRecord.position) return;
    const updated = [...records, newRecord];
    setRecords(updated);
    setNewRecord({ employer: "", period: "", position: "", nature_of_work: "" });
    await updateRecordsOnServer(updated);
  };

  const handleDelete = async (index) => {
    const updated = records.filter((_, i) => i !== index);
    setRecords(updated);
    await updateRecordsOnServer(updated);
  };

  const handleCancel = () => {
    setRecords(employmentHistory);
    setEditingIndex(null);
  };

  const updateRecordsOnServer = async (updatedRecords) => {
    try {
      await updateStudentEmploymentHistory(studentId, updatedRecords);
      toast.success("Employment history updated!");
      queryClient.invalidateQueries(["studentEmploymentHistory", studentId]);
    } catch (error) {
      handleCancel();
      toast.error("Failed to update: " + error.message);
      console.error("Update failed", error);
    }
  };

  return (
    <div className="Academic-section">
      <div className="section-header">
        <h4 className="section-title">Employment History</h4>
        <button className="add-button" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Add Employment
        </button>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Employer</th>
              <th>Period</th>
              <th>Position</th>
              <th>Nature of Work</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                {editingIndex === index ? (
                  <>
                    <td><input name="employer" value={record.employer} onChange={(e) => handleChange(e, index)} /></td>
                    <td><input name="period" value={record.period} onChange={(e) => handleChange(e, index)} /></td>
                    <td><input name="position" value={record.position} onChange={(e) => handleChange(e, index)} /></td>
                    <td><input name="nature_of_work" value={record.nature_of_work} onChange={(e) => handleChange(e, index)} /></td>
                    <td>
                      <button onClick={handleSave}><FaSave /></button>
                      <button onClick={handleCancel}><FaTimes /></button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{record.employer}</td>
                    <td>{record.period}</td>
                    <td>{record.position}</td>
                    <td>{record.nature_of_work}</td>
                    <td>
                      <button className="edit-btn" onClick={() => setEditingIndex(index)}><FaEdit /></button>
                      <button className="delete-btn" onClick={() => handleDelete(index)}><FaTrash /></button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            <tr>
              <td><input name="employer" value={newRecord.employer} onChange={handleNewChange} /></td>
              <td><input name="period" value={newRecord.period} onChange={handleNewChange} /></td>
              <td><input name="position" value={newRecord.position} onChange={handleNewChange} /></td>
              <td><input name="nature_of_work" value={newRecord.nature_of_work} onChange={handleNewChange} /></td>
              <td><button onClick={handleAdd}>Add</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmploymentHistorySection;
