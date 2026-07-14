import React from 'react';
import { Box, Typography, Avatar, Grid } from '@mui/material';
import { Card } from '../../Shared/Card';
import { StatusChip } from '../../Shared/StatusChip';
import { MapPin, Briefcase, Activity } from 'lucide-react';

export const DoctorProfileCard = () => {
  return (
    <Card sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
        <Avatar 
          src="https://i.pravatar.cc/150?img=11" 
          sx={{ width: 80, height: 80, border: '2px solid #E2E8F0' }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box>
              <Typography variant="h2">Dr. Rajesh Kumar</Typography>
              <Typography variant="subtitle2" color="text.secondary">Chief Cardiologist</Typography>
            </Box>
            <StatusChip status="high-priority" label="Key Opinion Leader" />
          </Box>
          
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MapPin size={16} color="#64748B" />
                <Typography variant="body2">Apollo Hospital, New Delhi</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Briefcase size={16} color="#64748B" />
                <Typography variant="body2">Cardiology Dept.</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Activity size={16} color="#10B981" />
                <Typography variant="body2" sx={{ color: '#10B981', fontWeight: 500 }}>High Engagement (92)</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Card>
  );
};
