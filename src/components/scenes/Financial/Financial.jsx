import React from 'react';
import FinancialSummary from './FinancialSummary';
import TransactionSummary from './TransactionSummary';
 import {
  Box,
   Typography
  } from "@mui/material";

function Financial() {
  return (
 
    <Box className="container mx-auto p-6" style={{ width:"80vw", padding:"2rem 4rem 4rem 4rem" }}>
        <h1 className="text-3xl font-bold text-gray-500 mb-6">Financial</h1>

    <div className="flex flex-col items-start font-light w-full h-auto max-h-screen bg-FFF7F7"> 
      <div className="w-full max-w-screen-lg  mt-8"> {/* Added ml-8 and mt-8 */}
        <FinancialSummary />
      </div>
      <div > 
        <TransactionSummary />
      </div>
      </div>
      </Box>
  );
}

export default Financial;
