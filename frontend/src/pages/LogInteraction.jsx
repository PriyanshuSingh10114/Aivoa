import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const LogInteraction = () => {
  return (
    <Box sx={{ height: '100%' }}>
      <Typography variant="h4" mb={3} color="primary.main">
        Log Interaction
      </Typography>
      
      <Grid container spacing={3} sx={{ height: 'calc(100vh - 140px)' }}>
        {/* Left Side - Form View */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography variant="h6" mb={2}>Interaction Details</Typography>
              <Box sx={{ p: 2, border: '1px dashed #CBD5E1', borderRadius: 2, bgcolor: '#F8FAFC', color: '#64748B', textAlign: 'center' }}>
                Form / Chat Interface Placeholder
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side - AI Assistant / Suggestions */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%', bgcolor: '#F8FAFC', border: '1px solid #E2E8F0', boxShadow: 'none' }}>
            <CardContent>
              <Typography variant="h6" mb={2} color="primary.main">AI Assistant</Typography>
              <Box sx={{ p: 2, border: '1px dashed #CBD5E1', borderRadius: 2, bgcolor: 'white', color: '#64748B', textAlign: 'center' }}>
                LangGraph AI Responses Placeholder
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LogInteraction;
