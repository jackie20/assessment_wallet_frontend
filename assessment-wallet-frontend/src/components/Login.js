import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import a custom CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState(''); // State for API response message
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append('username', email); // Append username
    formData.append('password', password); // Append password

    try {
      const res = await axios.post('http://localhost/assessment_wallet_backend/public_html/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Specify the content type
        },
      });

      const { response: isSuccess, message, data } = res.data;
      if (isSuccess) {
        // Store user data in session storage
        const user = data[0]; // Assuming the user data is in the first element
        sessionStorage.setItem('user_names', user.user_names);
        sessionStorage.setItem('user_email', user.user_email);
        sessionStorage.setItem('user_key', user.user_key);

        setResponse(message || 'Login successful!');
        // Redirect to the dashboard or another page
        navigate('/wallet');
      } else {
        setResponse(message || 'Login failed.');
      }
    } catch (error) {
      setResponse(error.response?.data?.message || 'Login failed: Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          {response && <p className="response-message">{response}</p>} {/* Display response message */}
        </form>
        <div className="register-link">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
