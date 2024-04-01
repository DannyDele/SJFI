import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';






// Store the endpoint in a variable
const API_ENDPOINT = "https://api.stj-fertilityinstitute.com";

const TransactionSummary = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
    const [token, setToken] = useState('');


  
  const authToken = Cookies.get('authToken');


  useEffect(() => {

 if (authToken) {
      setToken(authToken);
      console.log('Token:', token)
    }
    



    // Funtion to fetch user transaction informations
    const fetchTransactions = async () => {
  try {
    setLoading(true);
    const response = await fetch(`${API_ENDPOINT}/api/trx`, {
      headers: {
        "Authorization": `bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    const data = await response.json();
    console.log('Transaction data:', data);

    const transactionsWithUsernames = await Promise.all(data.map(async transaction => {
  try {
    const userResponse = await fetch(`${API_ENDPOINT}/api/users/${transaction.userid}`);
    if (!userResponse.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await userResponse.json();
    console.log('User Data', userData.user.username);

    // Check if username is undefined
    const username = userData.user?.username || 'Unknown';

    return {
      ...transaction,
      username: username
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    // Handle error if necessary
    return {
      ...transaction,
      username: 'Unknown' // Set a default username or handle the error appropriately
    };
  }
}));

const dataWithActualValues = transactionsWithUsernames.map(transaction => ({
  _id: transaction._id,
  status: transaction.status,
  session_id: transaction.session_id,
  amount: parseFloat(transaction.amount),
   timestamp: new Date(transaction.timestamp).toLocaleString('en-US', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
   }),
            username: transaction.username
}));

setTransactions(dataWithActualValues);
console.log('Transactions', transactions);

    setLoading(false);
  } catch (error) {
    console.log('Error fetching data:', error);
    setLoading(false);
  }
};


    fetchTransactions();
  }, []);

const columns = [
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'session_id', headerName: 'Session ID', width: 250 },
  { 
    field: 'status', 
    headerName: 'Status', 
    width: 200, 
    renderCell: (params) => (
      <span style={{ color: getStatusColor(params.value) }}>{params.value}</span>
    )
  },
  { field: 'amount', headerName: 'Amount', width: 150 },
  { field: 'timestamp', headerName: 'Time', width: 200 },
];

function getStatusColor(status) {
  switch(status) {
    case 'Completed':
      return 'green';
    case 'Failed':
      return 'red';
    case 'Pending':
      return 'grey';
    default:
      return 'black';
  }
}


  const getRowId = (row) => row._id;

  return (
    <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-4">
        <h2 className="text-2xl font-bold text-gray-500 mb-6">Transaction Summary</h2>
        <div style={{ height: 400 }}>
          {loading ? (
            <Box display="flex" justifyContent="center" marginTop="2rem">
              <CircularProgress style={{ display: 'flex', marginTop:'30vh', marginLeft: '30vw'}} />
            </Box>
          ) : (
            <DataGrid
              rows={transactions}
              columns={columns}
              components={{
                Toolbar: GridToolbar
              }}
              getRowId={getRowId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;
