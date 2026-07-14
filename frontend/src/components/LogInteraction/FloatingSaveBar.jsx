import React from 'react';
import { Box, Button, Paper } from '@mui/material';
import { Save, Send } from 'lucide-react';
import { useSelector } from 'react-redux';
import { saveInteraction } from '../../services/api';

const FloatingSaveBar = () => {
  const form = useSelector(state => state.interaction.interactionForm);
  const { isLoading } = useSelector(state => state.interaction);

  const handleSave = async () => {
    try {
      await saveInteraction(form);
      alert('Interaction successfully saved to CRM!');
    } catch (e) {
      alert('Failed to save interaction');
    }
  };

  return (
    <Paper 
      elevation={3}
      sx={{ 
        position: 'fixed', 
        bottom: 24, 
        left: { xs: 24, md: 284 }, // Offset by sidebar width (260) + 24px padding
        right: { xs: 24, md: 'calc(30% + 48px)' }, // Stop before Copilot panel
        p: 2, 
        borderRadius: 4,
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        bgcolor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(8px)',
        border: '1px solid #E5E7EB',
        zIndex: 10
      }}
    >
      <Button variant="text" color="inherit" sx={{ color: 'text.secondary' }}>
        Discard Changes
      </Button>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="outlined" 
          color="primary"
          startIcon={<Save size={18} />}
          disabled={isLoading}
        >
          Save as Draft
        </Button>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<Send size={18} />}
          onClick={handleSave}
          disabled={isLoading}
          sx={{ boxShadow: '0 4px 6px -1px rgba(37,99,235,0.2)' }}
        >
          Submit to CRM
        </Button>
      </Box>
    </Paper>
  );
};

export default FloatingSaveBar;
