import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import SecondarySection from "./SecondarySection"; // Assuming this is a separate component for secondary education
import TertiaryEducationSection from "./TertiaryEducationSection";
import EmploymentHistorySection from "./EmploymentHistorySection";
import LanguageProficiencySection from "./LanguageProficiencySection";

function AcademicBackground({applicant}) {
  return (
    <div className="details-responsive">
      <div className="Academic-container">
        <div className="Academic-header">
          <h3 className="Academic-title">Academic Background</h3>
          <div className="divider"></div>
        </div>
        {/* Secondary Education */}
        <SecondarySection educationDetails={applicant.academic_details} studentId={applicant._id}/>
        {/* Tertiary Education */}
        <TertiaryEducationSection tertiaryEducation={applicant.tertiary_education} studentId={applicant._id}/>
        {/* Employment History */}
        <EmploymentHistorySection employmentHistory={applicant.employment_history} studentId={applicant._id}/>
        {/* Proficiency */}
        <LanguageProficiencySection languageProficiency={applicant.language_proficiency} studentId={applicant._id}/>
        
      </div>

    </div>
  );
}

export default AcademicBackground;
