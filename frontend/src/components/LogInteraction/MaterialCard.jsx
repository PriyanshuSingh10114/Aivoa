import React from 'react';
import { Card, CardContent, Typography, FormGroup, FormControlLabel, Checkbox, Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateInteractionForm } from '../../redux/slices/interactionSlice';
import { FileStack } from 'lucide-react';

const materials = [
  'CardioX Clinical Brochure', 
  'NeuroZ Efficacy Paper', 
  'Product Samples (Box)', 
  'Patient Support Program Form'
];

const MaterialCard = () => {
  const dispatch = useDispatch();
  const form = useSelector(state => state.interaction.interactionForm);
  const selectedMaterials = form.materialsShared || [];

  const handleToggle = (material) => {
    const currentIndex = selectedMaterials.indexOf(material);
    const newChecked = [...selectedMaterials];

    if (currentIndex === -1) {
      newChecked.push(material);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    dispatch(updateInteractionForm({ materialsShared: newChecked }));
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <FileStack size={20} color="#2563EB" />
          <Typography variant="h6">Materials Shared</Typography>
        </Box>
        
        <FormGroup>
          <Grid container>
            {materials.map((material, idx) => (
              <Grid item xs={12} sm={6} key={idx}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={selectedMaterials.indexOf(material) !== -1}
                      onChange={() => handleToggle(material)}
                      color="primary"
                    />
                  }
                  label={<Typography variant="body2">{material}</Typography>}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </CardContent>
    </Card>
  );
};

export default MaterialCard;
