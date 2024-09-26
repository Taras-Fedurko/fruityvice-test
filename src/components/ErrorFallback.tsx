import { Button, Typography, Box, Paper } from '@mui/material';
import { FallbackProps } from 'react-error-boundary';
import { AxiosError } from 'axios';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const axiosError = error as AxiosError;

  const handleButtonClick = () => {
    // If error is related to CORS, open the CORS access page in a new tab
    if (axiosError?.response?.status === 403) {
      window.open('https://cors-anywhere.herokuapp.com/', '_blank');
    } else {
      resetErrorBoundary(); // Reset the error boundary to retry rendering
    }
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      role="alert"
      p={4}
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}
    >
      <Typography variant="h3">
        Oops! Something went wrong.
      </Typography>
      {axiosError?.response?.status === 403 && (
        <Typography variant="h6">
          Please visit https://cors-anywhere.herokuapp.com/ and request access to work with the CORS server.
        </Typography>
      )}
      <Typography variant="body1">
        {axiosError?.message}
      </Typography>
      <Button
        variant="contained"
        onClick={handleButtonClick}
      >
        Try Again
      </Button>
    </Box>
  );
}

export default ErrorFallback;
