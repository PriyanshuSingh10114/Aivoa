import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, IconButton, Paper, Avatar, CircularProgress } from '@mui/material';
import { Send, Bot, User, Mic } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { sendChatMessage } from '../../redux/slices/interactionSlice';
import QuickActions from './QuickActions';

const AIChat = () => {
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

  const handleQuickAction = (prompt) => {
    dispatch(sendChatMessage(prompt));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Messages Area */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2, bgcolor: '#FFFFFF' }}>
        {chatMessages.length === 1 && (
           <QuickActions onSelect={handleQuickAction} />
        )}
        
        {chatMessages.map((msg) => (
          <Box key={msg.id} sx={{ display: 'flex', gap: 1.5, alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            {msg.sender === 'ai' && (
              <Avatar sx={{ bgcolor: 'primary.main', width: 28, height: 28 }}>
                <Bot size={16} />
              </Avatar>
            )}
            
            <Paper 
              elevation={0}
              sx={{ 
                p: 1.5, 
                borderRadius: 2,
                bgcolor: msg.sender === 'user' ? 'primary.main' : '#F8FAFC',
                color: msg.sender === 'user' ? 'white' : 'text.primary',
                border: msg.sender === 'ai' ? '1px solid #E5E7EB' : 'none',
                borderTopRightRadius: msg.sender === 'user' ? 4 : 12,
                borderTopLeftRadius: msg.sender === 'ai' ? 4 : 12,
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                {msg.text}
              </Typography>
            </Paper>
          </Box>
        ))}
        
        {isLoading && (
          <Box sx={{ display: 'flex', gap: 1.5, alignSelf: 'flex-start' }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 28, height: 28 }}>
              <Bot size={16} />
            </Avatar>
            <Paper elevation={0} sx={{ p: 1.5, borderRadius: 2, bgcolor: '#F8FAFC', border: '1px solid #E5E7EB', borderTopLeftRadius: 4, display: 'flex', alignItems: 'center', gap: 1 }}>
               <CircularProgress size={14} thickness={4} />
               <Typography variant="caption" color="text.secondary">Agent is typing...</Typography>
            </Paper>
          </Box>
        )}
        <div ref={endOfMessagesRef} />
      </Box>

      {/* Input Area */}
      <Box sx={{ p: 2, borderTop: '1px solid #E5E7EB', bgcolor: '#FFFFFF' }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: '4px 8px', 
            display: 'flex', 
            alignItems: 'flex-end', 
            bgcolor: '#F3F4F6', 
            border: '1px solid transparent',
            borderRadius: 3,
            transition: 'all 0.2s',
            '&:focus-within': {
              bgcolor: '#FFFFFF',
              border: '1px solid #2563EB',
              boxShadow: '0 0 0 2px rgba(37,99,235,0.1)'
            }
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            variant="standard"
            placeholder="Log visit, ask for insights..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            InputProps={{ disableUnderline: true, sx: { fontSize: '0.875rem', py: 1, px: 1 } }}
            disabled={isLoading}
          />
          <IconButton sx={{ mb: 0.5, color: 'text.secondary' }}>
            <Mic size={18} />
          </IconButton>
          <IconButton 
            color="primary" 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            sx={{ mb: 0.5, bgcolor: input.trim() ? 'primary.main' : 'transparent', color: input.trim() ? 'white' : 'inherit', '&:hover': { bgcolor: 'primary.dark' } }}
          >
            <Send size={16} />
          </IconButton>
        </Paper>
      </Box>
    </Box>
  );
};

export default AIChat;
