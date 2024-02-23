import React from 'react';

const FinancialSummary = () => {
  // Sample financial data
  const totalBalance = 15000;
  const totalSpent = 8500;
  const amountNotSpent = totalBalance - totalSpent;

  return (
    <div className="header relative">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full max-w-3xl px-4 py-2"> {/* Adjusted grid columns and reduced padding */}
        <div className="flex items-center bg-green-100 h-20 rounded-none px-4"> {/* Reduced height */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <div>
            <p className="text-sm text-black font-light">Total Balance</p>
            <p className="font-light text-base text-black">${totalBalance}</p>
          </div>
        </div>

        <div className="flex items-center bg-red-100 h-20 rounded-none px-4"> {/* Reduced height */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <div>
            <p className="text-sm text-black font-light">Total Amount Spent</p>
            <p className="font-light text-base text-black">${totalSpent}</p>
          </div>
        </div>

        <div className="flex items-center bg-blue-100 h-20 rounded-none px-4"> {/* Reduced height */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="text-sm text-black font-light">Amount Not Spent</p>
            <p className="font-light text-base text-black">${amountNotSpent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
