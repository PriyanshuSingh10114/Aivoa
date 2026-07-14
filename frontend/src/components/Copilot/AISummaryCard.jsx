import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { CalendarClock, Target, CheckCircle2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const AISummaryCard = () => {
  const suggestions = useSelector(state => state.interaction.aiSuggestions);

  if (!suggestions) return null;

  return (
    <Card sx={{ bgcolor: 'white', border: '1px solid #E5E7EB', borderRadius: 3, boxShadow: 'none' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <CheckCircle2 size={18} color="#22C55E" />
          <Typography variant="subtitle2" color="text.primary" fontWeight="bold">
            Interaction Captured
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ p: 1.5, bgcolor: '#F0FDF4', borderRadius: 2, border: '1px solid #BBF7D0' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Target size={16} color="#16A34A" />
              <Typography variant="caption" color="#16A34A" fontWeight="bold">
                Extracted Entities
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {suggestions.doctor && <Chip label={suggestions.doctor} size="small" sx={{ bgcolor: 'white', border: '1px solid #86EFAC' }} />}
              {suggestions.sentiment && <Chip label={suggestions.sentiment} size="small" sx={{ bgcolor: 'white', border: '1px solid #86EFAC' }} />}
              {suggestions.products?.map((p, i) => (
                <Chip key={i} label={p} size="small" sx={{ bgcolor: 'white', border: '1px solid #86EFAC' }} />
              ))}
            </Box>
          </Box>

          <Box sx={{ p: 1.5, bgcolor: '#EFF6FF', borderRadius: 2, border: '1px solid #BFDBFE' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <CalendarClock size={16} color="#2563EB" />
              <Typography variant="caption" color="#2563EB" fontWeight="bold">
                Recommended Follow-up
              </Typography>
            </Box>
            <Typography variant="body2" color="#1E3A8A">
              {suggestions.follow_up || 'None scheduled.'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AISummaryCard;
