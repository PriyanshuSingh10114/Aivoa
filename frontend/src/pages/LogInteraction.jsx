import React from 'react';
import { WorkspaceLayout } from '../components/Layout/WorkspaceLayout';
import { Box } from '@mui/material';
import { ChatPanel } from '../components/Copilot/ChatPanel';
import { DoctorProfileCard } from '../components/LogInteraction/Preview/DoctorProfileCard';
import { InteractionPreviewCard } from '../components/LogInteraction/Preview/InteractionPreviewCard';
import { TimelineCard } from '../components/LogInteraction/Timeline/TimelineCard';

const LogInteraction = () => {
  return (
    <WorkspaceLayout 
      leftPanel={
        <Box>
          <DoctorProfileCard />
          <InteractionPreviewCard />
          <TimelineCard />
        </Box>
      }
      rightPanel={<ChatPanel />}
    />
  );
};

export default LogInteraction;
