import { Button, Typography, Box, Paper } from '@mui/material';
import { FallbackProps } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
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
      <Typography variant="h6">
        {error.message}
      </Typography>
      <Button
        variant="contained"
        onClick={resetErrorBoundary}
      >
        Try Again
      </Button>
    </Box>
  );
}

export default ErrorFallback;
