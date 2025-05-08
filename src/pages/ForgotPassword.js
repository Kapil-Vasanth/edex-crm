import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../api/api';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // manual loading state
  const navigate = useNavigate(); // for navigation 

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      setEmail(''); // Clear the email input on success
      toast.success(data.message);
      navigate('/student-login'); // Redirect to login page
      // Optionally, redirect to a different page or show a success message
    },
    onError: (error) => {
      console.error('Forgot password error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    },
    onSettled: () => {
      setIsLoading(false); // always reset loading
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    mutation.mutate(email);
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <label htmlFor="email">Enter your email:</label>
        <input
          type="email"
          id="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      <div className="back-to-login-link" style={{ marginTop: '20px' }}>
        <Link to="/student-login">Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
