import React from 'react';
import { Box, Typography } from '@mui/material';
import { Lightbulb } from 'lucide-react';

export const InsightCard = () => {
  return (
    <Box sx={{ 
      p: 2, 
      mb: 2,
      bgcolor: 'rgba(245, 158, 11, 0.1)', 
      border: '1px solid rgba(245, 158, 11, 0.2)',
      borderRadius: 2,
      display: 'flex',
      gap: 1.5,
      alignItems: 'flex-start'
    }}>
      <Lightbulb size={20} color="#D97706" style={{ marginTop: 2 }} />
      <Box>
        <Typography variant="subtitle2" sx={{ color: '#D97706', fontWeight: 600, mb: 0.5 }}>
          Smart Insight
        </Typography>
        <Typography variant="body2" sx={{ color: '#92400E', lineHeight: 1.5 }}>
          Dr. Kumar has not been visited in 18 days. His engagement score is High (92). 
          Last time you discussed CardioX.
        </Typography>
      </Box>
    </Box>
  );
};
