import React from 'react';
import { Box, Typography, TextField, MenuItem, Grid } from '@mui/material';
import { Building2 } from 'lucide-react';

const SOURCES = [
  'Hospital / Clinic',
  'Direct Customer',
  'Distributor / Wholesaler',
  'Pharmacy',
  'Regulatory Agency',
  'Clinical Trial Site'
];

export const OriginSection = ({ origin, onChange }) => {
  return (
    <Box sx={{ mb: 3.5, p: 2.5, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Building2 size={18} color="#2563EB" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E293B', fontSize: '0.95rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
          Origin & Customer Details
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            fullWidth
            size="small"
            label="Complaint Source"
            value={origin.complaint_source || ''}
            onChange={(e) => onChange('complaint_source', e.target.value)}
            variant="outlined"
          >
            {SOURCES.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Customer Name / Institution"
            placeholder="e.g. Apollo Hospital Pharmacy"
            value={origin.customer_name || ''}
            onChange={(e) => onChange('customer_name', e.target.value)}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Customer Contact / Email / Phone"
            placeholder="e.g. pharmacy@apollo.org / +91 9876543210"
            value={origin.customer_contact || ''}
            onChange={(e) => onChange('customer_contact', e.target.value)}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
