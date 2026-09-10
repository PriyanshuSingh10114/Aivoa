import React from 'react';
import { Box, Typography, TextField, MenuItem, Grid } from '@mui/material';
import { AlertCircle } from 'lucide-react';

const COMPLAINT_TYPES = [
  'Physical Contamination',
  'Color / Discoloration',
  'Particulate Matter',
  'Packaging Defect',
  'Potency / Subpotency',
  'Labeling & Packaging Error',
  'Broken Seal / Leaking',
  'Dissolution Issue',
  'Foreign Matter',
  'Adverse Event',
  'Other Quality Defect'
];

export const DetailsSection = ({ details, onChange }) => {
  return (
    <Box sx={{ mb: 3.5, p: 2.5, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <AlertCircle size={18} color="#2563EB" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E293B', fontSize: '0.95rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
          Complaint Details
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <TextField
            select
            fullWidth
            size="small"
            label="Complaint Type / Defect Category"
            value={details.complaint_type || ''}
            onChange={(e) => onChange('complaint_type', e.target.value)}
            variant="outlined"
          >
            {COMPLAINT_TYPES.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            type="date"
            label="Complaint Date"
            InputLabelProps={{ shrink: true }}
            value={details.complaint_date || ''}
            onChange={(e) => onChange('complaint_date', e.target.value)}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            size="small"
            label="Detailed Complaint Description"
            placeholder="Detailed narrative describing the observed defect, patient/customer observations, environmental conditions, and packaging state..."
            value={details.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
