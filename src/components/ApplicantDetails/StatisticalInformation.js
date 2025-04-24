import React from 'react';
import { FaEdit } from "react-icons/fa";

function StatisticalInformation() {
  return (
    <div className="details-responsive">
      <div className="statistical-info-container">
        <div className="statistical-header">
          <h3 className="statistical-title">Statistical Information</h3>
          <div className="divider"></div>
        </div>

        <div className="statistical-grid">
          <div className="statistical-item">
            <span className="statistical-label arrow-mark">
              What was (or will be) applicant's main activity on the 1st October in the year before the start of study?
            </span>
            <span className="statistical-value">Waged or salaried worker</span>
          </div>

          <div className="statistical-item">
            <span className="statistical-label arrow-mark">How did the applicant hear about AUT University?</span>
            <span className="statistical-value">Information from a family member or friend</span>
          </div>

          <div className="statistical-item">
            <span className="statistical-label arrow-mark">Secondary Award</span>
            <span className="statistical-value">University Entrance</span>
          </div>

          <div className="statistical-item">
            <span className="statistical-label arrow-mark">Tertiary Award</span>
            <span className="statistical-value">Bachelor's degree</span>
          </div>

          <div className="statistical-item">
            <span className="statistical-label arrow-mark">
              Has at least one of the applicant's parents (or a primary caregiver) studied at university?
            </span>
            <span className="statistical-value">No</span>
          </div>

          <div className="statistical-item">
            <span className="statistical-label arrow-mark">
              Do you describe yourself as Deaf, disabled, neurodivergent, targets whaikaha Māori, or living with a long-term physical or mental health condition?
            </span>
            <span className="statistical-value">No</span>
          </div>

          <div className="statistical-item">
            <span className="statistical-label arrow-mark">
              Choose the country the applicant is applying from
            </span>
            <span className="statistical-value no-data">NO DATA ENTERED</span>
          </div>

          <div className="statistical-actions">
            <button className="edit-btn edit-button">
                    <FaEdit /> Edit
                  </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticalInformation;