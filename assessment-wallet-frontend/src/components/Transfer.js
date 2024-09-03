import React, { useState } from 'react';
import axios from 'axios';

const Transfer = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleTransfer = async (e) => {
    e.preventDefault();
    const sessionKey = sessionStorage.getItem('user_key'); // Retrieve session_key from sessionStorage

    const formData = new FormData();
    formData.append('recipient_email', recipientEmail);
    formData.append('amount', amount);
    formData.append('session_key', sessionKey);

    try {
      const response = await axios.post(
        'http://localhost/assessment_wallet_backend/public_html/wallet/transfermoney',
        formData
      );

      // Handle the API response
      if (response.data.response) {
        // Success case
        setMessage(response.data.message || 'Transfer successful!');
        setError('');
      } else {
        // Failure case
        setError(response.data.message || 'Transfer failed.');
        setMessage('');
      }
    } catch (error) {
      console.error('Transfer failed:', error);
      setError('An error occurred while processing your transfer.');
      setMessage('');
    }
  };

  return (
    <div className="container">
      <h2>Transfer Money</h2>
      <form onSubmit={handleTransfer}>
        <div className="form-group">
          <label htmlFor="recipientEmail">Recipient Email:</label>
          <input
            type="email"
            className="form-control"
            id="recipientEmail"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="btn btn-primary">Transfer</button>
      </form>
      {message && <p className="success-message" style={{ color: 'green' }}>{message}</p>}
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Transfer;
