import React from 'react';
import { Typography, Box, Divider } from '@mui/material';

/**
 * Enterprise Section Header with optional divider.
 */
export const SectionHeader = ({ title, subtitle, rightContent, withDivider = true, sx = {} }) => {
  return (
    <Box sx={{ mb: 2, ...sx }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: withDivider ? 1.5 : 0 }}>
        <Box>
          <Typography variant="h3">{title}</Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {rightContent && <Box>{rightContent}</Box>}
      </Box>
      {withDivider && <Divider />}
    </Box>
  );
};
