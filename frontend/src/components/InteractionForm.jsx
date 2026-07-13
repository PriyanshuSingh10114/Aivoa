import React from 'react';
import { Box, TextField, Grid, Button, MenuItem, Typography, Chip, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateInteractionForm } from '../redux/slices/interactionSlice';
import { saveInteraction } from '../services/api';
import { Save } from 'lucide-react';

const productsList = ['CardioX', 'NeuroZ', 'Gastrolin', 'Dermacare'];

const InteractionForm = () => {
  const dispatch = useDispatch();
  const form = useSelector(state => state.interaction.interactionForm);
  const { isLoading } = useSelector(state => state.interaction);

  const handleChange = (e) => {
    dispatch(updateInteractionForm({ [e.target.name]: e.target.value }));
  };

  const handleAutocompleteChange = (name, newValue) => {
    dispatch(updateInteractionForm({ [name]: newValue }));
  };

  const handleSave = async () => {
    try {
      await saveInteraction(form);
      alert('Interaction successfully saved via Graph Workflow!');
    } catch (e) {
      alert('Failed to save interaction');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth label="Doctor Name" name="doctorName" 
              value={form.doctorName} onChange={handleChange} 
              variant="outlined" size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth label="Hospital" name="hospital" 
              value={form.hospital} onChange={handleChange} 
              variant="outlined" size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth label="Interaction Type" name="interactionType" select
              value={form.interactionType} onChange={handleChange} 
              variant="outlined" size="small"
            >
              <MenuItem value="In-Person">In-Person</MenuItem>
              <MenuItem value="Virtual">Virtual</MenuItem>
              <MenuItem value="Email">Email</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth label="Visit Date" name="visitDate" type="date"
              value={form.visitDate} onChange={handleChange} 
              variant="outlined" size="small" InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={productsList}
              value={form.productsDiscussed}
              onChange={(e, val) => handleAutocompleteChange('productsDiscussed', val)}
              renderInput={(params) => <TextField {...params} variant="outlined" size="small" label="Products Discussed" />}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip variant="outlined" label={option} size="small" {...getTagProps({ index })} />
                ))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth label="Discussion Notes / Action Items" name="discussionNotes" multiline rows={4}
              value={form.discussionNotes} onChange={handleChange} 
              variant="outlined" size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth label="Sentiment Estimation" name="sentiment" select
              value={form.sentiment || 'Neutral'} onChange={handleChange} 
              variant="outlined" size="small"
            >
              <MenuItem value="Positive">Positive</MenuItem>
              <MenuItem value="Neutral">Neutral</MenuItem>
              <MenuItem value="Negative">Negative</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
              fullWidth label="Next Follow-up Date" name="nextFollowUpDate" type="date"
              value={form.nextFollowUpDate} onChange={handleChange} 
              variant="outlined" size="small" InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="outlined" color="primary">Cancel</Button>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Save size={18} />}
          onClick={handleSave}
          disabled={isLoading}
        >
          Save to Graph
        </Button>
      </Box>
    </Box>
  );
};

export default InteractionForm;
