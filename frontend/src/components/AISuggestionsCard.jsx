import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Lightbulb, CalendarClock, Target } from 'lucide-react';
import { useSelector } from 'react-redux';

const AISuggestionsCard = () => {
  const suggestions = useSelector(state => state.interaction.aiSuggestions);

  if (!suggestions) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
        <Lightbulb size={40} color="#CBD5E1" style={{ marginBottom: 16 }} />
        <Typography variant="body2">
          Chat with the AI to generate insights and follow-up recommendations based on your interaction.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ p: 2, bgcolor: '#F0F9FF', borderRadius: 2, border: '1px solid #BAE6FD' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <CalendarClock size={18} color="#0284C7" />
          <Typography variant="subtitle2" color="#0369A1" fontWeight="bold">
            Recommended Follow-up
          </Typography>
        </Box>
        <Typography variant="body2" color="#0F172A">
          {suggestions.follow_up || 'No immediate follow-up detected.'}
        </Typography>
      </Box>

      <Box sx={{ p: 2, bgcolor: '#FDF4FF', borderRadius: 2, border: '1px solid #F5D0FE' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Target size={18} color="#C026D3" />
          <Typography variant="subtitle2" color="#86198F" fontWeight="bold">
            Key Action Items
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {suggestions.action_items && suggestions.action_items.length > 0 ? (
            suggestions.action_items.map((item, idx) => (
              <Chip key={idx} label={item} size="small" sx={{ bgcolor: 'white', border: '1px solid #F0ABFC', color: '#701A75' }} />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">None detected.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AISuggestionsCard;
