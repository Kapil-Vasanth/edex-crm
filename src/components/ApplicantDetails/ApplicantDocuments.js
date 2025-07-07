import React from 'react';
import {  FaUpload   } from "react-icons/fa";
import { Link } from 'react-router-dom';
import UploadedDocumentsSection from './UploadedDocumentsSection';

function ApplicantDocuments ({applicant}){
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
                  <td>Yes</td>
                  <td className="action">
                    <button className="Upload-btn">
                    <Link to="./uploadDocument" className="link"><FaUpload /> Upload </Link>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>College Result</td>
                  <td>Yes</td>
                  <td className="action">
                    <button className="Upload-btn">
                    <Link to="./uploadDocument" className="link"><FaUpload /> Upload </Link>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>CV</td>
                  <td>Yes</td>
                  <td className="action">
                    <button className="Upload-btn">
                    <Link to="./uploadDocument" className="link"><FaUpload /> Upload </Link>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Cover Letter</td>
                  <td>Yes</td>
                  <td className="action">
                    <button className="Upload-btn">
                    <Link to="./uploadDocument" className="link"><FaUpload /> Upload </Link>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>SOP</td>
                  <td>Yes</td>
                  <td className="action">
                    <button className="Upload-btn">
                    <Link to="./uploadDocument" className="link"><FaUpload /> Upload </Link>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>VISA</td>
                  <td>Yes</td>
                  <td className="action">
                    <button className="Upload-btn">
                    <Link to="./uploadDocument" className="link"><FaUpload /> Upload </Link>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Passport</td>
                  <td>Yes</td>
                  <td className="action">
                    <button className="Upload-btn">
                    <Link to="./uploadDocument" className="link"><FaUpload /> Upload </Link>
                    </button>
                  </td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
        {/* Uploaded Documents */}
        
        <UploadedDocumentsSection documents={applicant.documents}/>
        
      </div>
        
      </div>
    )
}

export default ApplicantDocuments;