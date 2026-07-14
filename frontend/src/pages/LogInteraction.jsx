import React from 'react';
import { Box, Grid } from '@mui/material';
import Header from '../components/Layout/Header';
import HCPProfile from '../components/LogInteraction/HCPProfile';
import InteractionForm from '../components/LogInteraction/InteractionForm';
import CompactTimeline from '../components/LogInteraction/CompactTimeline';
import FloatingSaveBar from '../components/LogInteraction/FloatingSaveBar';
import CopilotShell from '../components/Copilot/CopilotShell';

const LogInteraction = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', overflow: 'hidden' }}>
      
      {/* 1. Fixed Header (No Scroll) */}
      <Header />
      
      {/* 2. Main Workspace (No Scroll on container, scrolling inside columns) */}
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* Left Column (65%) - Scrollable Workspace */}
        <Box 
          sx={{ 
            width: { xs: '100%', md: '65%' }, 
            height: '100%', 
            overflowY: 'auto', 
            p: 3, 
            position: 'relative' // For floating bar bounds
          }}
        >
          <Box sx={{ maxWidth: 900, mx: 'auto' }}>
            <HCPProfile />
            <InteractionForm />
            <CompactTimeline />
          </Box>
        </Box>

        {/* Right Column (35%) - Fixed Copilot */}
        <Box 
          sx={{ 
            width: { xs: '100%', md: '35%' }, 
            height: '100%', 
            borderLeft: '1px solid #E5E7EB', 
            bgcolor: '#F8FAFC',
            display: { xs: 'none', md: 'block' } // Hide on mobile for now
          }}
        >
          <CopilotShell />
        </Box>

      </Box>

      {/* Floating Save Action (Anchored over left column) */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
         <FloatingSaveBar />
      </Box>
    </Box>
  );
};

export default LogInteraction;
