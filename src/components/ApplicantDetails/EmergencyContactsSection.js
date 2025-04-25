import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { updateStudentEmergencyContacts } from "../../api/api"; // Adjust path as needed

const EmergencyContactsSection = ({ emergencyContacts = [], studentId }) => {
  const queryClient = useQueryClient();
  const [contacts, setContacts] = useState(emergencyContacts);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newContact, setNewContact] = useState({ name: "", relationship: "", phone_number: "" });

  useEffect(() => {
    const normalized = emergencyContacts.map(contact => ({
      name: contact.name || "",
      relationship: contact.relationship || "",
      phone_number: contact.phone_number || ""
    }));
    setContacts(normalized);
  }, [emergencyContacts]);
  

  const handleChange = (e, index) => {
    const updated = contacts.map((contact, i) =>
      i === index ? { ...contact, [e.target.name]: e.target.value } : contact
    );
    setContacts(updated);
  };

  const handleNewChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setEditingIndex(null);
    await updateContactsOnServer(contacts);
  };

  const handleDelete = async (index) => {
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
    await updateContactsOnServer(updated);
  };

  const handleAdd = async () => {
    if (!newContact.name || !newContact.relationship || !newContact.phone_number) return;
    const updated = [...contacts, newContact];
    setContacts(updated);
    setNewContact({ name: "", relationship: "", phone_number: "" });
    await updateContactsOnServer(updated);
  };

  const updateContactsOnServer = async (updatedContacts) => {
    try {
      await updateStudentEmergencyContacts(studentId, updatedContacts);
      toast.success("Emergency contacts updated successfully!");
      queryClient.invalidateQueries(["studentEmergencyContacts", studentId]);
    } catch (error) {
      handleCancel(); // Reset to original contacts on error
      toast.error("Failed to update emergency contacts: " + error.message);
      console.error("Update error:", error);
    }
  };

  const handleCancel = () => {
    setContacts(emergencyContacts); // Reset to the original contact details
    setEditingIndex(null);
  };

  return (
    <div className="contact-section">
      <div className="section-header">
        <h4 className="section-title">Emergency Contacts</h4>
        <button className="add-button" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Add Contact
        </button>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Relationship</th>
              <th>Phone Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                {editingIndex === index ? (
                  <>
                    <td><input name="name" value={contact.name} onChange={(e) => handleChange(e, index)} /></td>
                    <td><input name="relationship" value={contact.relationship} onChange={(e) => handleChange(e, index)} /></td>
                    <td><input name="phone_number" value={contact.phone_number} onChange={(e) => handleChange(e, index)} /></td>
                    <td>
                      <button className="save-btn" onClick={handleSave}><FaSave /></button>
                      <button className="cancel-btn" onClick={() => handleCancel()}><FaTimes /></button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{contact.name}</td>
                    <td>{contact.relationship}</td>
                    <td>{contact.phone_number}</td>
                    <td>
                      <button className="edit-btn" onClick={() => setEditingIndex(index)}><FaEdit /></button>
                      <button className="delete-btn" onClick={() => handleDelete(index)}><FaTrash /></button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            <tr>
              <td><input name="name" value={newContact.name} onChange={handleNewChange} /></td>
              <td><input name="relationship" value={newContact.relationship} onChange={handleNewChange} /></td>
              <td><input name="phone_number" value={newContact.phone_number} onChange={handleNewChange} /></td>
              <td><button className="add-btn" onClick={handleAdd}>Add</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmergencyContactsSection;
