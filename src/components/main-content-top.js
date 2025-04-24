import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import qrCode  from './images/qr-code.jpg'

function Maincontenttop({ onAddApplicant }) {
  const [isNewApplicantOpen, setIsNewApplicantOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isIELTSOpen, setIsIELTSOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    paidFor: 'IELTS',
    amount: '',
    transactionId: '',
    name: '',
    email: '',
    phone: '',
    comments: ''
  });
  
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Gender: 'None',
    University: '',
    Citizenship: '',
    Email: '',
    Phone: '',
    PassportNo: '',
    IELTS: ''
  });

  const handleOpenNewApplicant = () => setIsNewApplicantOpen(true);
  const handleCloseNewApplicant = () => {
    setIsNewApplicantOpen(false);
    setFormData({
      FirstName: '',
      LastName: '',
      Gender: 'None',
      University: '',
      Citizenship: '',
      Email: '',
      Phone: '',
      PassportNo: '',
      IELTS: ''
    });
  };
  const [isQrExpanded, setIsQrExpanded] = useState(false);
  const handlePaymentOpen = () => setIsPaymentOpen(true);
  const handlePaymentClose = () => setIsPaymentOpen(false);
  const handleIELTSOpen = () => setIsIELTSOpen(true);
  const handleIELTSClose = () => setIsIELTSOpen(false);

  const handleQrExpand = () => {
    setIsQrExpanded(true);
  };
  
  const handleQrClose = () => {
    setIsQrExpanded(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send payment data to your backend
    alert('Payment details submitted successfully!');
    
    // Update IELTS status to Yes
    setFormData(prev => ({ ...prev, IELTS: 'Yes' }));
    handlePaymentClose();
    handleIELTSClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.FirstName || !formData.LastName || !formData.University || 
        !formData.Citizenship || !formData.Email || !formData.Phone || !formData.PassportNo) {
      alert('Please fill all required fields');
      return;
    }
    
    if (formData.IELTS === 'No') {
      alert('Please complete IELTS payment first');
      return;
    }
    
    onAddApplicant(formData);
    handleCloseNewApplicant();
  };

  return (
    <div className="main-content-top">
      <ul className="btn-list">
        <li>
          <button onClick={handleOpenNewApplicant}>
            <FaUser /> New Applicant
          </button>
        </li>
      </ul>

      {isNewApplicantOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="heading">
              <h4>New Applicant</h4>
              <span className="close" onClick={handleCloseNewApplicant}>
                &times;
              </span>
            </div>
            <form onSubmit={handleSubmit}>
            <label>
                First Name<span className="important">*</span>:
                <input 
                  type="text" 
                  name="FirstName" 
                  value={formData.FirstName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Last Name<span className="important">*</span>:
                <input 
                  type="text" 
                  name="LastName" 
                  value={formData.LastName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Gender:
                <select 
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleInputChange}
                >
                  <option value="None">None</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </label>
              <label>
                University<span className="important">*</span>:
                <input 
                  type="text" 
                  name="University" 
                  value={formData.University}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Citizenship<span className="important">*</span>:
                <input 
                  type="text" 
                  name="Citizenship" 
                  value={formData.Citizenship}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email<span className="important">*</span>:
                <input 
                  type="email" 
                  name="Email" 
                  value={formData.Email}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Phone<span className="important">*</span>:
                <input 
                  type="tel" 
                  name="Phone" 
                  value={formData.Phone}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Passport No.<span className="important">*</span>:
                <input 
                  type="text" 
                  name="PassportNo" 
                  value={formData.PassportNo}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                IELTS/PTE:
                <div className="radiobutton">
                  <label>
                    <input 
                      type="radio" 
                      name="IELTS" 
                      value="Yes" 
                      checked={formData.IELTS === 'Yes'}
                      onChange={handleInputChange}
                    /> Yes
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="IELTS" 
                      value="No" 
                      checked={formData.IELTS === 'No'}
                      onChange={handleInputChange}
                    /> No
                    {formData.IELTS === 'No' && (
                      <button 
                        type="button" 
                        className="small-btn join"
                        onClick={handleIELTSOpen}
                      >
                        Join Now
                      </button>
                    )}
                  </label>
                </div>
              </label>

              <div className="model-btn">
                <button type="submit">Save</button>
                <button type="button" onClick={handleCloseNewApplicant} className="close-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isIELTSOpen && (
        <div className="modal IELTS-modal">
          <div className="modal-content">
            <div className="heading">
              <h4>IELTS Plus Online Coaching</h4>
              <span className="close" onClick={handleIELTSClose}>
                &times;
              </span>
            </div>
            
            <div className="IELTS-options">
            <div className="IELTS-content">
      <h2>Join Live IELTS Plus Online Coaching</h2>
      <p className="subtitle">With Cambridge Certified Faculty</p>
      <div className="IELTS-item">
      <h3>What We Offer</h3>
      <ul className="list-item">
        <li>Comprehensive Teaching Structure</li>
        <li>25 Teaching Classes</li>
        <li>2 Full-length Mock Tests</li>
        <li>Detailed attention on Listening, Reading, Writing & Speaking Modules</li>
      </ul>
      </div>
      <div className="IELTS-item">
      <h3>Expert Faculty Members</h3>
      <ul className="list-item">
        <li>Faculty with High Scores in IELTS</li>
        <li>Vast Experience of guiding IELTS Students</li>
        <li>One-On-One interaction, Doubt-Solving & Speaking Mocks</li>
      </ul>
      </div>
      <div className="IELTS-item">
      <h3>Target Study Program</h3>
      <ul className="list-item">
        <li>Updated Official Cambridge Study Material</li>
        <li>Listening Audios for additional practice</li>
        <li>Success in IELTS Academic/ General Training</li>
      </ul>
      </div>
      <div className="IELTS-notice">
      <h3>Upcoming Online Batch</h3>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>3rd April 2025</td>
            <td>6pm to 7:30pm</td>
          </tr>
          <tr>
            <td>8th April 2025</td>
            <td>8pm to 9:30pm</td>
          </tr>
          <tr>
            <td>10th April 2025</td>
            <td>2:30pm to 4pm</td>
          </tr>
          <tr>
            <td>12th April 2025</td>
            <td>8am to 9:30am</td>
          </tr>
        </tbody>
      </table>
      <div className="course-fee">
      <h3>Course Fees</h3>
      <p className="fees">10,000 Rs</p>
      </div>
      </div>
      
    </div>
    <div className="IELTS-btn">

                    <button 
                        type="button" 
                        className="small-btn"
                        onClick={handlePaymentOpen}
                      >
                        Pay Now
                      </button>
                      </div>
            </div>
            
       
          </div>
        </div>
      )}
      {isPaymentOpen && (
        <div className="modal payment-modal">
          <div className="modal-content">
            <div className="heading">
              <h4>IELTS Payment</h4>
              <span className="close" onClick={handlePaymentClose}>
                &times;
              </span>
            </div>
            
            <div className="payment-options">
              <div className="payment-method">
                <h5>Pay via QR Code</h5>
                <div className="qr-code-placeholder" onClick={handleQrExpand}>
                <img src={qrCode} alt="Payment QR Code" className="qr-code-thumbnail" />
                </div>
              </div>
              
              <div className="payment-method">
                <h5>Direct Bank Transfer</h5>
                <div className="bank-details">
                  <p><strong>Account Number:</strong> 343905001368</p>
                  <p><strong>Account Name:</strong> WINGSLIDE TECHNOLOGIES PRIVATE LIMITED</p>
                  <p><strong>IFSC Code:</strong> ICIC0003439</p>
                </div>
              </div>
            </div>

            <form onSubmit={handlePaymentSubmit}>
              <label>
                Paid for:
                <select 
                  name="paidFor" 
                  value={paymentData.paidFor}
                  onChange={handlePaymentChange}
                  required
                >
                  <option value="IELTS">IELTS</option>
                  <option value="PTE">PTE</option>
                  <option value="GRE">GRE</option>
                  <option value="GMAT">GMAT</option>
                  <option value="SAT">SAT</option>
                  <option value="TOEFL">TOEFL</option>
                  <option value="Duolingo">Duolingo</option>
                  <option value="German Language(A1)">German Language(A1)</option>
                </select>
              </label>
              
              <label>
                The Amount you have paid:
                <input 
                  type="number" 
                  name="amount" 
                  value={paymentData.amount}
                  onChange={handlePaymentChange}
                  required
                />
              </label>
              
              <label>
                Transaction ID:
                <input 
                  type="text" 
                  name="transactionId" 
                  value={paymentData.transactionId}
                  onChange={handlePaymentChange}
                  required
                />
              </label>
              
              <label>
                Name:
                <input 
                  type="text" 
                  name="name" 
                  value={paymentData.name}
                  onChange={handlePaymentChange}
                  required
                />
              </label>
              
              <label>
                Email:
                <input 
                  type="email" 
                  name="email" 
                  value={paymentData.email}
                  onChange={handlePaymentChange}
                  required
                />
              </label>
              
              <label>
                Phone:
                <input 
                  type="number" 
                  name="phone" 
                  value={paymentData.phone}
                  onChange={handlePaymentChange}
                  required
                />
              </label>
              
              <label>
                Any comments:
                <input 
                  type="text" 
                  name="comments" 
                  value={paymentData.comments}
                  onChange={handlePaymentChange}
                />
              </label>
              
              <div className="model-btn">
                <button type="submit">Send</button>
                <button type="button" onClick={handlePaymentClose} className="close-btn">
                  Cancel
                </button>
              </div>
            </form>
            {isQrExpanded && (
  <div className="modal qr-modal" onClick={handleQrClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <div className="heading">
        <h4>Scan QR Code</h4>
        <span className="close" onClick={handleQrClose}>
          &times;
        </span>
      </div>
      <div className="qr-code-fullsize">
        <img src={qrCode} alt="Full Size Payment QR Code" />
      </div>
     
    </div>
  </div>
)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Maincontenttop;