import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Sparkles } from 'lucide-react';
import PageHeader from '../components/Layout/PageHeader';
import HCPInfoCard from '../components/LogInteraction/HCPInfoCard';
import DetailsCard from '../components/LogInteraction/DetailsCard';
import DiscussionCard from '../components/LogInteraction/DiscussionCard';
import MaterialCard from '../components/LogInteraction/MaterialCard';
import OutcomeCard from '../components/LogInteraction/OutcomeCard';
import Timeline from '../components/LogInteraction/Timeline/Timeline';
import FloatingSaveBar from '../components/LogInteraction/FloatingSaveBar';
import AIChat from '../components/Copilot/AIChat';
import AISummaryCard from '../components/Copilot/AISummaryCard';
import InsightCard from '../components/Copilot/InsightCard';

const LogInteraction = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      <PageHeader />
      
      <Grid container spacing={3} sx={{ flexGrow: 1, m: 0, width: '100%' }}>
        {/* Left Column (70%) - Form & Timeline */}
        <Grid item xs={12} md={8} lg={8.5} sx={{ pl: '0 !important', pt: '0 !important', height: 'calc(100vh - 140px)', overflowY: 'auto', pr: 1 }}>
          <HCPInfoCard />
          <DetailsCard />
          <DiscussionCard />
          <MaterialCard />
          <OutcomeCard />
          <Timeline />
          {/* Spacer for floating bar */}
          <Box sx={{ height: 100 }} />
        </Grid>

        {/* Right Column (30%) - AI Copilot Engine */}
        <Grid item xs={12} md={4} lg={3.5} sx={{ pt: '0 !important', height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column' }}>
          {/* Copilot Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, px: 1 }}>
            <Sparkles size={20} color="#2563EB" />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" lineHeight={1.2}>AI Copilot</Typography>
              <Typography variant="caption" color="text.secondary">Powered by LangGraph & Groq</Typography>
            </Box>
          </Box>
          
          {/* Copilot Content Scrollable Area */}
          <Box sx={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 2, pb: 2, px: 1 }}>
            <AISummaryCard />
            <InsightCard />
            
            {/* The Chat Widget takes up the remaining space */}
            <Box sx={{ 
              flexGrow: 1, 
              minHeight: 400, 
              bgcolor: 'white', 
              borderRadius: 4, 
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              <AIChat />
            </Box>
          </Box>
        </Grid>
      </Grid>
      
      {/* Persistent floating action bar for saving form data */}
      <FloatingSaveBar />
    </Box>
  );
};

export default LogInteraction;
