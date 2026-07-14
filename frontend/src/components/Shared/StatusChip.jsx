import React from 'react';
import { Chip, useTheme } from '@mui/material';

/**
 * Enterprise Status Chip with semantic coloring.
 */
export const StatusChip = ({ status, label, size = "small", sx = {} }) => {
  const theme = useTheme();
  
  const getColorScheme = (statusType) => {
    switch (statusType?.toLowerCase()) {
      case 'positive':
      case 'completed':
      case 'success':
        return {
          bgcolor: `${theme.palette.success.main}15`, // 15% opacity
          color: theme.palette.success.dark,
          border: `1px solid ${theme.palette.success.main}30`
        };
      case 'negative':
      case 'error':
      case 'high-priority':
        return {
          bgcolor: `${theme.palette.error.main}15`,
          color: theme.palette.error.dark,
          border: `1px solid ${theme.palette.error.main}30`
        };
      case 'warning':
      case 'pending':
        return {
          bgcolor: `${theme.palette.warning.main}15`,
          color: theme.palette.warning.dark,
          border: `1px solid ${theme.palette.warning.main}30`
        };
      case 'neutral':
      case 'info':
      default:
        return {
          bgcolor: `${theme.palette.primary.main}10`,
          color: theme.palette.primary.dark,
          border: `1px solid ${theme.palette.primary.main}20`
        };
    }
  };

  const scheme = getColorScheme(status);

  return (
    <Chip 
      label={label || status} 
      size={size}
      sx={{ 
        fontWeight: 600,
        backgroundColor: scheme.bgcolor,
        color: scheme.color,
        border: scheme.border,
        ...sx 
      }} 
    />
  );
};
