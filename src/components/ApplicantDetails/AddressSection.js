import React, { useState } from "react";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateStudentAddressDetails } from "../../api/api"; // Adjust this path
import { useQueryClient } from "@tanstack/react-query";

const AddressSection = ({ addressDetails = [], studentId }) => {
  const queryClient = useQueryClient();
  const [addresses, setAddresses] = useState(addressDetails);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newAddress, setNewAddress] = useState({ address_type: "", description: "" });

  const handleChange = (e, index) => {
    const updated = addresses.map((contact, i) =>
      i === index ? { ...contact, [e.target.name]: e.target.value } : contact
    );
    setAddresses(updated);
  };

  const handleNewChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSave = async (index) => {
    setEditingIndex(null);
    await updateAddressesOnServer(addresses);
  };

  const handleDelete = async (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    await updateAddressesOnServer(updated);
  };

  const handleAdd = async () => {
    if (!newAddress.address_type || !newAddress.description) return;
    const updated = [...addresses, newAddress];
    setAddresses(updated);
    setNewAddress({ address_type: "", description: "" });
    await updateAddressesOnServer(updated);
  };

  const updateAddressesOnServer = async (updatedAddresses) => {
    console.log(updatedAddresses)
    if (!Array.isArray(updatedAddresses)) {
      console.error("address_details must be an array");
      return;
    }
    try {
      const response = await updateStudentAddressDetails(studentId, updatedAddresses);
      toast.success("Addresses updated successfully!");
      console.log("Address update response:", response.data);
      // Invalidate the query so it can refetch the updated contacts from the server
      queryClient.invalidateQueries(["studentContactDetails", studentId]);
    } catch (error) {
      handleCancel(); // Reset to original addresses on error
      toast.error("Error updating addresses: " + error.message);
      console.error("Update error:", error.message);
    }
  };

  const handleCancel = () => {
    setAddresses(addressDetails); // Reset to the original contact details
    setEditingIndex(null);
  };

  return (
    <div className="contact-section">
      <div className="section-header">
        <h4 className="section-title">Address Details</h4>
        <button className="add-button" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Add Address
        </button>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((address, index) => (
              <tr key={index}>
                {editingIndex === index ? (
                  <>
                    <td>
                      <input
                        name="address_type"
                        value={address.address_type}
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        name="description"
                        value={address.description}
                        className="description-input"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td className="action">
                      <button className="save-btn" onClick={() => handleSave(index)}>
                        <FaSave />
                      </button>
                      <button className="cancel-btn" onClick={() => handleCancel()}>
                        <FaTimes />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{address.address_type}</td>
                    <td>{address.description}</td>
                    <td className="action">
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
                  name="address_type"
                  value={newAddress.address_type}
                  onChange={handleNewChange}
                />
              </td>
              <td>
                <input
                  name="description"
                  value={newAddress.description}
                  className="description-input"
                  onChange={handleNewChange}
                />
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

export default AddressSection;
