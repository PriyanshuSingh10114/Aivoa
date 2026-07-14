import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { Sparkles, CheckCircle2, Save } from 'lucide-react';
import { StatusChip } from '../Shared/StatusChip';

import { useSelector } from 'react-redux';

export const TopNavbar = () => {
  const { interactionForm: form } = useSelector(state => state.form);

  return (
    <Box 
      sx={{ 
        height: 72, 
        bgcolor: '#FFFFFF', 
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 4
      }}
    >
      <Box>
        <Typography variant="h2">Log HCP Interaction</Typography>
        <Typography variant="body2" color="text.secondary">
          Capture healthcare interactions using conversational AI.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <StatusChip 
          label="AI Enabled" 
          status="positive"
          sx={{ mr: 1 }}
        />
        {form.doctorName && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 0.5, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0' }}>
            <CheckCircle2 size={16} color="#10B981" />
            <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'none', fontWeight: 500 }}>
              {form.doctorName} Selected
            </Typography>
          </Box>
        )}
        <Typography variant="caption" sx={{ color: 'text.secondary', mx: 2 }}>
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<Save size={18} />}
          disabled
        >
          Save Interaction
        </Button>
      </Box>
    </Box>
  );
};
