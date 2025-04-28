import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Optional, for notifications
import { agentLogin } from '../api/api'; // Axios API instance

const AgentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await agentLogin(email, password);

      if(response) {
        navigate('/');
        toast.success('Login successful!');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Agent Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AgentLogin;
