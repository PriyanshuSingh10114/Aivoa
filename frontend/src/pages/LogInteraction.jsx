import React from 'react';
import { WorkspaceLayout } from '../components/Layout/WorkspaceLayout';
import { Box } from '@mui/material';
import { ChatPanel } from '../components/Copilot/ChatPanel';
import { InteractionPreviewCard } from '../components/LogInteraction/Preview/InteractionPreviewCard';
import { StickyActionBar } from '../components/LogInteraction/StickyActionBar';

const LogInteraction = () => {
  return (
    <WorkspaceLayout 
      leftPanel={<ChatPanel />}
      rightPanel={
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '100%' }}>
          <Box sx={{ flexGrow: 1 }}>
            <InteractionPreviewCard />
          </Box>
          <StickyActionBar />
        </Box>
      }
    />
  );
};

export default LogInteraction;
