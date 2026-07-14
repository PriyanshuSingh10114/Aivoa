import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { AlertTriangle, Lightbulb, Target } from 'lucide-react';
import { useSelector } from 'react-redux';

export const CopilotInsights = () => {
  const suggestions = useSelector(state => state.chat.aiSuggestions);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
      {/* Smart Alert */}
      <Box sx={{ display: 'flex', gap: 1, p: 1.5, bgcolor: '#FEF2F2', borderRadius: 2, border: '1px solid #FECACA' }}>
        <AlertTriangle size={16} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
        <Box>
          <Typography variant="caption" color="#B91C1C" display="block" mb={0.5}>Engagement Alert</Typography>
          <Typography variant="body2" color="#991B1B" fontSize={12} lineHeight={1.4}>
            HCP has not been visited in 18 days. Mention latest CardioX clinical trial data to re-engage.
          </Typography>
        </Box>
      </Box>

      {/* AI Summary (Dynamic from state) */}
      {suggestions && (
        <Box sx={{ display: 'flex', gap: 1, p: 1.5, bgcolor: '#F0FDF4', borderRadius: 2, border: '1px solid #BBF7D0' }}>
          <Target size={16} color="#16A34A" style={{ flexShrink: 0, marginTop: 2 }} />
          <Box>
            <Typography variant="caption" color="#15803D" display="block" mb={0.5}>Extracted Action Items</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {suggestions.action_items?.map((item, idx) => (
                <Chip key={idx} label={item} size="small" sx={{ height: 20, fontSize: 10, bgcolor: 'white', color: '#166534', border: '1px solid #86EFAC' }} />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
