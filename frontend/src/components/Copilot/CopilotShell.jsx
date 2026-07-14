import React from 'react';
import { Box, Typography } from '@mui/material';
import CopilotChat from './CopilotChat';
import { CopilotInsights } from './CopilotInsights';

const CopilotShell = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
      {/* Copilot Header */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h2" fontSize={18} fontWeight="bold" letterSpacing="-0.01em">
          AI Copilot
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Ready to assist with this interaction
        </Typography>
      </Box>

      {/* Insights injected above the chat */}
      <CopilotInsights />

      {/* Main Chat Area */}
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <CopilotChat />
      </Box>
    </Box>
  );
};

export default CopilotShell;
