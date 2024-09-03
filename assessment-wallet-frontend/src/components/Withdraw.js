import React, { useState } from 'react';
import axios from 'axios';

const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const sessionKey = sessionStorage.getItem('user_key'); // Retrieve session_key from sessionStorage

    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('session_key', sessionKey);
    formData.append('user_email', sessionKey);

    try {
      const response = await axios.post(
        'http://localhost/assessment_wallet_backend/public_html/wallet/withdrawmoney',
        formData
      );

      // Handle the API response
      if (response.data.response) {
        // Success case
        setMessage(response.data.message || 'Withdrawal successful!');
        setError('');
      } else {
        // Failure case
        setError(response.data.message || 'Withdrawal failed.');
        setMessage('');
      }
    } catch (error) {
      console.error('Withdrawal failed:', error);
      setError('An error occurred while processing your withdrawal.');
      setMessage('');
    }
  };

  return (
    <div className="container">
      <h2>Withdraw Money</h2>
      <form onSubmit={handleWithdraw}>
        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Withdraw</button>
      </form>
      {message && <p className="success-message" style={{ color: 'green' }}>{message}</p>}
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Withdraw;
