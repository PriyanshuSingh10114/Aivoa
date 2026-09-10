import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, IconButton, CircularProgress, Chip } from '@mui/material';
import { Send, Bot, User, HelpCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { sendCopilotMessage } from '../../redux/slices/complaintSlice';

const SUGGESTIONS = [
  'What information is missing?',
  'What are the major risk factors?',
  'What CAPA actions should QA consider?'
];

export const CopilotChat = () => {
  const dispatch = useDispatch();
  const { chatMessages, isCopilotLoading } = useSelector((state) => state.complaint);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isCopilotLoading]);

  const handleSend = (textToSend = null) => {
    const message = textToSend || input;
    if (!message.trim()) return;
    dispatch(sendCopilotMessage(message));
    if (!textToSend) setInput('');
  };

  return (
    <Box sx={{ p: 2.5, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, pb: 1, borderBottom: '1px solid #F1F5F9' }}>
        <Bot size={18} color="#2563EB" />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E293B' }}>
          AI Copilot Q&A
        </Typography>
      </Box>

      {/* Suggestion Chips */}
      <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap', mb: 1.5 }}>
        {SUGGESTIONS.map((sug, i) => (
          <Chip
            key={i}
            label={sug}
            size="small"
            onClick={() => handleSend(sug)}
            sx={{
              fontSize: '0.7rem',
              cursor: 'pointer',
              bgcolor: '#F1F5F9',
              '&:hover': { bgcolor: '#E2E8F0' },
            }}
          />
        ))}
      </Box>

      {/* Messages Scroll Area */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: 240, mb: 2, pr: 0.5 }}>
        {chatMessages.map((msg, index) => {
          const isUser = msg.sender === 'user';
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                gap: 1,
                mb: 1.5,
                flexDirection: isUser ? 'row-reverse' : 'row',
              }}
            >
              <Box
                sx={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  bgcolor: isUser ? '#2563EB' : '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {isUser ? <User size={14} color="#FFFFFF" /> : <Bot size={14} color="#2563EB" />}
              </Box>

              <Box
                sx={{
                  maxWidth: '82%',
                  p: 1.2,
                  px: 1.6,
                  borderRadius: 2,
                  bgcolor: isUser ? '#2563EB' : '#F8FAFC',
                  color: isUser ? '#FFFFFF' : '#1E293B',
                  border: isUser ? 'none' : '1px solid #E2E8F0',
                  fontSize: '0.825rem',
                  lineHeight: 1.45,
                }}
              >
                {msg.text}
              </Box>
            </Box>
          );
        })}

        {isCopilotLoading && (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
            <Box sx={{ width: 26, height: 26, borderRadius: '50%', bgcolor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={14} color="#2563EB" />
            </Box>
            <CircularProgress size={16} />
          </Box>
        )}

        <div ref={chatEndRef} />
      </Box>

      {/* Input Box */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Ask me anything about this complaint..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: '#F8FAFC',
              fontSize: '0.85rem',
            },
          }}
        />
        <IconButton
          color="primary"
          onClick={() => handleSend()}
          disabled={!input.trim() || isCopilotLoading}
          sx={{ bgcolor: '#2563EB', color: '#FFFFFF', '&:hover': { bgcolor: '#1D4ED8' }, borderRadius: 2 }}
        >
          <Send size={16} />
        </IconButton>
      </Box>
    </Box>
  );
};
