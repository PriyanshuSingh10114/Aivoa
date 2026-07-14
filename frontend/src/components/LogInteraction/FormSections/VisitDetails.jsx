import React from 'react';
import { Grid, TextField, MenuItem, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateInteractionForm } from '../../../redux/slices/formSlice';

const VisitDetails = () => {
  const dispatch = useDispatch();
  const form = useSelector(state => state.form.interactionForm);

  const handleChange = (e) => dispatch(updateInteractionForm({ [e.target.name]: e.target.value }));

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>Interaction Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField 
            fullWidth label="Visit Type" name="interactionType" select 
            value={form.interactionType} onChange={handleChange} 
          >
            <MenuItem value="In-Person">In-Person</MenuItem>
            <MenuItem value="Virtual">Virtual</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
            fullWidth name="visitDate" type="date" 
            value={form.visitDate} onChange={handleChange}
            label="Visit Date"
            InputLabelProps={{ shrink: true }}
            sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'white' } }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
            fullWidth label="Duration (mins)" name="duration" type="number" 
            value={form.duration} onChange={handleChange} 
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default VisitDetails;
