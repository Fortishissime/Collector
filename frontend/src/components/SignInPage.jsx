import React, { useState } from 'react';
import { Button, TextField, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/collector.png';

const SignInPage = () => {
  const [identifier, setIdentifier] = useState(''); // Username or email
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redirectLoading, setRedirectLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formatIdentifier = identifier.toLowerCase();
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: formatIdentifier, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: data.user.id,
            nickname: data.user.nickname,
            mail: data.user.mail,
            avatar: data.user.avatar,
            displayName: data.user.displayName,
            solde: data.user.solde,
            delta: data.user.delta,
          })
        );

        setSuccess('Login successful! Redirecting...');
        setLoading(false);

        setTimeout(() => {
          setRedirectLoading(true);
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        }, 1000);
      } else {
        setError(data.error || 'Invalid username/email or password.');
        setLoading(false);
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col justify-center items-center">
      {redirectLoading ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <CircularProgress size={60} thickness={4} style={{ color: '#1d4ed8' }} />
        </div>
      ) : (
        <>
          {/* Header */}
          <header className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4">
            <div className="flex items-center">
              <img
                src={logo}
                alt="Collector Logo"
                className="w-8 h-8 mr-2"
                draggable="false" 
              />
              <h2 className="text-white text-3xl font-bold font-sans">Collector</h2>
            </div>
          </header>

          {/* Main Content */}
          <main className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center relative">
            {/* Back Arrow */}
            <button
              onClick={() => navigate('/')}
              className="absolute top-5 left-3 text-gray-400 hover:text-white transition"
              aria-label="Back"
            >
              <ArrowBack fontSize="large" />
            </button>

            <h2 className="text-2xl font-bold mb-4 text-white">
              Welcome <span className="text-blue-500">Back</span>
            </h2>
            <form className="space-y-4" onSubmit={handleSignIn}>
              <TextField
                fullWidth
                label="E-mail or username"
                variant="outlined"
                color="primary"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                InputLabelProps={{ style: { color: '#9ca3af' } }}
                InputProps={{
                  style: { color: 'white', borderColor: '#1d4ed8' },
                }}
                required
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                color="primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputLabelProps={{ style: { color: '#9ca3af' } }}
                InputProps={{
                  style: { color: 'white', borderColor: '#1d4ed8' },
                }}
                required
              />
              {error && (
                <div style={{ color: 'red', fontSize: '0.875rem' }}>{error}</div>
              )}
              {success && (
                <div style={{ color: 'green', fontSize: '0.875rem' }}>{success}</div>
              )}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                style={{
                  backgroundColor: loading ? 'gray' : '#1d4ed8',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
            <p className="text-sm text-gray-400 mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </main>
        </>
      )}
    </div>
  );
};

export default SignInPage;
