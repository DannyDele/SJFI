import React from 'react';

const TransactionSummary = () => {
  // Sample transaction data
  const transactions = [
    { id: 1,serialnumber:'1', transactionid:'345674', username: 'Esther Brown', date :'14-2-2024', amount: 100,time:'12:30', status: 'Completed' },
    { id: 2, serialnumber:'2', transactionid:'234561',username: 'Stephanie Doe', date :'1-31-2024', amount: 200,time:'10:30', status: 'Pending' },
    { id: 3,serialnumber:'3', transactionid:'564772',username: 'Alice Johnson', date :'1-26-2024', amount: 150, time:'11:30', status: 'Completed' },
    { id: 4,serialnumber:'4',transactionid:'198654', username: 'Bob Snow', date :'2-20-2024', amount: 250, time:'09:30', status: 'Failed' },
    { id: 5,serialnumber:'5', transactionid:'357089',username: 'Ellie Rivers', date :'1-14-2024', amount: 180,time:'08:30',  status: 'Completed' },
  ];

  return (
    <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-4"> 
        <h2 className="text-lg font-normal mb-4">Transaction Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full sm:w-auto divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-light text-gray-500 uppercase tracking-wider">
                 Serial Number
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.serialnumber}</div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.transactionid}</div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.username}</div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-500">${transaction.amount}</div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.date}</div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{transaction.time}</div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Function to determine status color based on status
const getStatusColor = (status) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default TransactionSummary;

