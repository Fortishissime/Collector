// DBHeader.jsx
import React, { useEffect } from 'react';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { MonetizationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDashboardHandlers } from '../handlers';
import { use } from 'react';


const DBHeader = () => {
  const { 
    user, 
    coins,
    setCoins,
    handleAvatarClick, 
    handleLogout,  
    anchorEl, 
    setAnchorEl, 
    notification, 
    setNotification } = useDashboardHandlers();

  const navigate = useNavigate();
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="flex justify-between items-center px-6 py-4">
      <div></div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center bg-gray-800 pl-3 pr-4 py-2 rounded-full">
          <MonetizationOn className="text-yellow-500 mr-1.5 text-lg" />
          <span className="text-gray-300 font-mono text-sm font-medium select-none">
            {coins.toFixed(2)}
          </span>
        </div>
        <Avatar
          src={user?.avatar || 'https://cdn-icons-png.flaticon.com/512/15735/15735339.png'}
          alt="User Avatar"
          className="cursor-pointer hover:scale-105 transition-transform duration-200"
          onClick={handleAvatarClick} 
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
              minWidth: '250px',
              marginTop: '5px',
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
          <div className="px-4 py-2">
            <div className="text-lg font-semibold text-white">{user?.displayName}</div>
            <div className="text-sm text-gray-400">@{user?.nickname}</div>
          </div>
          <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate('/dashboard');
              }}
          >Dashboard</MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate('/settings');
              }}
            >
              Settings
            </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default DBHeader;
