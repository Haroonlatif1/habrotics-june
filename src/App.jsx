import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';

import Home from './pages/Home';

// Simple 404 component
const NotFound = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#020617',
    color: '#F8FAFC',
    fontFamily: "'Poppins', sans-serif"
  }}>
    <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#4F46E5' }}>404</h1>
    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page Not Found</h2>
    <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#94A3B8' }}>
      The page you're looking for doesn't exist.
    </p>
    <a 
      href="/" 
      style={{
        padding: '12px 24px',
        backgroundColor: '#4F46E5',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#3730A3'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#4F46E5'}
    >
      Go Home
    </a>
  </div>
);


const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#81C784',
      light: '#A5D6A7',
      dark: '#66BB6A',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8FFF8',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#1B5E20',
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#2E7D32',
    },
    h5: {
      fontWeight: 600,
      color: '#2E7D32',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px rgba(46, 125, 50, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(46, 125, 50, 0.1)',
        },
      },
    },
  },
});

// 👇 Create a wrapper to use hooks like useLocation
function AppContent() {
  const location = useLocation();

  // Check if it's not the home page
  const isHome = location.pathname === '/';

  return (
    <div className="app">
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
