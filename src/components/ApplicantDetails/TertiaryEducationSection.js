import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";
import { updateStudentTertiaryEducation } from "../../api/api"; // Adjust path

const TertiaryEducationSection = ({ tertiaryEducation = [], studentId }) => {
  const queryClient = useQueryClient();

  const [records, setRecords] = useState(tertiaryEducation);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newRecord, setNewRecord] = useState({
    institution: "",
    qualification: "",
    country: "",
    period: "",
    completed: false,
    awaiting_results: false,
  });

  const handleChange = (e, index) => {
    const updated = records.map((rec, i) =>
      i === index ? { ...rec, [e.target.name]: e.target.value } : rec
    );
    setRecords(updated);
  };

  const handleCheckboxChange = (index, field) => {
    const updated = records.map((rec, i) =>
      i === index ? { ...rec, [field]: !rec[field] } : rec
    );
    setRecords(updated);
  };

  const handleNewChange = (e) => {
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
  };

  const handleNewCheckboxChange = (field) => {
    setNewRecord((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = async () => {
    setEditingIndex(null);
    await updateRecordsOnServer(records);
  };

  const handleAdd = async () => {
    if (!newRecord.institution || !newRecord.qualification) return;
    const updated = [...records, newRecord];
    setRecords(updated);
    setNewRecord({
      institution: "",
      qualification: "",
      country: "",
      period: "",
      completed: false,
      awaiting_results: false,
    });
    await updateRecordsOnServer(updated);
  };

  const handleDelete = async (index) => {
    const updated = records.filter((_, i) => i !== index);
    setRecords(updated);
    await updateRecordsOnServer(updated);
  };

  const handleCancel = () => {
    setRecords(tertiaryEducation);
    setEditingIndex(null);
  };

  const updateRecordsOnServer = async (updatedRecords) => {
    try {
      await updateStudentTertiaryEducation(studentId, updatedRecords);
      toast.success("Tertiary education updated!");
      queryClient.invalidateQueries(["studentTertiaryEducation", studentId]);
    } catch (error) {
      handleCancel();
      toast.error("Failed to update: " + error.message);
      console.error("Update failed", error);
    }
  };

  return (
    <div className="Academic-section">
      <div className="section-header">
        <h4 className="section-title">Tertiary Education</h4>
        <button className="add-button" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Add Tertiary Education
        </button>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Tertiary Institution</th>
              <th>Qualification</th>
              <th>Country</th>
              <th>Period</th>
              <th>Completed</th>
              <th>Awaiting Results</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                {editingIndex === index ? (
                  <>
                    <td>
                      <input
                        name="institution"
                        value={record.institution}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        name="qualification"
                        value={record.qualification}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        name="country"
                        value={record.country}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        name="period"
                        value={record.period}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleCheckboxChange(index, "completed")}>
                        {record.completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleCheckboxChange(index, "awaiting_results")}>
                        {record.awaiting_results ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                      </button>
                    </td>
                    <td>
                      <button onClick={handleSave}><FaSave /></button>
                      <button onClick={handleCancel}><FaTimes /></button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{record.institution}</td>
                    <td>{record.qualification}</td>
                    <td>{record.country}</td>
                    <td>{record.period}</td>
                    <td>{record.completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</td>
                    <td>{record.awaiting_results ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</td>
                    <td>
                      <button className="edit-btn" onClick={() => setEditingIndex(index)}>
                        <FaEdit />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(index)}>
                        <FaTrash />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            <tr>
              <td>
                <input
                  name="institution"
                  value={newRecord.institution}
                  onChange={handleNewChange}
                />
              </td>
              <td>
                <input
                  name="qualification"
                  value={newRecord.qualification}
                  onChange={handleNewChange}
                />
              </td>
              <td>
                <input
                  name="country"
                  value={newRecord.country}
                  onChange={handleNewChange}
                />
              </td>
              <td>
                <input
                  name="period"
                  value={newRecord.period}
                  onChange={handleNewChange}
                />
              </td>
              <td>
                <button onClick={() => handleNewCheckboxChange("completed")}>
                  {newRecord.completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </button>
              </td>
              <td>
                <button onClick={() => handleNewCheckboxChange("awaiting_results")}>
                  {newRecord.awaiting_results ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </button>
              </td>
              <td>
                <button onClick={handleAdd}>Add</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TertiaryEducationSection;
