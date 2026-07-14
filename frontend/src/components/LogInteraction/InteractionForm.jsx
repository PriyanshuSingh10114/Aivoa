import React from 'react';
import { Card, CardContent, Typography, Grid, TextField, MenuItem, Box, Divider, Checkbox, FormControlLabel, Chip, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateInteractionForm } from '../../redux/slices/interactionSlice';

const productsList = ['CardioX', 'NeuroZ', 'Gastrolin', 'Dermacare', 'PulmoAir'];
const materials = ['CardioX Brochure', 'Product Samples', 'Patient Support Form'];

const InteractionForm = () => {
  const dispatch = useDispatch();
  const form = useSelector(state => state.interaction.interactionForm);

  const handleChange = (e) => dispatch(updateInteractionForm({ [e.target.name]: e.target.value }));
  const handleAutoChange = (name, val) => dispatch(updateInteractionForm({ [name]: val }));
  
  const handleMaterialToggle = (material) => {
    const current = form.materialsShared || [];
    const newChecked = current.includes(material) ? current.filter(m => m !== material) : [...current, material];
    dispatch(updateInteractionForm({ materialsShared: newChecked }));
  };

  return (
    <Card sx={{ mb: 2, bgcolor: '#FFFFFF' }}>
      <CardContent sx={{ p: 0 }}>
        
        {/* Section 1: Interaction Details */}
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>Interaction Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Visit Type" name="interactionType" select value={form.interactionType} onChange={handleChange}>
                <MenuItem value="In-Person">In-Person</MenuItem>
                <MenuItem value="Virtual">Virtual</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Visit Date" name="visitDate" type="date" value={form.visitDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Duration (mins)" name="duration" type="number" value={form.duration} onChange={handleChange} />
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* Section 2: Discussion & Products */}
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>Discussion</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField 
                fullWidth label="Discussion Notes" name="discussionNotes" multiline minRows={2} maxRows={4}
                value={form.discussionNotes} onChange={handleChange} placeholder="Summary of interaction..."
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                multiple options={productsList} value={form.productsDiscussed || []}
                onChange={(e, val) => handleAutoChange('productsDiscussed', val)}
                renderInput={(params) => <TextField {...params} label="Products Discussed" />}
                renderTags={(value, getTagProps) => value.map((option, index) => (
                  <Chip variant="outlined" label={option} size="small" {...getTagProps({ index })} />
                ))}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
               {/* Dense Materials Checklist */}
               <Box sx={{ border: '1px solid #E5E7EB', borderRadius: 1.5, p: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {materials.map(mat => (
                    <FormControlLabel 
                      key={mat}
                      control={<Checkbox size="small" checked={(form.materialsShared || []).includes(mat)} onChange={() => handleMaterialToggle(mat)} />}
                      label={<Typography variant="body2" fontSize={13}>{mat}</Typography>}
                      sx={{ m: 0, pr: 1 }}
                    />
                  ))}
               </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        {/* Section 3: Outcome */}
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>Outcome</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Sentiment" name="sentiment" select value={form.sentiment || 'Neutral'} onChange={handleChange}>
                <MenuItem value="Positive">Positive</MenuItem>
                <MenuItem value="Neutral">Neutral</MenuItem>
                <MenuItem value="Negative">Negative</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Next Follow-up Date" name="nextFollowUpDate" type="date" value={form.nextFollowUpDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            </Grid>
          </Grid>
        </Box>

      </CardContent>
    </Card>
  );
};

export default InteractionForm;
