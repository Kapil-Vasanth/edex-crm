import React, { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

function SubmitApplication({applicant}) {
  

  const submittedProgrammes = [];
 
    const [isAgreed, setIsAgreed] = useState(false);
  
    const handleSubmit = () => {
      if (!isAgreed) {
        alert("Please agree to the terms and conditions before submitting");
        return;
      }
      alert("Application submitted successfully!");
    };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="Submit-details">
   <div className="terms-submit-container">
      <div className="terms-agreement">
      <p>Tick the box to agree to our terms and conditions before you submit the application.</p>
        <label className="terms-checkbox">
          <input 
            type="checkbox" 
            checked={isAgreed}
            onChange={() => setIsAgreed(!isAgreed)}
          />
          <span className="checkmark"></span>
          <span className="terms-text">
            I agree to all the declaration terms and conditions.{" "}
            <button  className="terms-link">View declaration terms and conditions</button>
          </span>
        </label>
      </div>
      <button 
        className="submit-button"
        onClick={handleSubmit}
        disabled={!isAgreed}
      >
        Submit
      </button>
    </div>

  
   <button onClick={handlePrint} className="print-button">
    Print
  </button>
      <div className="details-responsive print-submit">
        <div className="applicant-info-container">
          <div className="applicant-info-header">
            <h3 className="info-title">Personal Information</h3>
            <div className="divider"></div>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Student ID</span>
              <span className="info-value">{applicant?.student_id}</span>
            </div>

            <div className="info-item">
              <span className="info-label">First Name</span>
              <span className="info-value">{applicant?.first_name}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Last Name</span>
              <span className="info-value">{applicant?.last_name}</span>
            </div>

            <div className="info-item">
              <span className="info-label">University</span>
              <span className="info-value">{applicant?.university}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Date of Birth</span>
              <span className="info-value">{applicant?.dob}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Gender</span>
              <span className="info-value">{applicant?.gender}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Country</span>
              <span className="info-value">{applicant?.country}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Citizenship</span>
              <span className="info-value">{applicant?.citizenship}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{applicant?.email}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Phone No.</span>
              <span className="info-value">{applicant?.phone}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Passport No.</span>
              <span className="info-value">{applicant?.passport}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Passport Expiry.</span>
              <span className="info-value">{applicant?.passport_expiry}</span>
            </div>

            <div className="info-item">
              <span className="info-label">IELTS/PTE</span>
              <span className="info-value">{applicant?.ielts}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Date of Form Filed</span>
              <span className="info-value">{applicant?.date_of_form_filed}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Offer of Place</span>
              <span className="info-value">{applicant?.offer_of_place}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Funds Loan</span>
              <span className="info-value">{applicant?.funds_loan}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Funds Direct Deposit</span>
              <span className="info-value">{applicant?.funds_direct_deposit}</span>
            </div>

            <div className="info-item">
              <span className="info-label">SOP</span>
              <span className="info-value">{applicant?.sop}</span>
            </div>


          </div>
        </div>
        <div className="contact-details-container">
          <div className="contact-header">
            <h3 className="contact-title">Contact Details</h3>
            <div className="divider"></div>
          </div>

          {/* Phone and Email Section */}
          <div className="contact-section">
            <div className="section-header">
              <h4 className="section-title">Phone & Email</h4>
            </div>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody id="content">
                  {applicant?.contact_details.map((contact, index) => (
                    <tr key={index}>
                      <td>{contact.contact_type}</td>
                      <td>{contact.name}</td>
                      <td>{contact.description}</td>
                    </tr>
                  ))}
                  
                </tbody>
              </table>
            </div>
          </div>

          {/* Address Section */}
          <div className="contact-section">
            <div className="section-header">
              <h4 className="section-title">Address Details</h4>
            </div>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody id="content">
                  {applicant?.address_details.map((address, index) => (
                    <tr key={index}>
                      <td>{address.address_type}</td>
                      <td>{address.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="contact-section">
            <div className="section-header">
              <h4 className="section-title">Emergency Contacts</h4>
            </div>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Relationship</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody id="content">
                  {applicant?.emergency_contacts.map((contact, index) => (
                    <tr key={index}>
                      <td>{contact.name}</td>
                      <td>{contact.relationship}</td>
                      <td>{contact.phone_number}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="programmes-container">
          <div className="programmes-header">
            <h3 className="programmes-title">Programmes</h3>
            <div className="divider"></div>
          </div>

          {/* Unsubmitted Programmes Section */}
          <div className="programmes-section">
            <div className="section-header">
              <h4 className="section-title">Unsubmitted Programmes</h4>
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
                  </tr>
                </thead>
                <tbody>
                 {applicant?.unsubmitted_programmes.map((programme, index) => (
                    <tr key={index}>
                      <td>{programme.id}</td>
                      <td>{programme.programme}</td>
                      <td>{programme.pathway}</td>
                      <td>{programme.year}</td>
                      <td>{programme.intake}</td>
                      <td>{programme.managed_by}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Submitted Programmes Section */}
          <div className="programmes-section">
            <div className="section-header">
              <h4 className="section-title">Submitted Programmes</h4>
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
                    <th>Status</th>
                    <th>Explanation</th>
                    <th>Action Required</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedProgrammes.map((programme, index) => (
                    <tr key={index}>
                      <td>{programme.id}</td>
                      <td>{programme.programme}</td>
                      <td>{programme.pathway}</td>
                      <td>{programme.year}</td>
                      <td>{programme.Intake}</td>
                      <td>{programme.Status}</td>
                      <td>{programme.Explanation}</td>
                      <td>{programme.ActionRequired}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="Academic-container">
          <div className="Academic-header">
            <h3 className="Academic-title">Academic Background</h3>
            <div className="divider"></div>
          </div>
          {/* Secondary Education */}
          <div className="Academic-section">
            <div className="section-header">
              <h4 className="section-title">Secondary Education</h4>
            </div>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Secondary School</th>
                    <th>Qualification</th>
                    <th>Country</th>
                    <th>Period</th>
                  </tr>
                </thead>
                <tbody id="content">
                  {applicant?.academic_details.map((education, index) => (
                    <tr key={index}>
                      <td>{education.school}</td>
                      <td>{education.qualification}</td>
                      <td>{education.country}</td>
                      <td>{education.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Tertiary Education */}
          <div className="Academic-section">
            <div className="section-header">
              <h4 className="section-title">Tertiary Education</h4>
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
                  </tr>
                </thead>
                <tbody id="content">
                  {applicant?.tertiary_education.map((education, index) => (
                    <tr key={index}>
                      <td>{education.institution}</td>
                      <td>{education.qualification}</td>
                      <td>{education.country}</td>
                      <td>{education.period}</td>
                      <td>{education.completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</td>
                      <td>{education.awaiting_results ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Employment History */}
          <div className="Academic-section">
            <div className="section-header">
              <h4 className="section-title">Employment History</h4>
            </div>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Employer</th>
                    <th>Period</th>
                    <th>Position</th>
                    <th>Nature of Work</th>
                  </tr>
                </thead>
                <tbody id="content">
                  {applicant?.employment_history.map((employment, index) => (
                    <tr key={index}>
                      <td>{employment.employer}</td>
                      <td>{employment.period}</td>
                      <td>{employment.position}</td>
                      <td>{employment.nature_of_work}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Proficiency */}
          <div className="Academic-section">
            <div className="section-header">
              <h4 className="section-title">Language Proficiency</h4>
            </div>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Language</th>
                    <th>Description</th>
                    <th>Yes/No</th>
                  </tr>
                </thead>
                <tbody id="content">
                  {applicant?.language_proficiency.map((language, index) => (
                    <tr key={index}>
                      <td>{language.language}</td>
                      <td>{language.description}</td>
                      <td>{language.yes_no ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="Documents-container">
          <div className="Documents-header">
            <h3 className="Documents-title">Documents</h3>
            <div className="divider"></div>
          </div>
          {/* Recommended Documents */}
          <div className="Documents-section">
            <div className="section-header">
              <h4 className="section-title">Recommended Documents</h4>
            </div>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Required For Submit</th>
                  </tr>
                </thead>
                <tbody id="content">
                  <tr>
                    <td>English Language Results</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td>Tertiary Results</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td>Valid Visa</td>
                    <td>No</td>
                  </tr>
                  <tr>
                    <td>CV</td>
                    <td>No</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Uploaded Documents */}
          <div className="Documents-section">
            <div className="section-header">
              <h4 className="section-title">Uploaded Documents</h4>
            </div>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Document</th>
                    <th>Uploaded File Name</th>
                    <th>Certified</th>
                    <th>Certified By</th>
                    <th>Certified Date</th>
                    <th>Uploaded</th>
                  </tr>
                </thead>
                <tbody id="content">
                  {applicant?.documents.map((document, index) => (
                    <tr key={index}>
                      <td>{document.document_type}</td>
                      <td>{document.file_name}</td>
                      <td>{document.certified ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}</td>
                      <td>{document.certified_by}</td>
                      <td>{document.certified_date ? new Date(document.certified_date).toLocaleDateString() : "-"}</td>
                      <td>{document.upload_date ? new Date(document.upload_date).toLocaleDateString() : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  );
}

export default SubmitApplication;
