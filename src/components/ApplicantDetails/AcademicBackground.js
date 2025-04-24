import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

function AcademicBackground() {
  return (
    <div className="details-responsive">
      <div className="Academic-container">
        <div className="Academic-header">
          <h3 className="Academic-title">Academic Background</h3>
          <div className="divider"></div>
        </div>
        {/* Secondary Education */}
        <div className="Academic-section">
          <div className="section-header">
            <h4 className="section-title">Secondary Education</h4>
            <button className="add-button">
              <i className="fas fa-plus"></i> Add Secondary Education
            </button>
          </div>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Secondary School</th>
                  <th>Qualification</th>
                  <th>Country</th>
                  <th>Period</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="content">
                <tr>
                  <td>Montfort. Mat. Hr. Sec. School</td>
                  <td>12th standard</td>
                  <td>India</td>
                  <td>2018 - 2020</td>
                  <td className="action">
                    <button className="edit-btn">
                      <FaEdit /> Edit
                    </button>
                    <button className="delete-btn">
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Tertiary Education */}
        <div className="Academic-section">
          <div className="section-header">
            <h4 className="section-title">Tertiary Education</h4>
            <button className="add-button">
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
                  <td className="action">
                    <button className="edit-btn">
                      <FaEdit /> Edit
                    </button>
                    <button className="delete-btn">
                      <FaTrash /> Delete
                    </button>
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
            <button className="add-button">
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
              <tbody id="content">
                <tr>
                  <td>APA Engineering</td>
                  <td>2023-2024</td>
                  <td>Software developer</td>
                  <td>Development ERP system for an e-commerce app.</td>
                  <td className="action">
                    <button className="edit-btn">
                      <FaEdit /> Edit
                    </button>
                    <button className="delete-btn">
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Zealeye.AI</td>
                  <td>2021-2022</td>
                  <td>Frontend Developer Intern</td>
                  <td>Develop frontend features and responsive designs for a home loan app.</td>
                  <td>
                    <button className="edit-btn">
                      <FaEdit /> Edit
                    </button>
                    <button className="delete-btn">
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Out of Shop</td>
                  <td>2021-2021</td>
                  <td>Product tester intern</td>
                  <td>Manual testing and provided feedback for an e-commerce app</td>
                  <td>
                    <button className="edit-btn">
                      <FaEdit /> Edit
                    </button>
                    <button className="delete-btn">
                      <FaTrash /> Delete
                    </button>
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
            <button className="add-button">
              <i className="fas fa-plus"></i> Add Language
            </button>
          </div>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Language</th>
                  <th>Description</th>
                  <th>Yes/No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody id="content">
                <tr>
                  <td>English Proficiency</td>
                  <td>English Is First Language</td>
                  <td>Yes</td>
                  <td className="action">
                    <button className="edit-btn">
                      <FaEdit /> Edit
                    </button>
                    <button className="delete-btn">
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
               
              </tbody>
            </table>
          </div>
        </div>
        
      </div>

    </div>
  );
}

export default AcademicBackground;
