import React from 'react';
import { Card, CardContent, Typography, Grid, TextField, MenuItem, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateInteractionForm } from '../../redux/slices/interactionSlice';
import { Clock } from 'lucide-react';

const DetailsCard = () => {
  const dispatch = useDispatch();
  const form = useSelector(state => state.interaction.interactionForm);

  const handleChange = (e) => {
    dispatch(updateInteractionForm({ [e.target.name]: e.target.value }));
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Clock size={20} color="#2563EB" />
          <Typography variant="h6">Interaction Details</Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth label="Doctor Name" name="doctorName" 
              value={form.doctorName} onChange={handleChange} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth label="Hospital / Clinic" name="hospital" 
              value={form.hospital} onChange={handleChange} 
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField 
              fullWidth label="Visit Type" name="interactionType" select
              value={form.interactionType} onChange={handleChange} 
            >
              <MenuItem value="In-Person">In-Person</MenuItem>
              <MenuItem value="Virtual">Virtual</MenuItem>
              <MenuItem value="Phone">Phone</MenuItem>
              <MenuItem value="Email">Email</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField 
              fullWidth label="Visit Date" name="visitDate" type="date"
              value={form.visitDate} onChange={handleChange} 
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField 
              fullWidth label="Duration (mins)" name="duration" type="number"
              value={form.duration} onChange={handleChange} 
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
