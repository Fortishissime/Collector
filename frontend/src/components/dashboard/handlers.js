import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useDashboardHandlers = () => { // Common content between pages of dashboard
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState('home');
  const [coins, setCoins] = useState(100.0);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notification, setNotification] = useState(null);
  

  // Handle menu item click
  const handleMenuClick = (pageId) => {
    setSelectedPage(pageId);
    navigate(`/dashboard/${pageId}`);
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget); // Définit l'élément comme ancrage du menu
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle daily gift
  const handleDailyGift = async () => {
    if (!user) return; // Ensure user data is available

    try {
      const response = await fetch(`/api/users/${user.nickname}/daily-gift`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setNotification({ message: data.error || 'Failed to claim daily gift', type: 'error' });
        return;
      }

      setNotification({ message: '💰 Daily gift: +50 credits (BUG : Refresh page to see it. Will be fixed soon)', type: 'success' });

      // Update user coins with animation
      const updatedCoins = data.user.solde;
      setCoins(updatedCoins);
      updateUserCoins(updatedCoins);

      const increment = (updatedCoins - coins) / 20; // Animation in 20 steps
      let currentCoins = coins;

      const interval = setInterval(() => {
        currentCoins += increment;
        if (currentCoins >= updatedCoins) {
          clearInterval(interval);
          currentCoins = updatedCoins;
        }
        setCoins(currentCoins);
      }, 50);
    } catch (error) {
      setNotification({ message: 'Error claiming daily gift', type: 'error' });
    }
  };

  // Update user coins in localStorage and state
  const updateUserCoins = (newCoins) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, solde: newCoins };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // Initialize user data from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    if (!token || !userInfo) {
      navigate('/signin');
    } else {
      setUser(userInfo);
      setCoins(userInfo.solde || 0); // Initialize coins
    }
  }, [navigate]);

  // Synchronize coins with user data
  useEffect(() => {
    if (user?.solde !== undefined) {
      setCoins(user.solde);
    }
  }, [user]);

  return {
    selectedPage,
    setSelectedPage,
    coins,
    setCoins,
    user,
    setUser,
    notification,
    setNotification,
    handleMenuClick,
    handleLogout,
    handleAvatarClick,
    handleMenuClose,
    handleDailyGift,
    anchorEl,
    setAnchorEl,
  };
};
