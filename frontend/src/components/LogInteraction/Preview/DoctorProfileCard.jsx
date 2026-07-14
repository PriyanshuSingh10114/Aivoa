import React from 'react';
import { Box, Typography, Avatar, Grid } from '@mui/material';
import { Card } from '../../Shared/Card';
import { StatusChip } from '../../Shared/StatusChip';
import { MapPin, Briefcase, Activity } from 'lucide-react';

import { useSelector } from 'react-redux';

export const DoctorProfileCard = () => {
  const { interactionForm: form } = useSelector(state => state.form);

  const doctorName = form.doctorName || "Pending Extraction...";
  const hospital = form.hospital || "Awaiting Location...";

  return (
    <Card sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
        <Avatar 
          sx={{ width: 80, height: 80, border: '2px solid #E2E8F0', bgcolor: 'primary.light' }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Box>
              <Typography variant="h2">{doctorName}</Typography>
              <Typography variant="subtitle2" color="text.secondary">Speciality pending</Typography>
            </Box>
            {form.doctorName && <StatusChip status="info" label="Profile Linked" />}
          </Box>
          
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <MapPin size={16} color="#64748B" />
                <Typography variant="body2">{hospital}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Briefcase size={16} color="#64748B" />
                <Typography variant="body2">Department pending</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Activity size={16} color="#64748B" />
                <Typography variant="body2" sx={{ color: '#64748B' }}>Score pending</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Card>
  );
};
