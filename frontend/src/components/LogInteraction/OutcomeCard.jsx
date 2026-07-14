import React from 'react';
import { Card, CardContent, Typography, Grid, TextField, MenuItem, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateInteractionForm } from '../../redux/slices/interactionSlice';
import { Target } from 'lucide-react';

const OutcomeCard = () => {
  const dispatch = useDispatch();
  const form = useSelector(state => state.interaction.interactionForm);

  const handleChange = (e) => {
    dispatch(updateInteractionForm({ [e.target.name]: e.target.value }));
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Target size={20} color="#2563EB" />
          <Typography variant="h6">Outcome & Next Steps</Typography>
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField 
              fullWidth label="Sentiment Estimation" name="sentiment" select
              value={form.sentiment || 'Neutral'} onChange={handleChange} 
            >
              <MenuItem value="Positive">Positive</MenuItem>
              <MenuItem value="Neutral">Neutral</MenuItem>
              <MenuItem value="Negative">Negative</MenuItem>
            </TextField>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField 
              fullWidth label="Interaction Priority" name="priority" select
              value={form.priority || 'Normal'} onChange={handleChange} 
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Normal">Normal</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </TextField>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField 
              fullWidth label="Next Follow-up Date" name="nextFollowUpDate" type="date"
              value={form.nextFollowUpDate} onChange={handleChange} 
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OutcomeCard;
