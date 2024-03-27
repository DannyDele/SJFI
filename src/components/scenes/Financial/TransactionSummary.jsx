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

    const fetchTransactions = async () => {
      try {
        setLoading(true)
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

        const dataWithActualValues = data.map(transaction => ({
          _id: transaction._id,
          reference: transaction.reference,
          session_id: transaction.session_id,
          amount: parseFloat(transaction.amount),
          fee: parseFloat(transaction.fee),
        }));

        setTransactions(dataWithActualValues);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const columns = [
    { field: '_id', headerName: 'ID', width: 150 },
    { field: 'reference', headerName: 'Reference', width: 200 },
    { field: 'session_id', headerName: 'Session ID', width: 250 },
    { field: 'amount', headerName: 'Amount', width: 150 },
    { field: 'fee', headerName: 'Fee', width: 150 },
  ];

  const getRowId = (row) => row._id;

  return (
    <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-4">
        <h2 className="text-2xl font-bold text-gray-500 mb-6">Transaction Summary</h2>
        <div style={{ height: 400 }}>
          {loading ? (
            <Box display="flex" justifyContent="center" marginTop="2rem">
              <CircularProgress />
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
