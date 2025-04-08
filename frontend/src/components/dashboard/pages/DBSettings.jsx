import React, { useState } from 'react';
import { Avatar, Button, TextField, Dialog, DialogContent, DialogActions, IconButton, InputAdornment } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useDashboardHandlers } from '../handlers';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const DBSettings = () => {

  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(JSON.parse(localStorage.getItem('user')).avatar || 'https://cdn-icons-png.flaticon.com/512/15735/15735339.png');
  const [nickname, setNickname] = useState('userNickname'); // Replace with actual data from context or props
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [showPassword, setShowPassword] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);


  // Modal state for avatar change
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [newAvatar, setNewAvatar] = useState('');


  const handleDeleteAccount = async () => {
    try {



      await axios.delete(`/api/users/${user.nickname}`);
      alert('Your account has been successfully deleted.');
      localStorage.removeItem('user');
      navigate('/'); // Redirection après suppression
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete your account. Please try again.');
    }
  };
  


  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`/api/users/${user.nickname}`, {
        displayName,
        mail: email,
        password,
        avatar,
      });

      const data = response.data;
      alert('Your information has been successfully updated.');
      localStorage.removeItem('user');
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
      window.location.reload(); // For changes to apply since we don't use context :c (That's why coins are not updated)
    } catch (error) {
      if(error.response) {

        alert('Failed to update your information.' + error.response.data);
      } else {
        console.error('Error updating user:', error);
        alert('Failed to update your information. Please try again.');
      }
    }
  };

  const handleAvatarUpdate = () => {
    setAvatar(newAvatar);
    setIsAvatarModalOpen(false);
  };

  return (
    <Box className="p-8 bg-gray-800 text-white rounded-md w-full max-w-xl mx-auto shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Avatar Section */}
      <Box className="flex flex-col items-center gap-4 mb-6">
        <Avatar
          src={avatar || 'https://via.placeholder.com/150'}
          alt="User Avatar"
          sx={{ width: 80, height: 80, cursor: 'pointer', transition: '0.3s' }}
          onClick={() => setIsAvatarModalOpen(true)}
          className="hover:brightness-110"
        />
        <p className="text-lg font-semibold text-gray-300">
          <span className="text-blue-400">Display Name:</span> {user.displayName}
        </p>
        <p className="text-lg font-semibold text-gray-300">
          <span className="text-blue-400">Email:</span> {user.mail}
        </p>
    </Box>


      {/* Form Section */}
      <Box component="form" className="flex flex-col gap-4">
        <TextField
          label="Display Name"
          variant="outlined"
          fullWidth
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

        <Button
          variant="contained"
          color="primary"
          className="mt-4 bg-blue-600 hover:bg-blue-700"
          onClick={handleUpdate}
        >
          Update
        </Button>
        <Button
          variant="contained"
          color="error"
          className="mt-4 bg-red-600 hover:bg-red-700"
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          Delete Account
        </Button>

      </Box>

      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogContent className="bg-gray-800 text-white">
          <h2 className="text-xl font-semibold mb-4">Confirm Account Deletion</h2>
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
        </DialogContent>
        <DialogActions className="bg-gray-800">
          <Button onClick={() => setIsDeleteDialogOpen(false)} className="text-gray-400">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            variant="contained"
            color="error"
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>


      {/* Avatar Modal */}
      <Dialog open={isAvatarModalOpen} onClose={() => setIsAvatarModalOpen(false)}>
        <DialogContent className="bg-gray-800 text-white">
          <h2 className="text-xl font-semibold mb-4">Update Avatar</h2>
          <TextField
            label="New Avatar URL"
            variant="outlined"
            fullWidth
            value={newAvatar}
            onChange={(e) => setNewAvatar(e.target.value)}
            className="bg-gray-700"
          />
        </DialogContent>
        <DialogActions className="bg-gray-800">
          <Button onClick={() => setIsAvatarModalOpen(false)} className="text-gray-400">
            Cancel
          </Button>
          <Button
            onClick={handleAvatarUpdate}
            variant="contained"
            color="primary"
            className="bg-blue-600 hover:bg-blue-700"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DBSettings;
