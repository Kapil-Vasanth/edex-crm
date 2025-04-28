import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Maincontent from './main-content';
import ApplicantDetails from './ApplicantDetails/Applicant-Details';
import RemarksDetails from './remarks-details';
import StudentLogin from './Student/StudentLogin';
import AgentLogin from './AgentLogin'; // Import the AgentLogin component
import Layout from './Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Mainwrapper() {

  return (
    <div className="main-wrapper">
        <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Maincontent />} />
            <Route path="ApplicantDetails/:id" element={<ApplicantDetails />} />
            <Route path="remarks-details" element={<RemarksDetails />} />
          </Route>
          <Route path="/login" element={<AgentLogin />} /> {/* Add the login route */}
          <Route path="/student-login" element={<StudentLogin />} />
        </Routes>
        
    </div>
  );
}

export default Mainwrapper;
