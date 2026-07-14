import React from 'react';
import { Card as MuiCard, CardContent, Box } from '@mui/material';

/**
 * Enterprise shared Card component.
 * Wraps MUI Card to enforce strict padding (24px default) and structure.
 */
export const Card = ({ children, padding = 3, sx = {}, noPadding = false, ...props }) => {
  return (
    <MuiCard sx={{ ...sx }} {...props}>
      {noPadding ? (
        children
      ) : (
        <CardContent sx={{ p: padding, '&:last-child': { pb: padding } }}>
          {children}
        </CardContent>
      )}
    </MuiCard>
  );
};
