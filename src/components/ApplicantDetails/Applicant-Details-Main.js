import React, { useState } from "react";
import {  useParams, useSearchParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'; // Importing React Query hooks
import ApplicantInformation from "./ApplicantInformation";
import ContactDetails from "./ContactDetails";
import SubmitApplication from "./SubmitApplication";
import ApplicantDocuments from "./ApplicantDocuments";
import AcademicBackground from "./AcademicBackground";
import Programmes from "./Programmes";
import { getStudentById } from "../../api/api"; // Assuming the API function to fetch data

function ApplicantDetailsMain() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab"); // 'documents'
  const [activeTab, setActiveTab] = useState(tab || "applicant-information");
  const { id: applicantId } = useParams();
  // React Query to fetch applicant data by ID
  const { data: applicant, isLoading, isError, error } = useQuery({
    queryKey: ['applicant', applicantId], // The query key and ID
    queryFn: () => getStudentById(applicantId),  // The function to fetch data
    enabled: !!applicantId, // Ensure query only runs if applicantId is available
  });

  
  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching applicant data: {error.message}</div>;
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="details-wrapper">
      <div className="heading">
        <h4>
          Applicant Details:({applicantId})
        </h4>
      </div>

      <div className="table-container">
        <div className="toggle-container">
          <div className="toggle-tabs applicant-details-tab">
            <ul>
              <li
                className={activeTab === "applicant-information" ? "active" : ""}
                onClick={() => handleTabClick("applicant-information")}
              >
                Applicant Information
              </li>
              <li
                className={activeTab === "contact-details" ? "active" : ""}
                onClick={() => handleTabClick("contact-details")}
              >
                Contact Details
              </li>
              <li
                className={activeTab === "programmes" ? "active" : ""}
                onClick={() => handleTabClick("programmes")}
              >
                Programmes
              </li>
              <li
                className={activeTab === "academic-background" ? "active" : ""}
                onClick={() => handleTabClick("academic-background")}
              >
                Academic Background
              </li>
              <li
                className={activeTab === "documents" ? "active" : ""}
                onClick={() => handleTabClick("documents")}
              >
                Documents
              </li>

              <li
                className={activeTab === "submit" ? "active" : ""}
                onClick={() => handleTabClick("submit")}
              >
                Submit
              </li>
            </ul>
          </div>
          <div className="toggle-data">
            {activeTab === "applicant-information" && <ApplicantInformation applicantDetail={applicant}/>}

            {activeTab === "contact-details" && <ContactDetails applicantDetail={applicant}/>}

            {activeTab === "programmes" && <Programmes applicant={applicant}/>}

            {activeTab === "academic-background" && <AcademicBackground applicant={applicant}/>}

            {activeTab === "documents" && <ApplicantDocuments applicant={applicant}/>}

            {activeTab === "submit" && <SubmitApplication applicant={applicant}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicantDetailsMain;
