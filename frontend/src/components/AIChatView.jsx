import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, IconButton, Paper, CircularProgress, Avatar } from '@mui/material';
import { Send, Bot, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { sendChatMessage } from '../redux/slices/interactionSlice';

const AIChatView = () => {
  const dispatch = useDispatch();
  const { chatMessages, isLoading } = useSelector(state => state.interaction);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isLoading]);

  const handleSend = () => {
    if (!input.trim()) return;
    dispatch(sendChatMessage(input));
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {chatMessages.map((msg) => (
          <Box key={msg.id} sx={{ display: 'flex', gap: 1.5, alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            {msg.sender === 'ai' && (
              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                <Bot size={18} />
              </Avatar>
            )}
            
            <Paper 
              elevation={0}
              sx={{ 
                p: 2, 
                borderRadius: 3,
                bgcolor: msg.sender === 'user' ? 'primary.main' : '#F1F5F9',
                color: msg.sender === 'user' ? 'white' : 'text.primary',
                borderTopRightRadius: msg.sender === 'user' ? 4 : 12,
                borderTopLeftRadius: msg.sender === 'ai' ? 4 : 12,
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {msg.text}
              </Typography>
            </Paper>
            
            {msg.sender === 'user' && (
              <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>
                <User size={18} />
              </Avatar>
            )}
          </Box>
        ))}
        {isLoading && (
          <Box sx={{ display: 'flex', gap: 1.5, alignSelf: 'flex-start' }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
              <Bot size={18} />
            </Avatar>
            <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: '#F1F5F9', borderTopLeftRadius: 4, display: 'flex', alignItems: 'center' }}>
              <CircularProgress size={20} thickness={5} />
            </Paper>
          </Box>
        )}
        <div ref={endOfMessagesRef} />
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          p: '4px 8px', 
          display: 'flex', 
          alignItems: 'center', 
          bgcolor: 'white', 
          border: '1px solid #E2E8F0',
          borderRadius: 3 
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={4}
          variant="standard"
          placeholder="Type natural language (e.g. Met Dr. Sharma today...)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          InputProps={{ disableUnderline: true, sx: { fontSize: '0.9rem', py: 1, px: 1 } }}
          disabled={isLoading}
        />
        <IconButton color="primary" onClick={handleSend} disabled={!input.trim() || isLoading}>
          <Send size={20} />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default AIChatView;
