import React from 'react';
import { Card, CardContent, Typography, Grid, TextField, Autocomplete, Chip, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateInteractionForm } from '../../redux/slices/interactionSlice';
import { MessageSquare } from 'lucide-react';

const productsList = ['CardioX', 'NeuroZ', 'Gastrolin', 'Dermacare', 'PulmoAir'];
const competitorList = ['HeartBeat Max', 'NeuroBoost', 'StomachEase'];

const DiscussionCard = () => {
  const dispatch = useDispatch();
  const form = useSelector(state => state.interaction.interactionForm);

  const handleChange = (e) => {
    dispatch(updateInteractionForm({ [e.target.name]: e.target.value }));
  };

  const handleAutocompleteChange = (name, newValue) => {
    dispatch(updateInteractionForm({ [name]: newValue }));
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <MessageSquare size={20} color="#2563EB" />
          <Typography variant="h6">Discussion</Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField 
              fullWidth label="Detailed Discussion Notes" name="discussionNotes" multiline rows={4}
              value={form.discussionNotes} onChange={handleChange} 
              placeholder="What was discussed during the visit?"
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Autocomplete
              multiple
              options={productsList}
              value={form.productsDiscussed || []}
              onChange={(e, val) => handleAutocompleteChange('productsDiscussed', val)}
              renderInput={(params) => <TextField {...params} label="Products Discussed" />}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} size="small" {...getTagProps({ index })} />
                ))
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Autocomplete
              multiple
              options={competitorList}
              value={form.competitorProducts || []}
              onChange={(e, val) => handleAutocompleteChange('competitorProducts', val)}
              renderInput={(params) => <TextField {...params} label="Competitor Products Mentioned" />}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} size="small" color="error" {...getTagProps({ index })} />
                ))
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DiscussionCard;
