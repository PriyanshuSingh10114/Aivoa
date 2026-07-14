import React from 'react';
import { Box, Chip } from '@mui/material';

const suggestions = [
  "Log today's interaction",
  "Summarize my notes",
  "Generate follow-up",
  "Find previous interaction",
  "Suggest next best action"
];

export const PromptSuggestions = ({ onSelect }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
      {suggestions.map((prompt, index) => (
        <Chip 
          key={index} 
          label={prompt} 
          onClick={() => onSelect(prompt)}
          sx={{ 
            bgcolor: 'transparent',
            border: '1px solid #E2E8F0',
            color: 'primary.main',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'primary.main',
              color: 'white',
              borderColor: 'primary.main'
            }
          }} 
        />
      ))}
    </Box>
  );
};
