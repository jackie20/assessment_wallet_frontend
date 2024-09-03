import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Wallet.css';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // React Router's navigate hook

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const sessionKey = sessionStorage.getItem('user_key');
        const formData = new FormData();
        formData.append('session_key', sessionKey);

        const response = await axios.post(
          'http://localhost/assessment_wallet_backend/public_html/wallet',
          formData
        );

        if (response.data.response) {
          const walletData = response.data.data[0];
          setUserName(walletData.user_names);
          setBalance(parseFloat(walletData.balance));
        } else {
          setError('Failed to retrieve wallet data.');
        }
      } catch (error) {
        console.error('Failed to fetch wallet data:', error);
        setError('Failed to fetch wallet data. Please try again later.');
      }
    };

    fetchWalletData();
  }, []);

  // Handlers for button actions to navigate to other pages
  const handleViewTransactions = () => {
    navigate('/viewtransactions'); // Navigate to View Transactions
  };

  const handleDepositMoney = () => {
    navigate('/deposit'); // Navigate to Deposit Money
  };

  const handleWithdrawMoney = () => {
    navigate('/withdraw'); // Navigate to Withdraw Money
  };

  const handleTransferMoney = () => {
    navigate('/transfer'); // Navigate to Transfer Money
  };

  return (
    <div className="wallet-container">
      <div className="wallet-info">
        <h2>Wallet Balance</h2>
        <p className="welcome-message">Welcome, {userName}!</p>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <p className="balance">Your current balance is: <span className="balance-amount">R{balance.toFixed(2)}</span></p>
        )}

        {/* Buttons for wallet actions */}
        <div className="wallet-buttons">
          <button onClick={handleViewTransactions} className="wallet-button">
            View Transactions
          </button>
          <button onClick={handleDepositMoney} className="wallet-button">
            Deposit Money
          </button>
          <button onClick={handleWithdrawMoney} className="wallet-button">
            Withdraw Money
          </button>
          <button onClick={handleTransferMoney} className="wallet-button">
            Transfer Money
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
