import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import {  useQueryClient } from "@tanstack/react-query";
import { updateStudentContactDetails } from "../../api/api";
import { toast } from "react-toastify";

const ContactSection = ({ contactDetails = [], studentId }) => {
  const queryClient = useQueryClient();
  const [editingIndex, setEditingIndex] = useState(null);
  const [newContact, setNewContact] = useState({ contact_type: "", name: "", description: "" });
  
  // Prop drilling - use the prop directly
  const [contacts, setContacts] = useState(contactDetails);

  useEffect(() => {
    setContacts(contactDetails); // Update contacts whenever the parent prop changes
  }, [contactDetails]);

  const handleChange = (e, index) => {
    const updated = contacts.map((contact, i) =>
      i === index ? { ...contact, [e.target.name]: e.target.value } : contact
    );
    setContacts(updated);
  };

  const handleNewChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleSave = async (index) => {
    setEditingIndex(null);
    await updateContactsOnServer(contacts);
  };

  const handleDelete = async (index) => {
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
    await updateContactsOnServer(updated);
  };

  const handleAdd = async () => {
    if (!newContact.contact_type || !newContact.name) return;
    const updated = [...contacts, newContact];
    setContacts(updated);
    setNewContact({ contact_type: "", name: "", description: "" });
    await updateContactsOnServer(updated);
  };

  const updateContactsOnServer = async (updatedContacts) => {
    if (!Array.isArray(updatedContacts)) {
      console.error("contact_details must be an array");
      return;
    }

    try {
      const response = await updateStudentContactDetails(studentId, updatedContacts);
      console.log("Contacts updated successfully:", response.data);
      toast.success("Contacts updated successfully!");

      // Invalidate the query so it can refetch the updated contacts from the server
      queryClient.invalidateQueries(["studentContactDetails", studentId]);
    } catch (error) {
      handleCancel(); // Reset to original contacts on error
      toast.error("Error updating contacts: " + error.message);
      console.error("Error updating contacts:", error.message);
    }
  };

  const handleCancel = () => {
    setContacts(contactDetails); // Reset to the original contact details
    setEditingIndex(null);
  };

  return (
    <div className="contact-section">
      <div className="section-header">
        <h4 className="section-title">Phone & Email</h4>
        <button className="add-button" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Add Contact
        </button>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                {editingIndex === index ? (
                  <>
                    <td>
                      <input
                        name="contact_type"
                        value={contact.contact_type}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input name="name" value={contact.name} onChange={(e) => handleChange(e, index)} />
                    </td>
                    <td>
                      <input
                        name="description"
                        value={contact.description}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <button className="save-btn" onClick={() => handleSave(index)}>
                        <FaSave />
                      </button>
                      <button className="cancel-btn" onClick={handleCancel}>
                        <FaTimes />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{contact.contact_type}</td>
                    <td>{contact.name}</td>
                    <td>{contact.description}</td>
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
                <input name="contact_type" value={newContact.contact_type} onChange={handleNewChange} />
              </td>
              <td>
                <input name="name" value={newContact.name} onChange={handleNewChange} />
              </td>
              <td>
                <input name="description" value={newContact.description} onChange={handleNewChange} />
              </td>
              <td>
                <button className="add-btn" onClick={handleAdd}>
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactSection;
