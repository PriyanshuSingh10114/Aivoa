import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Tabs, Tab } from '@mui/material';
import InteractionForm from '../components/InteractionForm';
import AIChatView from '../components/AIChatView';
import AISuggestionsCard from '../components/AISuggestionsCard';
import { FileText, MessageSquare } from 'lucide-react';

const LogInteraction = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" mb={1} color="primary.main">
        Log Interaction
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Record your HCP visit via structured form or let the AI assistant process it from natural language.
      </Typography>
      
      <Grid container spacing={3} sx={{ flexGrow: 1, height: '10px' }}>
        {/* Left Side - Input Views (Form or Chat) */}
        <Grid item xs={12} md={7} sx={{ height: '100%' }}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: '#F8FAFC' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="interaction input tabs" variant="fullWidth">
                <Tab 
                  icon={<FileText size={18} style={{ marginBottom: 0, marginRight: 8 }} />} 
                  iconPosition="start"
                  label="Form View" 
                  id="tab-0" 
                  sx={{ minHeight: 60, fontWeight: 600 }}
                />
                <Tab 
                  icon={<MessageSquare size={18} style={{ marginBottom: 0, marginRight: 8 }} />} 
                  iconPosition="start"
                  label="AI Chat View" 
                  id="tab-1" 
                  sx={{ minHeight: 60, fontWeight: 600 }}
                />
              </Tabs>
            </Box>
            <CardContent sx={{ flexGrow: 1, overflow: 'hidden', p: 3 }}>
              {tabValue === 0 && <InteractionForm />}
              {tabValue === 1 && <AIChatView />}
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side - AI Assistant / Suggestions & History */}
        <Grid item xs={12} md={5} sx={{ height: '100%' }}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            {/* Suggestions Card */}
            <Card sx={{ bgcolor: 'white', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
              <CardContent>
                <Typography variant="h6" mb={2} color="primary.main" fontWeight="bold">AI Insights & Tasks</Typography>
                <AISuggestionsCard />
              </CardContent>
            </Card>

            {/* Timeline Placeholder */}
            <Card sx={{ flexGrow: 1, bgcolor: '#F8FAFC', border: '1px dashed #CBD5E1', boxShadow: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="body1" color="text.secondary">
                  Interaction History Timeline will appear here once an HCP is selected.
                </Typography>
              </CardContent>
            </Card>
            
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LogInteraction;
