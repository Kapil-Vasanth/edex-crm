import React from "react";
import UnsubmittedProgrammesSection from "./UnsubmittedProgrammesSection";
import SubmittedProgrammesSection from "./SubmittedProgrammesSection";

function Programmes({applicant}) {
  
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
        
      </div>
    </div>
  );
}

export default Programmes;