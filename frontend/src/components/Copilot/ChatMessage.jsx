import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { Bot, User } from 'lucide-react';

export const ChatMessage = ({ sender, text }) => {
  const isAi = sender === 'ai';

  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 1.5, 
      mb: 2.5,
      flexDirection: isAi ? 'row' : 'row-reverse'
    }}>
      <Avatar 
        sx={{ 
          bgcolor: isAi ? 'primary.main' : 'secondary.main', 
          width: 32, 
          height: 32 
        }}
      >
        {isAi ? <Bot size={18} /> : <User size={18} />}
      </Avatar>
      
      <Box sx={{ 
        maxWidth: '85%',
        bgcolor: isAi ? '#F8FAFC' : 'primary.main',
        color: isAi ? 'text.primary' : 'primary.contrastText',
        p: 2,
        borderRadius: 3,
        borderTopLeftRadius: isAi ? 4 : 24,
        borderTopRightRadius: isAi ? 24 : 4,
        border: isAi ? '1px solid #E2E8F0' : 'none',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)'
      }}>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
};
