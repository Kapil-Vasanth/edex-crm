import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ContactSection from "./ContactSection";
import AddressSection from "./AddressSection";
import EmergencyContactsSection from "./EmergencyContactsSection";

function ContactDetails({applicantDetail}) {
  const [applicant, setApplicant] = useState(applicantDetail);
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
        <EmergencyContactsSection emergencyContacts={applicant.emergency_contacts} studentId={applicant._id} />
      </div>
    </div>
  );
}

export default ContactDetails;
