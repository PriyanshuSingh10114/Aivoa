import React from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import { Calendar, Eye } from 'lucide-react';

const mockHistory = [
  { id: 1, date: 'Jun 28, 2026', type: 'Virtual', sentiment: 'Positive', products: ['CardioX'], summary: 'Discussed recent clinical trial data. Requested more samples.' },
  { id: 2, date: 'Jun 10, 2026', type: 'In-Person', sentiment: 'Neutral', products: ['NeuroZ', 'Gastrolin'], summary: 'Routine follow-up. Doctor mentioned some minor side effects.' }
];

const TimelineItem = ({ date, type, sentiment, products, summary }) => (
  <Box sx={{ display: 'flex', gap: 1.5, mb: 2, position: 'relative', height: 'auto', minHeight: 64 }}>
    <Box sx={{ position: 'absolute', left: 15, top: 32, bottom: -16, width: 2, bgcolor: '#E5E7EB' }} />
    
    <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1, flexShrink: 0 }}>
      <Calendar size={14} color="#2563EB" />
    </Box>

    <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: 2, border: '1px solid #E5E7EB', flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <Typography variant="subtitle2">{date}</Typography>
          <Typography variant="caption" color="text.secondary">| {type}</Typography>
        </Box>
        <Typography variant="body2" color="text.primary" noWrap sx={{ maxWidth: '80%' }}>
          {summary}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
        <Chip label={sentiment} size="small" sx={{ height: 20, fontSize: 11, bgcolor: sentiment === 'Positive' ? '#F0FDF4' : '#F3F4F6', color: sentiment === 'Positive' ? '#16A34A' : 'text.secondary' }} />
        <IconButton size="small" sx={{ color: 'text.secondary', p: 0.5 }}><Eye size={16} /></IconButton>
      </Box>
    </Box>
  </Box>
);

const CompactTimeline = () => {
  return (
    <Box sx={{ mt: 3, mb: 8 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
        Interaction History
      </Typography>
      <Box sx={{ px: 0.5 }}>
        {mockHistory.map((item) => <TimelineItem key={item.id} {...item} />)}
      </Box>
    </Box>
  );
};

export default CompactTimeline;
