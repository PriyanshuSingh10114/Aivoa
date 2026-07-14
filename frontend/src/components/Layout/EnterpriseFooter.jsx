import React from 'react';
import { Box, Typography } from '@mui/material';

export const EnterpriseFooter = () => {
  return (
    <Box 
      component="footer"
      sx={{ 
        height: 48, 
        bgcolor: '#FFFFFF', 
        borderTop: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        px: 4,
        justifyContent: 'space-between',
        zIndex: 10,
        flexShrink: 0
      }}
    >
      <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 500 }}>
        &copy; 2026 Aiova Health CRM. All rights reserved.
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 500 }}>
          Powered by: FastAPI • LangGraph • Groq • PostgreSQL
        </Typography>
        <Typography variant="caption" sx={{ color: '#E2E8F0' }}>|</Typography>
        <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>
          v1.0
        </Typography>
      </Box>
    </Box>
  );
};
