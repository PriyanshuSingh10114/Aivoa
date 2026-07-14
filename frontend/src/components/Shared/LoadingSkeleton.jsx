import React from 'react';
import { Skeleton, Box, Stack } from '@mui/material';

/**
 * Enterprise Loading Skeletons for different UI components.
 */
export const CardSkeleton = () => (
  <Box sx={{ p: 3, border: '1px solid #E2E8F0', borderRadius: 4, bgcolor: '#FFFFFF' }}>
    <Skeleton variant="circular" width={48} height={48} sx={{ mb: 2 }} />
    <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
    <Skeleton variant="text" width="40%" height={20} />
  </Box>
);

export const ListSkeleton = ({ rows = 3 }) => (
  <Stack spacing={2}>
    {Array.from({ length: rows }).map((_, i) => (
      <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ flex: 1 }}>
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="60%" height={16} />
        </Box>
      </Box>
    ))}
  </Stack>
);

export const PreviewRowSkeleton = () => (
  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', py: 1.5, borderBottom: '1px solid #E2E8F0' }}>
    <Box sx={{ width: '30%' }}>
      <Skeleton variant="text" width="70%" height={20} />
    </Box>
    <Box sx={{ width: '50%' }}>
      <Skeleton variant="text" width="100%" height={24} />
      <Skeleton variant="text" width="80%" height={24} />
    </Box>
    <Box sx={{ width: '20%', display: 'flex', justifyContent: 'flex-end' }}>
      <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
    </Box>
  </Box>
);
