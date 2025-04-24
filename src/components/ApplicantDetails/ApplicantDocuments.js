import React from 'react';
import { FaDownload, FaTrash, FaUpload   } from "react-icons/fa";
import { MdCheckBox } from "react-icons/md";

function ApplicantDocuments (){
    return (
        <div className="details-responsive">
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="content">
                <tr>
                  <td>English Language Results</td>
                  <td>No</td>
                  <td className="action">
                    <button className="Upload-btn">
                    <FaUpload /> Upload 
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Tertiary Results</td>
                  <td>No</td>
                  <td className="action">
                    <button className="Upload-btn">
                    <FaUpload /> Upload 
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Valid Visa</td>
                  <td>No</td>
                  <td className="action">
                    <button className="Upload-btn">
                    <FaUpload /> Upload 
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>CV</td>
                  <td>No</td>
                  <td className="action">
                    <button className="Upload-btn">
                    <FaUpload /> Upload 
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Uploaded Documents */}
        <div className="Documents-section">
          <div className="section-header">
            <h4 className="section-title">Uploaded Documents</h4>
            <button className="add-button">
              <i className="fas fa-plus"></i> Upload Specific Document
            </button>
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
                  <th>View</th>
                  <th>Actions</th>
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
                  <td className="action">
                    <button className="download-btn">
                    <FaDownload /> Download
                    </button>
                  </td>
                  <td  className="action-view">
                    <button className="delete-btn">
                      <FaTrash /> Delete
                    </button>
                  </td>
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
                  <td className="action">
                    <button className="download-btn">
                    <FaDownload /> Download
                    </button>
                  </td>
                  <td  className="action-view">
                    <button className="delete-btn">
                      <FaTrash /> Delete
                    </button>
                  </td>
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
                  <td className="action">
                    <button className="download-btn">
                    <FaDownload /> Download
                    </button>
                  </td>
                  <td  className="action-view">
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
    )
}

export default ApplicantDocuments;