import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { Sparkles, Calendar, Clock, BarChart } from 'lucide-react';

const QuickActions = ({ onSelect }) => {
  const prompts = [
    { text: "Log today's visit", icon: <Clock size={14} /> },
    { text: "Generate summary", icon: <Sparkles size={14} /> },
    { text: "Schedule follow-up", icon: <Calendar size={14} /> },
    { text: "Suggest next action", icon: <BarChart size={14} /> }
  ];

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 600 }}>
        Suggested Prompts
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {prompts.map((prompt, idx) => (
          <Chip
            key={idx}
            icon={prompt.icon}
            label={prompt.text}
            onClick={() => onSelect(prompt.text)}
            sx={{
              bgcolor: 'white',
              border: '1px solid #E5E7EB',
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'rgba(37,99,235,0.05)',
                borderColor: 'primary.main',
                color: 'primary.main'
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default QuickActions;
