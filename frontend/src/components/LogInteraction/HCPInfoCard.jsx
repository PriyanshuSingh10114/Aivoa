import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Chip, Grid } from '@mui/material';
import { MapPin, Stethoscope, Activity, Star } from 'lucide-react';
import { useSelector } from 'react-redux';

const HCPInfoCard = () => {
  const form = useSelector(state => state.interaction.interactionForm);
  const name = form.doctorName || 'Select an HCP';
  const hospital = form.hospital || 'N/A';
  
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: '24px !important' }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Avatar sx={{ width: 64, height: 64, bgcolor: '#F3F4F6', color: 'primary.main', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {name !== 'Select an HCP' ? name.charAt(0) : '?'}
              </Avatar>
              <Box>
                <Typography variant="h6" color="text.primary">{name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', mt: 0.5 }}>
                  <MapPin size={14} />
                  <Typography variant="body2">{hospital}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={7}>
            <Box sx={{ display: 'flex', gap: 4, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Speciality</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Stethoscope size={14} color="#4B5563" />
                  <Typography variant="body2" fontWeight="500">{form.speciality || 'Cardiology'}</Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Last Visit</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Activity size={14} color="#4B5563" />
                  <Typography variant="body2" fontWeight="500">18 days ago</Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" display="block">Engagement Score</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Star size={14} color="#F59E0B" />
                  <Typography variant="body2" fontWeight="500" color="#B45309">92/100 (High)</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HCPInfoCard;
