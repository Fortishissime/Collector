// DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import DBSideBar from './dashboard/modules/DBSideBar';
import DBHeader from './dashboard/modules/DBHeader';
import Notification from './dashboard/modules/Notification';
import { useDashboardHandlers } from './dashboard/handlers';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { 
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
    handleDailyGift,
    anchorEl,
    setAnchorEl,
  } = useDashboardHandlers();


  useEffect(() => {
    document.title = 'Dashboard - Home';
    const token = localStorage.getItem('authToken');
    const userInfo = JSON.parse(localStorage.getItem('user'));

    if (!token || !userInfo) {
      navigate('/signin');
    } else {
      setUser(userInfo);
      setCoins(userInfo.solde || 0);
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      <DBSideBar
        selectedPage={selectedPage}
        handleMenuClick={handleMenuClick}
        handleDailyGift={handleDailyGift}
        handleLogout={handleLogout}
      />
      <div className="flex-grow flex flex-col">
        <DBHeader
          user={user}
          coins={coins}
          handleAvatarClick={handleAvatarClick} 
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          notification={notification}
          setNotification={setNotification}
          handleLogout={handleLogout}
        />
        <main className="p-6 flex-grow">
          <Outlet/>
        </main>
      </div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
