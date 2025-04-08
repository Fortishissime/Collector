import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, SportsEsports, Leaderboard, Settings } from '@mui/icons-material';
import logo from '../../../assets/collector.png';

const DBSideBar = ({ selectedPage, handleMenuClick, handleDailyGift, handleLogout }) => {
  const menuItems = [
    { id: '', label: 'Home', icon: <Home /> },
    { id: 'bets', label: 'My Bets', icon: <SportsEsports /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Leaderboard /> },
    { id: 'settings', label: 'Settings', icon: <Settings /> },
  ];

  return (
    <aside className="bg-gray-800 min-w-60 w-60 p-4 flex flex-col justify-between fixed top-0 left-0 h-screen">
      <div>
        <div className="flex items-center mb-6">
          <img src={logo} alt="Collector Logo" className="w-8 h-8 mr-2" draggable="false" />
          <h2 className="text-white text-3xl font-bold font-sans">Collector</h2>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              selected={selectedPage === item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`hover:bg-gray-700 rounded-md ${selectedPage === item.id ? 'bg-gray-700' : ''}`}
            >
              <ListItemIcon className="text-gray-300">{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} primaryTypographyProps={{ className: 'text-gray-300 no-select' }} />
            </ListItem>
          ))}
        </List>
      </div>
      <div className="flex flex-col space-y-4">
        <button
          onClick={handleDailyGift}
          className="w-full py-2 text-white border border-white rounded-full transition-colors duration-200 hover:bg-white hover:text-black"
        >
          Daily Gift
        </button>
        <button
          onClick={handleLogout}
          className="w-full py-2 text-red-500 border border-red-500 rounded-full transition-colors duration-200 hover:bg-red-500 hover:text-white"
        >
          Log out
        </button>
      </div>
    </aside>
  );
};

export default DBSideBar;
