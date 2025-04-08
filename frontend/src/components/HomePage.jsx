import React, { useState, useEffect } from 'react';
import { Button, Menu, MenuItem, Avatar, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/collector.png';
import {jwtDecode} from 'jwt-decode'; 

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const isTokenExpired = decodedToken.exp * 1000 < Date.now();

        if (isTokenExpired) {
          
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          setIsLoggedIn(false);
          setUser(null);
        } else if (userInfo) {
          
          setIsLoggedIn(true);
          setUser(userInfo);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4">
        {/* Logo and Title on the Left */}
        <div className="flex items-center">
          <img
            src={logo} // Replace with actual logo path
            alt="Collector Logo"
            className="w-8 h-8 mr-2"
            draggable="false"
          />
          <h2 className="text-white text-3xl font-bold font-sans">Collector</h2>
        </div>

        {/* Right Side: Avatar and Login/Signup Buttons */}
        <div className="flex space-x-4">
          {isLoading ? ( 
            <CircularProgress color="inherit" size={32} />
          ) : isLoggedIn && user ? (
            <>
              <Avatar
                src={user.avatar || 'https://cdn-icons-png.flaticon.com/512/15735/15735339.png'} 
                alt="User Avatar"
                onClick={handleAvatarClick}
                className="cursor-pointer hover:scale-105 transition-transform duration-200"
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  style: {
                    backgroundColor: '#1f2937', 
                    color: '#f3f4f6', 
                    borderRadius: '8px',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                  },
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate('/dashboard');
                  }}
                  className="hover:bg-blue-500 hover:text-white transition-colors duration-200"
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate('/settings');
                  }}
                  className="hover:bg-blue-500 hover:text-white transition-colors duration-200"
                >
                  Settings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    setIsLoggedIn(false);
                    setUser(null);
                    handleMenuClose();
                  }}
                  className="hover:bg-red-500 hover:text-white transition-colors duration-200"
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : ( 
            <>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ backgroundColor: '#1d4ed8' }}
                onClick={() => navigate('/signin')}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                style={{ color: '#1d4ed8', borderColor: '#1d4ed8' }}
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome to <span className="text-blue-500">Collector</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl ml-1">
          Find out how to bet on your favorite League of Legends teams and track their progress
        </p>
        <div className="grid mt-20 md:grid-cols-3 gap-36">
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6837/6837225.png"
              alt="Step 1"
              className="mb-4 rounded-lg size-7/12"
            />
            <p className="text-gray-300">Create an account and log in</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility.png"
              alt="Step 2"
              className="mb-4 rounded-lg size-7/12"
            />
            <p className="text-gray-300">Select a match or tournament</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4328/4328263.png"
              alt="Step 3"
              className="mb-4 rounded-lg size-7/12"
            />
            <p className="text-gray-300">Bet and track your results</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-5 text-center text-gray-400">
        <p>© 2024 Collector. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
