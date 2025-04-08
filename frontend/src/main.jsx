import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// PAGES 


import HomePage from './components/HomePage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import TermsAndConditionsPage from './components/TermsAndConditionsPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import DashboardPage from './components/DashboardPage';
import DBHome from './components/dashboard/pages/DBHome';
import DBBets from './components/dashboard/pages/DBBets';
import DBLeaderboard from './components/dashboard/pages/DBLeaderboard';
import DBSettings from './components/dashboard/pages/DBSettings';

const Main = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* Home Page */}
          <Route path="/signin" element={<SignInPage />} />  {/* Sign In Page */}
          <Route path="/signup" element={<SignUpPage />} />  {/* Sign Up Page */}
          <Route path="/terms" element={<TermsAndConditionsPage />} />  {/* Terms and Conditions Page */}
          <Route path="/privacy" element={<PrivacyPolicyPage />} />  {/* Privacy Policy Page */}
          
          {/* Dashboard routes with their children */}
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<DBHome />} /> {/* Default dashboard page */}
            <Route path="bets" element={<DBBets />} />
            <Route path="leaderboard" element={<DBLeaderboard />} />
            <Route path="settings" element={<DBSettings />} />
          </Route>

        </Routes>
      </ThemeProvider>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

