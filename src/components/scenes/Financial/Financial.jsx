import React from 'react';
import FinancialSummary from './FinancialSummary';
import TransactionSummary from './TransactionSummary';
 import {
  Box,
   Typography
  } from "@mui/material";

function Financial() {
  return (
 
    <Box padding="2rem" width="80vw" height="100vh">
        <Typography variant="h4" className="mb-4 font-bold text-gray-500">Financial</Typography>

    <div className="flex flex-col items-start font-light w-full h-auto max-h-screen bg-FFF7F7"> 
      <div className="w-full max-w-screen-lg ml-8 mt-8"> {/* Added ml-8 and mt-8 */}
        <FinancialSummary />
      </div>
      <div className="mt-4 ml-8"> 
        <TransactionSummary />
      </div>
      </div>
      </Box>
  );
}

export default Financial;
