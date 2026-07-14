import React from 'react';
import { Box } from '@mui/material';
import { EnterpriseHeader } from './EnterpriseHeader';
import { EnterpriseFooter } from './EnterpriseFooter';

export const WorkspaceLayout = ({ leftPanel, rightPanel }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', bgcolor: '#F8FAFC' }}>
      
      <EnterpriseHeader />

      {/* Main Split Workspace */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        
        {/* Left Column - AI Chat (40%) */}
        <Box 
          sx={{ 
            width: '40%', 
            height: '100%', 
            bgcolor: '#FFFFFF',
            borderRight: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {leftPanel}
        </Box>

        {/* Right Column - Live CRM Preview (60%) */}
        <Box 
          sx={{ 
            width: '60%', 
            height: '100%', 
            overflowY: 'auto',
            p: 4,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box sx={{ maxWidth: 800, mx: 'auto', width: '100%' }}>
            {rightPanel}
          </Box>
        </Box>
        
      </Box>

      <EnterpriseFooter />
    </Box>
  );
};
