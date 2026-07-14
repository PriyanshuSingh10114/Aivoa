import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Target } from 'lucide-react';

export const RecommendationCard = ({ onActionClick }) => {
  const actions = [
    "Bring CardioX samples",
    "Share efficacy paper",
    "Ask about Gastrolin side effects"
  ];

  return (
    <Box sx={{ 
      p: 2, 
      mb: 3,
      bgcolor: '#FFFFFF', 
      border: '1px solid #E2E8F0',
      borderRadius: 2
    }}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1.5 }}>
        <Target size={18} color="#2563EB" />
        <Typography variant="subtitle2" sx={{ color: '#0F172A', fontWeight: 600 }}>
          Next Best Action
        </Typography>
      </Box>
      <Stack spacing={1}>
        {actions.map((action, index) => (
          <Button 
            key={index} 
            variant="outlined" 
            size="small" 
            onClick={() => onActionClick && onActionClick(action)}
            sx={{ 
              justifyContent: 'flex-start',
              color: 'text.secondary',
              borderColor: 'divider',
              bgcolor: '#F8FAFC',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
                borderColor: 'primary.main'
              }
            }}
          >
            {action}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};
