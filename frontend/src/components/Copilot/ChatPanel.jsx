import React, { useRef, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Bot } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { sendChatMessage } from '../../redux/slices/chatSlice';
import { ChatMessage } from './ChatMessage';
import { PromptSuggestions } from './PromptSuggestions';
import { ConversationInput } from './ConversationInput';
import { TypingIndicator } from './TypingIndicator';
import { InsightCard } from './InsightCard';
import { RecommendationCard } from './RecommendationCard';

export const ChatPanel = () => {
  const dispatch = useDispatch();
  const { chatMessages, isLoading } = useSelector(state => state.chat);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

  const handleSend = (text) => {
    dispatch(sendChatMessage(text));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <Box sx={{ p: 3, borderBottom: '1px solid #E2E8F0', bgcolor: '#F8FAFC' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <Bot size={24} color="#2563EB" />
          <Typography variant="h3">AI Copilot</Typography>
        </Box>
        <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'none' }}>
          Powered by LangGraph + Groq
        </Typography>
      </Box>

      {/* Scrollable Chat Area */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3, display: 'flex', flexDirection: 'column' }}>
        {chatMessages.length === 1 && (
          <>
            <InsightCard />
            <RecommendationCard onActionClick={handleSend} />
            <PromptSuggestions onSelect={handleSend} />
          </>
        )}
        
        {chatMessages.map((msg, index) => (
          <ChatMessage key={index} sender={msg.sender} text={msg.text} />
        ))}
        
        {isLoading && <TypingIndicator />}
        
        <div ref={endRef} />
      </Box>

      {/* Input Area */}
      <ConversationInput onSend={handleSend} disabled={isLoading} />
    </Box>
  );
};
