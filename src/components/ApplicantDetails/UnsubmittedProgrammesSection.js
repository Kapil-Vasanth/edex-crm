import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes, FaArrowUp, FaArrowDown, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { updateStudentUnsubmittedProgrammes } from "../../api/api";

const UnsubmittedProgrammesSection = ({ programmes = [], studentId }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [newProgramme, setNewProgramme] = useState({
    id: "",
    programme: "",
    pathway: "",
    year: "",
    intake: "",
    managed_by: "",
  });

  const [programmeList, setProgrammeList] = useState(programmes);
  const queryClient = useQueryClient();

  useEffect(() => {
    setProgrammeList(programmes || []);
  }, [programmes]);

  const handleChange = (e, index) => {
    const updated = programmeList.map((prog, i) =>
      i === index ? { ...prog, [e.target.name]: e.target.value } : prog
    );
    setProgrammeList(updated);
  };

  const handleNewChange = (e) => {
    setNewProgramme({ ...newProgramme, [e.target.name]: e.target.value });
  };

  const handleSave = async (index) => {
    setEditingIndex(null);
    await updateOnServer(programmeList);
  };

  const handleDelete = async (index) => {
    const updated = programmeList.filter((_, i) => i !== index);
    setProgrammeList(updated);
    await updateOnServer(updated);
  };

  const handleAdd = async () => {
    if (!newProgramme.programme || !newProgramme.id) return;
    const updated = [...programmeList, newProgramme];
    setProgrammeList(updated);
    setNewProgramme({
      id: "",
      programme: "",
      pathway: "",
      year: "",
      intake: "",
      managed_by: "",
    });
    await updateOnServer(updated);
  };

  const updateOnServer = async (data) => {
    try {
      await updateStudentUnsubmittedProgrammes(studentId, data);
      queryClient.invalidateQueries(["studentProgrammes", studentId]);
      toast.success("Programmes updated!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update programmes.");
    }
  };

  const handleCancel = () => {
    setProgrammeList(programmes);
    setEditingIndex(null);
  };

  const movePriority = (index, direction) => {
    const newList = [...programmeList];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < newList.length) {
      [newList[index], newList[newIndex]] = [newList[newIndex], newList[index]];
      setProgrammeList(newList);
      updateOnServer(newList);
    }
  };

  return (
    <div className="programmes-section">
      <div className="section-header">
        <h4 className="section-title">Unsubmitted Programmes</h4>
        <button className="add-button" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Add Programme
        </button>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Programme</th>
              <th>Pathway</th>
              <th>Year</th>
              <th>Intake</th>
              <th>Managed By</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {programmeList.map((prog, index) => (
    editingIndex === index ? (
      <tr key={index}>
        <td><input name="id" value={prog.id || ''} onChange={(e) => handleChange(e, index)} /></td>
        <td><input name="programme" value={prog.programme || ''} onChange={(e) => handleChange(e, index)} /></td>
        <td><input name="pathway" value={prog.pathway || ''} onChange={(e) => handleChange(e, index)} /></td>
        <td><input name="year" value={prog.year || ''} onChange={(e) => handleChange(e, index)} /></td>
        <td><input name="intake" value={prog.intake || ''} onChange={(e) => handleChange(e, index)} /></td>
        <td><input name="managed_by" value={prog.managed_by || ''} onChange={(e) => handleChange(e, index)} /></td>
        <td>{index + 1}</td>
        <td>
          <button className="save-btn" onClick={() => handleSave(index)}><FaSave /></button>
          <button className="cancel-btn" onClick={handleCancel}><FaTimes /></button>
        </td>
      </tr>
    ) : (
      <tr key={index}>
        <td>{prog.id}</td>
        <td>{prog.programme}</td>
        <td>{prog.pathway}</td>
        <td>{prog.year}</td>
        <td>{prog.intake}</td>
        <td>{prog.managed_by}</td>
        <td>{index + 1}</td>
        <td className="action-view">
          <div className="action-buttons">
            <button className="priority-btn" onClick={() => movePriority(index, "up")}><FaArrowUp /></button>
            <button className="priority-btn" onClick={() => movePriority(index, "down")}><FaArrowDown /></button>
            <button className="edit-btn" onClick={() => setEditingIndex(index)}><FaEdit /></button>
            <button className="delete-btn" onClick={() => handleDelete(index)}><FaTrash /></button>
          </div>
        </td>
      </tr>
    )
  ))}

  {/* Your Add New Row */}
  <tr>
    <td><input name="id" value={newProgramme.id} onChange={handleNewChange} /></td>
    <td><input name="programme" value={newProgramme.programme} onChange={handleNewChange} /></td>
    <td><input name="pathway" value={newProgramme.pathway} onChange={handleNewChange} /></td>
    <td><input name="year" value={newProgramme.year} onChange={handleNewChange} /></td>
    <td><input name="intake" value={newProgramme.intake} onChange={handleNewChange} /></td>
    <td><input name="managed_by" value={newProgramme.managed_by} onChange={handleNewChange} /></td>
    <td></td>
    <td>
      <button className="add-btn" onClick={handleAdd}>Add</button>
    </td>
  </tr>
</tbody>

        </table>
      </div>
    </div>
  );
};

export default UnsubmittedProgrammesSection;
