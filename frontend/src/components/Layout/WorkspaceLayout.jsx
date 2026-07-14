import React from 'react';
import { Box } from '@mui/material';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

export const WorkspaceLayout = ({ leftPanel, rightPanel }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', bgcolor: '#F8FAFC' }}>
      <Sidebar />
      
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
        <TopNavbar />
        
        {/* Main Split Workspace */}
        <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
          
          {/* Left Column (65%) */}
          <Box 
            sx={{ 
              width: '65%', 
              height: '100%', 
              overflowY: 'auto',
              p: 4
            }}
          >
            <Box sx={{ maxWidth: 900, mx: 'auto' }}>
              {leftPanel}
            </Box>
          </Box>

          {/* Right Column (35%) */}
          <Box 
            sx={{ 
              width: '35%', 
              height: '100%', 
              borderLeft: '1px solid #E2E8F0',
              bgcolor: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {rightPanel}
          </Box>
          
        </Box>
      </Box>
    </Box>
  );
};
