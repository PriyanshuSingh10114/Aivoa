import React from 'react';
import { Box, Typography, TextField, Grid } from '@mui/material';
import { Pill } from 'lucide-react';

export const ProductSection = ({ product, onChange }) => {
  return (
    <Box sx={{ mb: 3.5, p: 2.5, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Pill size={18} color="#2563EB" />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1E293B', fontSize: '0.95rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
          Product & Batch Identification
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#475569', display: 'block', mb: 0.5 }}>
            Product Name / API
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. Paracetamol Tablets / Amoxicillin Trihydrate"
            value={product.product_name || ''}
            onChange={(e) => onChange('product_name', e.target.value)}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#475569', display: 'block', mb: 0.5 }}>
            Strength / Grade
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. 500mg / USP Grade"
            value={product.product_strength || ''}
            onChange={(e) => onChange('product_strength', e.target.value)}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#475569', display: 'block', mb: 0.5 }}>
            Batch / Lot Number
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. PCM240817"
            value={product.batch_number || ''}
            onChange={(e) => onChange('batch_number', e.target.value)}
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#475569', display: 'block', mb: 0.5 }}>
            Manufacturing Date
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="date"
            value={product.manufacturing_date || ''}
            onChange={(e) => onChange('manufacturing_date', e.target.value)}
            variant="outlined"
            inputProps={{
              style: { padding: '8.5px 12px' }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#475569', display: 'block', mb: 0.5 }}>
            Expiry Date
          </Typography>
          <TextField
            fullWidth
            size="small"
            type="date"
            value={product.expiry_date || ''}
            onChange={(e) => onChange('expiry_date', e.target.value)}
            variant="outlined"
            inputProps={{
              style: { padding: '8.5px 12px' }
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#475569', display: 'block', mb: 0.5 }}>
            Quantity Affected
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="e.g. 10 blister packs (100 tablets), 5 vials"
            value={product.quantity_affected || ''}
            onChange={(e) => onChange('quantity_affected', e.target.value)}
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Box>
  );
};
