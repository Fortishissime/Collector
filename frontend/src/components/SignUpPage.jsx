import React, { useState } from 'react';
import AvatarForm from './sign/AvatarForm';
import SignUpForm from './sign/SignUpForm';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import logo from '../assets/collector.png';

const SignUpPage = () => {
  const [avatar, setAvatar] = useState('');
  const [avatarInputVisible, setAvatarInputVisible] = useState(false);

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex flex-col justify-center items-center relative">
      
      {/* Semi-transparent overlay */}
      {avatarInputVisible && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-10"
          onClick={() => setAvatarInputVisible(false)}
        />
      )}

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

      <main className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center relative z-9">
        {/* Back arrow and text */}

        <h2 className="text-2xl font-bold mb-4 text-white">
          Create Your <span className="text-blue-500">Account</span>
        </h2>

        <Link
          to="/"
          className="absolute top-5 left-4 text-gray-400 hover:text-white transition"
          aria-label="Go back to main page"
        >
          <ArrowBack fontSize="large" />
        </Link>

        {/* Avatar management */}
        <AvatarForm
          avatar={avatar}
          setAvatar={setAvatar}
          avatarInputVisible={avatarInputVisible}
          setAvatarInputVisible={setAvatarInputVisible}
        />

        {/* Sign Up Form */}
        <SignUpForm avatar={avatar} />

        <p className="text-sm text-gray-400 mt-4">
          Already have an account?{' '}
          <Link to="/signin" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </main>
    </div>
  );
};

export default SignUpPage;
