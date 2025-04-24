import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ContactSection from "./ContactSection";
import AddressSection from "./AddressSection";
import EmergencyContactsSection from "./EmergencyContactsSection";

function ContactDetails({applicantDetail}) {
  const [applicant, setApplicant] = useState(applicantDetail);
  console.log(applicantDetail)
  if(applicant === null) {
    return <div>Error in fetching data...</div>; 
  }
  return (
    <div className="details-responsive">
      <div className="contact-details-container">
        <div className="contact-header">
          <h3 className="contact-title">Contact Details</h3>
          <div className="divider"></div>
        </div>

        {/* Phone and Email Section */}
        <ContactSection contactDetails={applicant.contact_details} studentId={applicant._id} />

        {/* Address Section */}
        
        <AddressSection addressDetails={applicant.address_details} studentId={applicant._id} />

        {/* Emergency Contact Section */}
        <div className="contact-section">
          <div className="section-header">
            <h4 className="section-title">Emergency Contacts</h4>
            <button className="add-button">
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
            <tbody id="content">
              {applicant.emergency_contacts.map((contact, index) => (
                <tr key={index}>
                  <td>{contact.name}</td>
                  <td>{contact.relationship}</td>
                  <td>{contact.phone_number}</td>
                  <td className="action">
                    <button className="edit-btn">
                      <FaEdit /> Edit
                    </button>
                    <button className="delete-btn">
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
        <EmergencyContactsSection emergencyContacts={applicant.emergency_contacts} studentId={applicant._id} />
      </div>
    </div>
  );
}

export default ContactDetails;
