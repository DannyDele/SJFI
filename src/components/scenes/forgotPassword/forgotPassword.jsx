import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

// Additional imports for professional style
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';






// Store the endpoint in a variable
const API_ENDPOINT = "https://fis.metaforeignoption.com";

// Custom styled components for professional look
const StyledBox = styled(Box)({
    marginTop: '2rem',
    marginLeft: '8rem',
  padding: '2rem',
  width: '80vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
    alignItems: 'center',
  justifyContent: 'center'
});

const StyledButton = styled(Button)({
  marginTop: '1rem',
});

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

    
    // Submit Email
const handleSubmit = async () => {
  setIsLoading(true);

  try {
    const response = await fetch(`${API_ENDPOINT}/api/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Failed to send reset password link');
    }

    // If the request is successful, display success message and clear the email field
    setIsSuccess(true);
    setEmail('');
  } catch (error) {
    // Handle the error
    console.error('Error:', error);
    // Optionally, you can display an error message to the user
  } finally {
    setIsLoading(false);
  }
};

  return (
    <StyledBox>
      <Typography variant="h5" gutterBottom>
        Forgot Password
      </Typography>
      <Typography>
        Please enter your registered email address and a reset password link will be sent to your email.
      </Typography>
      <TextField
        margin="dense"
        id="email"
        label="Email Address"
        type="email"
        fullWidth
        value={email}
        onChange={handleEmailChange}
      />
      <StyledButton onClick={handleSubmit} variant="contained" color="primary" disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : 'Submit'}
      </StyledButton>
      <Dialog open={isSuccess}>
        <DialogTitle>Password Reset Link Sent</DialogTitle>
        <DialogContent>
          <Alert severity="success">A password reset link has been sent to your email.</Alert>
        </DialogContent>
      </Dialog>
    </StyledBox>
  );
}

export default ForgotPassword;
