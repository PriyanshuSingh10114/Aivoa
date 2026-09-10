import React from 'react';
import { Box, Typography, TextField, MenuItem, Grid } from '@mui/material';
import { ShieldCheck } from 'lucide-react';

const SEVERITIES = ['Critical', 'Major', 'Minor'];
const PRIORITIES = ['P1 - Urgent', 'P2 - High', 'P3 - Normal'];

export const AssessmentSection = ({ assessment, onChange }) => {
  return (
    <Box sx={{ mb: 3.5, p: 2.5, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <ShieldCheck size={18} color="#2563EB" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E293B', fontSize: '0.95rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
          Initial Assessment & Priority
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#475569', display: 'block', mb: 0.5 }}>
            Initial Severity
          </Typography>
          <TextField
            select
            fullWidth
            size="small"
            value={assessment.severity || 'Major'}
            onChange={(e) => onChange('severity', e.target.value)}
            variant="outlined"
          >
            {SEVERITIES.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#475569', display: 'block', mb: 0.5 }}>
            Priority
          </Typography>
          <TextField
            select
            fullWidth
            size="small"
            value={assessment.priority || 'P2 - High'}
            onChange={(e) => onChange('priority', e.target.value)}
            variant="outlined"
          >
            {PRIORITIES.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Box>
  );
};
