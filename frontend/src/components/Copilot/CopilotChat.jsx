import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, InputBase, IconButton, Avatar, CircularProgress, Paper, Chip } from '@mui/material';
import { Send, Bot, Sparkles, AlertCircle, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { sendChatMessage } from '../../redux/slices/interactionSlice';

const QuickPrompts = ({ onSelect }) => {
  const prompts = ["Summarize notes", "Find prior visits", "Schedule follow-up"];
  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
      {prompts.map(p => (
        <Chip 
          key={p} label={p} onClick={() => onSelect(p)}
          sx={{ fontSize: 11, height: 24, bgcolor: 'transparent', border: '1px solid #E5E7EB', '&:hover': { bgcolor: '#F3F4F6' } }} 
        />
      ))}
    </Box>
  );
};

const CopilotChat = () => {
  const dispatch = useDispatch();
  const { chatMessages, isLoading } = useSelector(state => state.interaction);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;
    dispatch(sendChatMessage(text));
    setInput('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
      
      {/* Header */}
      <Box sx={{ p: 1.5, borderBottom: '1px solid #E5E7EB', bgcolor: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Sparkles size={16} color="#2563EB" />
        <Typography variant="subtitle1" fontSize={13}>AI Assistant</Typography>
      </Box>

      {/* Messages */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {chatMessages.length === 1 && <QuickPrompts onSelect={handleSend} />}
        
        {chatMessages.map(msg => (
          <Box key={msg.id} sx={{ display: 'flex', gap: 1, alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            {msg.sender === 'ai' && (
              <Avatar sx={{ width: 24, height: 24, bgcolor: '#DBEAFE', color: '#1D4ED8', flexShrink: 0 }}><Bot size={14} /></Avatar>
            )}
            <Paper elevation={0} sx={{ 
              p: 1.5, py: 1, borderRadius: 2, 
              bgcolor: msg.sender === 'user' ? '#2563EB' : 'white', 
              color: msg.sender === 'user' ? 'white' : 'text.primary',
              border: msg.sender === 'ai' ? '1px solid #E5E7EB' : 'none',
              borderTopRightRadius: msg.sender === 'user' ? 4 : 16,
              borderTopLeftRadius: msg.sender === 'ai' ? 4 : 16,
            }}>
              <Typography variant="body2" fontSize={13} sx={{ whiteSpace: 'pre-wrap' }}>{msg.text}</Typography>
            </Paper>
          </Box>
        ))}
        {isLoading && (
          <Box sx={{ display: 'flex', gap: 1, alignSelf: 'flex-start' }}>
            <Avatar sx={{ width: 24, height: 24, bgcolor: '#DBEAFE', color: '#1D4ED8' }}><Bot size={14} /></Avatar>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, py: 1, bgcolor: 'white', borderRadius: 2, border: '1px solid #E5E7EB' }}>
              <CircularProgress size={12} thickness={5} />
              <Typography variant="caption" fontSize={11}>Thinking...</Typography>
            </Box>
          </Box>
        )}
        <div ref={endRef} />
      </Box>

      {/* Input */}
      <Box sx={{ p: 1.5, bgcolor: 'white', borderTop: '1px solid #E5E7EB' }}>
        <Box sx={{ 
          display: 'flex', alignItems: 'flex-end', bgcolor: '#F3F4F6', 
          borderRadius: 2, p: '4px 8px', transition: 'all 0.2s',
          '&:focus-within': { bgcolor: 'white', boxShadow: '0 0 0 2px rgba(37,99,235,0.2)' }
        }}>
          <InputBase
            multiline maxRows={3} fullWidth placeholder="Message Copilot..."
            value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            sx={{ fontSize: 13, py: 0.5 }}
          />
          <IconButton size="small" sx={{ mb: 0.5, bgcolor: input.trim() ? 'primary.main' : 'transparent', color: input.trim() ? 'white' : 'text.disabled', '&:hover': { bgcolor: input.trim() ? 'primary.dark' : 'transparent' } }} onClick={() => handleSend()}>
            <Send size={14} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default CopilotChat;
