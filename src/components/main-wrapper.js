import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Maincontent from './main-content';
import ApplicantDetails from './ApplicantDetails/Applicant-Details';
import RemarksDetails from './remarks-details';
import StudentLogin from './Student/StudentLogin';
import StudentSignup from './Student/StudentSignup';
import AgentLogin from './AgentLogin'; 
import Layout from './Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DocumentUploadForm from './DocumentUploadForm';
import ForgotPassword from '../pages/ForgotPassword'; 
import ResetPassword from '../pages/ResetPassword'; 

function Mainwrapper() {

  return (
    <div className="main-wrapper">
        <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Maincontent />} />
            <Route path="ApplicantDetails/:id" element={<ApplicantDetails />} />
            <Route path="ApplicantDetails/:id/uploadDocument" element={<DocumentUploadForm />} />
            <Route path="remarks-details" element={<RemarksDetails />} />
          </Route>
          <Route path="/login" element={<AgentLogin />} /> {/* Add the login route */}
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/student-signup" element={<StudentSignup />} />

          {/* New Password Routes */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        
    </div>
  );
}

export default Mainwrapper;
