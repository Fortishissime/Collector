import React from 'react';
import { Box, Typography } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const DBLeaderboard = () => {
  return (
    <Box
      className="relative ml-80 justify-center max-h-screen"
    >
      <Box
        className="flex flex-col items-center justify-center gap-4 bg-gray-800"
        sx={{
          width: 1200,
          height: 600,
          backgroundColor: 'gray.800',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <HourglassEmptyIcon sx={{ fontSize: 60, color: 'gray.500' }} />
        <Typography variant="h6" sx={{ color: 'white' }}>
          Coming soon...
        </Typography>
      </Box>
    </Box>
  );
};

export default DBLeaderboard;