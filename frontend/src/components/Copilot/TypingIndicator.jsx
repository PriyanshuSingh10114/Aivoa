import React from 'react';
import { Box } from '@mui/material';

export const TypingIndicator = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, p: 2, bgcolor: '#F8FAFC', borderRadius: 2, width: 'fit-content' }}>
      <Box sx={{ width: 6, height: 6, bgcolor: 'text.secondary', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }} />
      <Box sx={{ width: 6, height: 6, bgcolor: 'text.secondary', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.2s' }} />
      <Box sx={{ width: 6, height: 6, bgcolor: 'text.secondary', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.4s' }} />
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </Box>
  );
};
