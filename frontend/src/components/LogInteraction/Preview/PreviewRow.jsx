import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { ConfidenceBadge } from '../../Shared/ConfidenceBadge';
import { StatusChip } from '../../Shared/StatusChip';

export const PreviewRow = ({ label, value, type = "text", score = "Low", isUpdated = false }) => {
  const isEmpty = !value || (Array.isArray(value) && value.length === 0);

  const renderValue = () => {
    if (isEmpty) return <Typography variant="body2" color="text.disabled">Not Detected</Typography>;

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
      px: 1,
      borderBottom: '1px solid #E2E8F0',
      '&:last-child': { borderBottom: 'none', pb: 0 },
      alignItems: 'flex-start',
      backgroundColor: isUpdated ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
      transition: 'background-color 0.5s ease',
      borderRadius: 1,
      position: 'relative'
    }}>
      <Box sx={{ width: '35%', pr: 2 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', mb: 0.5 }}>
          {label}
          {isUpdated && (
            <Chip label="Updated ✔" size="small" sx={{ ml: 1, height: 18, fontSize: '0.65rem', bgcolor: '#10B981', color: 'white', fontWeight: 600 }} />
          )}
        </Typography>
      </Box>
      <Box sx={{ width: '65%', pr: 2 }}>
        {renderValue()}
      </Box>
    </Box>
  );
};
