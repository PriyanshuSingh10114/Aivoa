import React, { useState } from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import { Send } from 'lucide-react';

export const ConversationInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <Box sx={{ 
      p: 2, 
      borderTop: '1px solid #E2E8F0', 
      bgcolor: '#FFFFFF'
    }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        border: '1px solid #E2E8F0',
        borderRadius: 3,
        px: 2,
        py: 1,
        bgcolor: '#F8FAFC',
        transition: 'all 0.2s',
        '&:focus-within': {
          bgcolor: '#FFFFFF',
          borderColor: 'primary.main',
          boxShadow: '0 0 0 2px rgba(37,99,235,0.1)'
        }
      }}>
        <InputBase
          fullWidth
          placeholder="Ask Copilot..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={disabled}
          inputProps={{ 'aria-label': 'Ask Copilot' }}
          sx={{ fontSize: 14 }}
        />
        <IconButton 
          color="primary" 
          onClick={handleSend} 
          disabled={!input.trim() || disabled}
          aria-label="Send message"
          sx={{ 
            bgcolor: input.trim() ? 'primary.main' : 'transparent', 
            color: input.trim() ? 'white' : 'text.disabled', 
            '&:hover': { bgcolor: input.trim() ? 'primary.dark' : 'transparent' } 
          }}
        >
          <Send size={16} />
        </IconButton>
      </Box>
    </Box>
  );
};
