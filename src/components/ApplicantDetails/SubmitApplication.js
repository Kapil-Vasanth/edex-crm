import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

function SubmitApplication() {
  const location = useLocation();
  const {
    applicantId,
    applicantName,
    applicantStatus,
    applicantIELTS,
    applicantPassport,
    applicantPhone,
    applicantEmail,
    applicantCitizenship,
    applicantGender,
    applicantDOB,
    applicantUniversity,
  } = location.state || {};

  const unsubmittedProgrammes = [];
  const submittedProgrammes = [
    {
      id: "1838333",
      programme: "Master of Computer and Information Sciences",
      pathway: "Standard",
      year: "2025",
      Intake: "Full Year",
      Status: "On hold",
      Explanation:
        "Your application for this programme is on hold. For your application to continue you need to provide the documents we have requested",
      ActionRequired: "Please check Arion correspondence for details",
    },
  ];
 
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
              <span className="info-value">{applicantId}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Full Name</span>
              <span className="info-value">{applicantName}</span>
            </div>

            <div className="info-item">
              <span className="info-label">University</span>
              <span className="info-value">{applicantUniversity}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Date of Birth</span>
              <span className="info-value">{applicantDOB}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Gender</span>
              <span className="info-value">{applicantGender}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Citizenship</span>
              <span className="info-value">{applicantCitizenship}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{applicantEmail}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Phone No.</span>
              <span className="info-value">{applicantPhone}</span>
            </div>

            <div className="info-item">
              <span className="info-label">Passport No.</span>
              <span className="info-value">{applicantPassport}</span>
            </div>

            <div className="info-item">
              <span className="info-label">IELTS/PTE</span>
              <span className="info-value">{applicantIELTS}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Application Status</span>
              <span className="info-value">{applicantStatus}</span>
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
                  <tr>
                    <td>Mobile Phone</td>
                    <td>N/A</td>
                    <td>{applicantPhone}</td>
                  </tr>
                  <tr>
                    <td>Contact Email</td>
                    <td>N/A</td>
                    <td>{applicantEmail}</td>
                  </tr>
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
                  <tr>
                    <td>Home</td>
                    <td>
                      Geffrey J 5 Officers Colony Adambakkam Tamil Nadu India
                      600088
                    </td>
                  </tr>
                  <tr>
                    <td>Permanent</td>
                    <td>
                      Geffrey J 5 Officers Colony Adambakkam Tamil Nadu India
                      600088
                    </td>
                  </tr>
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
                  <tr>
                    <td>A.Glint</td>
                    <td>Mother</td>
                    <td>+91 9150780442</td>
                  </tr>
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
                  {unsubmittedProgrammes.length > 0 ? (
                    unsubmittedProgrammes.map((programme, index) => (
                      <tr key={index}>
                        <td>{programme.id}</td>
                        <td>{programme.programme}</td>
                        <td>{programme.pathway}</td>
                        <td>{programme.year}</td>
                        <td>{programme.Intake}</td>
                        <td>{programme.ManagedBy}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-items">
                        There are no items to display.
                      </td>
                    </tr>
                  )}
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
                  <tr>
                    <td>Montfort. Mat. Hr. Sec. School</td>
                    <td>12th standard</td>
                    <td>India</td>
                    <td>2018 - 2020</td>
                  </tr>
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
                  <tr>
                    <td>Patrician college of Arts and Science</td>
                    <td>B.Sc Computer Science</td>
                    <td>India</td>
                    <td>2020 - 2023</td>
                    <td>
                      <MdCheckBox />
                    </td>
                    <td>
                      <MdCheckBoxOutlineBlank />
                    </td>
                  </tr>
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
                  <tr>
                    <td>APA Engineering</td>
                    <td>2023-2024</td>
                    <td>Software developer</td>
                    <td>Development ERP system for an e-commerce app.</td>
                  </tr>
                  <tr>
                    <td>Zealeye.AI</td>
                    <td>2021-2022</td>
                    <td>Frontend Developer Intern</td>
                    <td>
                      Develop frontend features and responsive designs for a
                      home loan app.
                    </td>
                  </tr>
                  <tr>
                    <td>Out of Shop</td>
                    <td>2021-2021</td>
                    <td>Product tester intern</td>
                    <td>
                      Manual testing and provided feedback for an e-commerce app
                    </td>
                  </tr>
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
                  <tr>
                    <td>English Proficiency</td>
                    <td>English Is First Language</td>
                    <td>Yes</td>
                  </tr>
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
                  <tr>
                    <td>CV</td>
                    <td>jeffresume__2_.pdf</td>
                    <td>
                      <MdCheckBox />
                    </td>
                    <td>Prince Vijaykumar</td>
                    <td>12/Nov/2024</td>
                    <td>12/Nov/2024</td>
                  </tr>
                  <tr>
                    <td>Tertiary Results</td>
                    <td>all sem marks.pdf</td>
                    <td>
                      <MdCheckBox />
                    </td>
                    <td>Prince Vijaykumar</td>
                    <td>12/Nov/2024</td>
                    <td>12/Nov/2024</td>
                  </tr>
                  <tr>
                    <td>English Language Results</td>
                    <td>ielts_result.pdf</td>
                    <td>
                      <MdCheckBox />
                    </td>
                    <td>Prince Vijaykumar</td>
                    <td>12/Nov/2024</td>
                    <td>12/Nov/2024</td>
                  </tr>
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
