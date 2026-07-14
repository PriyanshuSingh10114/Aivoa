import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Divider, Chip } from '@mui/material';
import { MapPin, Target } from 'lucide-react';
import { useSelector } from 'react-redux';

const HCPProfile = () => {
  const form = useSelector(state => state.form.interactionForm);
  const name = form.doctorName || 'Dr. Rahul Sharma'; // Default for demo

  return (
    <Card sx={{ mb: 2, bgcolor: '#FFFFFF' }}>
      <CardContent sx={{ p: '16px !important', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Left Side: Avatar & Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 48, height: 48, bgcolor: '#F3F4F6', color: 'primary.main', fontWeight: 'bold' }}>
            {name.charAt(4) || 'D'}
          </Avatar>
          <Box>
            <Typography variant="subtitle1">{name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
              <MapPin size={12} />
              <Typography variant="body2">{form.hospital || 'City Hospital'}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Right Side: Quick Stats (Dense) */}
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box>
            <Typography variant="caption" display="block">Speciality</Typography>
            <Typography variant="body2" fontWeight="500">{form.speciality || 'Cardiology'}</Typography>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ my: 0.5 }} />
          <Box>
            <Typography variant="caption" display="block">Last Visit</Typography>
            <Typography variant="body2" fontWeight="500">18 days ago</Typography>
          </Box>
          <Divider orientation="vertical" flexItem sx={{ my: 0.5 }} />
          <Box>
            <Typography variant="caption" display="block">Status</Typography>
            <Chip 
              icon={<Target size={12} />} 
              label="High Priority" 
              size="small"
              sx={{ height: 20, fontSize: 11, bgcolor: '#FEF2F2', color: '#DC2626', '& .MuiChip-icon': { color: '#DC2626' } }} 
            />
          </Box>
        </Box>

      </CardContent>
    </Card>
  );
};

export default HCPProfile;
