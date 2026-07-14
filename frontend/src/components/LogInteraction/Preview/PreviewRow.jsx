import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { ConfidenceBadge } from '../../Shared/ConfidenceBadge';
import { StatusChip } from '../../Shared/StatusChip';

export const PreviewRow = ({ label, value, type = "text", score = 95, source = "AI" }) => {
  const isEmpty = !value || (Array.isArray(value) && value.length === 0);

  const renderValue = () => {
    if (isEmpty) return <Typography variant="body2" color="text.disabled">Awaiting extraction...</Typography>;

    if (type === "list" && Array.isArray(value)) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {value.map((v, i) => <Chip key={i} label={v} size="small" variant="outlined" />)}
        </Box>
      );
    }
    
    if (type === "sentiment") {
      return <StatusChip status={value} label={value} />;
    }

    return <Typography variant="body1" sx={{ fontWeight: 500 }}>{value}</Typography>;
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      py: 2, 
      borderBottom: '1px solid #E2E8F0',
      '&:last-child': { borderBottom: 'none', pb: 0 },
      alignItems: 'flex-start'
    }}>
      <Box sx={{ width: '25%', pr: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
          {label}
        </Typography>
      </Box>
      <Box sx={{ width: '55%', pr: 2 }}>
        {renderValue()}
      </Box>
      <Box sx={{ width: '20%', display: 'flex', justifyContent: 'flex-end', opacity: isEmpty ? 0 : 1, transition: 'opacity 0.3s' }}>
        <ConfidenceBadge score={score} source={source} />
      </Box>
    </Box>
  );
};
