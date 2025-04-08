import React, { useState } from 'react';
import { Avatar, IconButton, TextField, Button } from '@mui/material';
import { CameraAlt } from '@mui/icons-material';

const AvatarForm = ({ avatar, setAvatar, avatarInputVisible, setAvatarInputVisible }) => {
  const [avatarInputValue, setAvatarInputValue] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleAvatarSubmit = (e) => {
    e.preventDefault();
    setAvatar(avatarInputValue);
    setAvatarInputVisible(false);
    setAvatarInputValue('');
  };

  return (
    <div className="mb-6 relative">
      <IconButton
        onClick={() => setAvatarInputVisible(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Avatar
          alt="User Avatar"
          src={avatar}
          sx={{ width: 100, height: 100, backgroundColor: '#1d4ed8' }}
        />
        {isHovered && !avatar && (
          <CameraAlt
            sx={{
              color: 'white',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </IconButton>

      {avatarInputVisible && (
        <form className="absolute top-0 left-0 right-0 p-4 bg-gray-800 z-30 rounded-lg mt-7" onSubmit={handleAvatarSubmit}>
          <TextField
            fullWidth
            label="Avatar URL"
            variant="outlined"
            color="primary"
            value={avatarInputValue}
            onChange={(e) => setAvatarInputValue(e.target.value)}
            InputLabelProps={{ style: { color: '#9ca3af' } }}
            InputProps={{ style: { color: 'white', borderColor: '#1d4ed8' } }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#1d4ed8', marginTop: '1rem' }}
            type="submit"
          >
            Set Avatar
          </Button>
        </form>
      )}
    </div>
  );
};

export default AvatarForm;
