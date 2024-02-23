import React from 'react';
import FinancialSummary from './FinancialSummary';
import TransactionSummary from './TransactionSummary';

function Financial() {
  return (
    <div className="flex flex-col items-start font-light w-full h-auto max-h-screen bg-FFF7F7"> 
      <div className="w-full max-w-screen-lg"> 
        <FinancialSummary />
      </div>
      <div className="mt-4 ml-8"> 
        <TransactionSummary />
      </div>
    </div>
  );
}

export default Financial;