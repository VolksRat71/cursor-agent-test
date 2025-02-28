import React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

/**
 * Main App component
 * Sets up theming and renders the header and dashboard
 */
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize CSS */}
      <div className="App">
        <Header />
        <Dashboard />
      </div>
    </ThemeProvider>
  );
}

export default App;
