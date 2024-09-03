import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';

const ViewTransactions = () => {
  const [transactions, setTransactions] = useState([]); // Initialize as an empty array
  const [balance, setBalance] = useState(''); // State for balance
  const [currency, setCurrency] = useState(''); // State for currency
  const [error, setError] = useState('');
  const navigate = useNavigate(); // React Router's navigate hook

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const session_key = sessionStorage.getItem('user_key');

        const formData = new FormData();
        formData.append('session_key', session_key);

        const response = await axios.post(
          'http://localhost/assessment_wallet_backend/public_html/wallet/viewtransactions',
          formData
        );

        if (response.data.response === true) {
          setBalance(response.data.data.balance);
          setCurrency(response.data.data.currency);
          setTransactions(response.data.data.transactions); // Set the transactions data
        } else {
          setError(response.data.message || 'Failed to fetch transactions');
        }
      } catch (error) {
        setError('An error occurred while fetching transactions');
      }
    };

    fetchTransactions();
  }, []);

  // Define the columns for the data table
  const columns = [
    {
      name: 'Transaction ID',
      selector: row => row.transaction_id,
      sortable: true,
    },
    {
      name: 'Type',
      selector: row => row.transaction_type,
      sortable: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
    },
    {
      name: 'Amount',
      selector: row => row.amount,
      sortable: true,
      right: true,
    },
    {
      name: 'Date',
      selector: row => row.transaction_date,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
    },
  ];

  // Handlers for button actions to navigate to other pages
  const handleViewWallet = () => {
    navigate('/wallet');
  };

  const handleDepositMoney = () => {
    navigate('/deposit');
  };

  const handleWithdrawMoney = () => {
    navigate('/withdraw');
  };

  const handleTransferMoney = () => {
    navigate('/transfer');
  };

  return (
    <div className="container">
      <h2>Transaction History</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Balance: {balance} {currency}</h3> {/* Display the user's balance */}

      {/* Add Buttons for different actions */}
      <div className="button-container" style={{ marginBottom: '20px' }}>
        <button className="btn btn-primary" onClick={handleViewWallet}>
          View Wallet
        </button>
        <button className="btn btn-success" onClick={handleDepositMoney}>
          Deposit Money
        </button>
        <button className="btn btn-warning" onClick={handleWithdrawMoney}>
          Withdraw Money
        </button>
        <button className="btn btn-info" onClick={handleTransferMoney}>
          Transfer Money
        </button>
      </div>

      {transactions.length > 0 ? (
        <DataTable
          title="Transactions"
          columns={columns}
          data={transactions}
          pagination // Enable pagination
          fixedHeader // Fix the table header
          highlightOnHover // Highlight rows on hover
          responsive // Make the table responsive
        />
      ) : (
        <p>No transactions available.</p>
      )}
    </div>
  );
};

export default ViewTransactions;
