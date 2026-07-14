import React, { Suspense, lazy } from 'react';
import { Card, CardContent, Divider, Skeleton, Box } from '@mui/material';

const VisitDetails = lazy(() => import('./FormSections/VisitDetails'));
const Discussion = lazy(() => import('./FormSections/Discussion'));
const Outcome = lazy(() => import('./FormSections/Outcome'));

const FormSkeleton = () => (
  <Box sx={{ p: 2 }}>
    <Skeleton variant="text" width="40%" height={32} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
    <Skeleton variant="rectangular" width="100%" height={56} />
  </Box>
);

const InteractionForm = () => {
  return (
    <Card sx={{ mb: 2, bgcolor: '#FFFFFF' }}>
      <CardContent sx={{ p: 0 }}>
        <Suspense fallback={<FormSkeleton />}>
          <VisitDetails />
        </Suspense>
        <Divider />
        <Suspense fallback={<FormSkeleton />}>
          <Discussion />
        </Suspense>
        <Divider />
        <Suspense fallback={<FormSkeleton />}>
          <Outcome />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default InteractionForm;
