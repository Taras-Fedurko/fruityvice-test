import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorFallback from './components/ErrorFallback';
import JarProvider from './context/JarProvider';
import Container from './components/Container';
import theme from './utils/theme';

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error) => {
          console.error(error); // assume it's some Sentry logger
        }}
        onReset={() => {
          window.location.reload(); // todo
        }}
      >
        <QueryClientProvider client={queryClient}>
          <JarProvider>
            <Container />
          </JarProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
