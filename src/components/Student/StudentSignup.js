import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { studentSignup as studentSignupApi } from '../../api/api';

const StudentSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [citizenship, setCitizenship] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log('firstName:', firstName);
    console.log('lastName:', lastName);
    console.log('citizenship:', citizenship);
    console.log('email:', email);
    console.log('password:', password);
    console.log('confirmPassword:', confirmPassword);
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await studentSignupApi({ firstname: firstName, lastname: lastName, citizenship, email, password });
      toast.success('Signup successful! Please login.');
      navigate('/student-login');
    } catch (error) {
      console.error('Signup failed:', error);
      toast.error('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h1>Student Signup</h1>
      <form className="signup-form" onSubmit={handleSignup}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          placeholder="Enter your first name"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor="lastName" style={{ marginTop: '20px' }}>Last Name:</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          placeholder="Enter your last name"
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor="citizenship" style={{ marginTop: '20px' }}>Citizenship:</label>
        <input
          type="text"
          id="citizenship"
          value={citizenship}
          placeholder="Enter your citizenship"
          onChange={(e) => setCitizenship(e.target.value)}
        />

        <label htmlFor="email" style={{ marginTop: '20px' }}>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password" style={{ marginTop: '20px' }}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          required
        />

        <label htmlFor="confirmPassword" style={{ marginTop: '20px' }}>Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="login-link" style={{ marginTop: '20px' }}>
                Already have an account? <Link to="/student-login">Login</Link>
            </div>
            <button type="submit" style={{ marginTop: '20px' }}>Signup</button>
        </div>
        
      </form>
    </div>
  );
};

export default StudentSignup;
