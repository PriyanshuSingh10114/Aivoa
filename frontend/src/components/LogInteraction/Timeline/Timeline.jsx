import React from 'react';
import { Box, Typography } from '@mui/material';
import TimelineItem from './TimelineItem';
import { History } from 'lucide-react';

const mockHistory = [
  {
    id: 1,
    date: 'Jun 28, 2026',
    type: 'Virtual',
    sentiment: 'Positive',
    products: ['CardioX'],
    summary: 'Discussed recent clinical trial data. Doctor requested more samples for CardioX.'
  },
  {
    id: 2,
    date: 'Jun 10, 2026',
    type: 'In-Person',
    sentiment: 'Neutral',
    products: ['NeuroZ', 'Gastrolin'],
    summary: 'Routine follow-up. Doctor mentioned some side effects observed in NeuroZ patients.'
  }
];

const Timeline = () => {
  return (
    <Box sx={{ mt: 4, mb: 10 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, px: 1 }}>
        <History size={20} color="#4B5563" />
        <Typography variant="h6" color="text.secondary">Previous Interactions</Typography>
      </Box>
      <Box sx={{ px: 1 }}>
        {mockHistory.map((item, index) => (
          <TimelineItem key={item.id} {...item} isLast={index === mockHistory.length - 1} />
        ))}
      </Box>
    </Box>
  );
};

export default Timeline;
