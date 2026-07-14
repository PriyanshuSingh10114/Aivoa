import React from 'react';
import { Grid, TextField, Typography, Box, Checkbox, FormControlLabel, Chip, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateInteractionForm } from '../../../redux/slices/formSlice';

const productsList = ['CardioX', 'NeuroZ', 'Gastrolin', 'Dermacare', 'PulmoAir'];
const materials = ['CardioX Brochure', 'Product Samples', 'Patient Support Form'];

const Discussion = () => {
  const dispatch = useDispatch();
  const form = useSelector(state => state.form.interactionForm);

  const handleChange = (e) => dispatch(updateInteractionForm({ [e.target.name]: e.target.value }));
  const handleAutoChange = (name, val) => dispatch(updateInteractionForm({ [name]: val }));
  
  const handleMaterialToggle = (material) => {
    const current = form.materialsShared || [];
    const newChecked = current.includes(material) ? current.filter(m => m !== material) : [...current, material];
    dispatch(updateInteractionForm({ materialsShared: newChecked }));
  };

  return (
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
  );
};

export default Discussion;
