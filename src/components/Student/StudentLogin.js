import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { studentLogin as studentLoginApi } from '../../api/api'; // Your API function

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
        navigate(`/ApplicantDetails/${student.student_id}`); // Redirect to student profile page
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className='text-center'
      style={{
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        width: '400px',
        margin: 'auto',
        marginTop: '50px'
      }}>
      <h1>Student Login</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px', margin: 'auto' }}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{ marginBottom: '10px', padding: '8px' }}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          style={{ marginBottom: '10px', padding: '8px' }}
        />

        <button type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default StudentLogin;
