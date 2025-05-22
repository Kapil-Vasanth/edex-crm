import React from "react";
import { FaArrowUp, FaArrowDown, FaEye } from "react-icons/fa";
import UnsubmittedProgrammesSection from "./UnsubmittedProgrammesSection";
import SubmittedProgrammesSection from "./SubmittedProgrammesSection";

function Programmes({applicant}) {
  


  const unsubmittedProgrammes = [];
  const submittedProgrammes = [
  ];

  return (
    <div className="details-responsive">
      <div className="programmes-container">
        <div className="programmes-header">
          <h3 className="programmes-title">Programmes</h3>
          <div className="divider"></div>
        </div>

        {/* Unsubmitted Programmes Section */}
        <UnsubmittedProgrammesSection programmes={applicant.unsubmitted_programmes} studentId={applicant._id}/>
        {/* Submitted Programmes Section */}
        <SubmittedProgrammesSection programmes={applicant.submitted_programmes} studentId={applicant._id}/>
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
                  <th>Priority</th>
                  <th>Action</th>
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
                    <td>
                    <button className="priority-btn">
                <FaArrowUp /> Up
              </button>
              <button className="priority-btn">
                <FaArrowDown /> Down
              </button>
                    </td>
                    <td className="action-view">
                    <button className="view-btn" > <FaEye /> View </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>



        </div>
      </div>
    </div>
  );
}

export default Programmes;