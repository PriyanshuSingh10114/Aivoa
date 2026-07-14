import React from 'react';
import { Grid, TextField, MenuItem, Typography, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateInteractionForm } from '../../../redux/slices/formSlice';

const Outcome = () => {
  const dispatch = useDispatch();
  const form = useSelector(state => state.form.interactionForm);

  const handleChange = (e) => dispatch(updateInteractionForm({ [e.target.name]: e.target.value }));

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>Outcome</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField 
            fullWidth label="Sentiment" name="sentiment" select 
            value={form.sentiment || 'Neutral'} onChange={handleChange}
          >
            <MenuItem value="Positive">Positive</MenuItem>
            <MenuItem value="Neutral">Neutral</MenuItem>
            <MenuItem value="Negative">Negative</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField 
            fullWidth name="nextFollowUpDate" type="date" 
            value={form.nextFollowUpDate} onChange={handleChange} 
            label="Next Follow-up Date"
            InputLabelProps={{ shrink: true }}
            sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'white' } }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Outcome;
