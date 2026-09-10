import React from 'react';
import { Box, Typography, LinearProgress, Chip } from '@mui/material';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { useSelector } from 'react-redux';

export const CompletenessCard = () => {
  const { completeness } = useSelector((state) => state.complaint);

  if (!completeness || completeness.completeness_score === 0) {
    return null;
  }

  const score = completeness.completeness_score || 0;
  const isComplete = completeness.is_complete || score >= 85;

  return (
    <Box sx={{ mb: 2.5, p: 2.5, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isComplete ? <CheckCircle2 size={18} color="#16A34A" /> : <AlertCircle size={18} color="#D97706" />}
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            GMP Data Completeness
          </Typography>
        </Box>

        <Typography variant="caption" sx={{ fontWeight: 800, color: isComplete ? '#166534' : '#B45309', fontSize: '0.85rem' }}>
          {score}%
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={score}
        sx={{
          height: 6,
          borderRadius: 3,
          mb: 1.5,
          bgcolor: '#F1F5F9',
          '& .MuiLinearProgress-bar': {
            bgcolor: isComplete ? '#16A34A' : '#D97706',
          },
        }}
      />

      {completeness.missing_fields && completeness.missing_fields.length > 0 ? (
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748B', display: 'block', mb: 0.8 }}>
            Missing Information for GMP Triage:
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
            {completeness.missing_fields.map((field, idx) => (
              <Chip
                key={idx}
                label={field}
                size="small"
                sx={{
                  bgcolor: '#FEF2F2',
                  color: '#991B1B',
                  border: '1px solid #FECACA',
                  fontSize: '0.7rem',
                  height: 22,
                  fontWeight: 600,
                }}
              />
            ))}
          </Box>
        </Box>
      ) : (
        <Typography variant="caption" sx={{ color: '#166534', fontWeight: 600 }}>
          ✓ All mandatory GMP complaint fields extracted.
        </Typography>
      )}
    </Box>
  );
};
