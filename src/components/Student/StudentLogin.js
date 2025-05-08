import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { studentLogin as studentLoginApi } from '../../api/api';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, student } = await studentLoginApi(email, password);

      if (token && student) {
        toast.success('Login successful!');
        navigate(`/ApplicantDetails/${student.student_id}`);
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1>Student Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password" style={{marginTop: '20px'}}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        
        <button type="submit" style={{marginTop: '20px'}}>Login</button>
        

        <div className="forgot-password-link" style={{marginTop: '20px'}}>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default StudentLogin;
