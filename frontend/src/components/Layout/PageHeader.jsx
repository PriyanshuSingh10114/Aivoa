import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { Sparkles, Save, CheckCircle } from 'lucide-react';
import { useSelector } from 'react-redux';

const PageHeader = () => {
  const { currentDoctor } = useSelector(state => state.interaction);
  const isSaved = false; // Mock state for draft saving

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <Typography variant="h5" color="text.primary" fontWeight="bold">
            Log HCP Interaction
          </Typography>
          <Chip 
            icon={<Sparkles size={14} color="#2563EB" />} 
            label="AI Copilot Enabled" 
            size="small"
            sx={{ 
              bgcolor: 'rgba(37,99,235,0.1)', 
              color: '#2563EB', 
              fontWeight: 600,
              border: '1px solid rgba(37,99,235,0.2)' 
            }} 
          />
          {currentDoctor && (
            <Chip 
              label={`Selected: ${currentDoctor}`} 
              size="small"
              sx={{ bgcolor: '#F3F4F6', color: '#4B5563', fontWeight: 500 }} 
            />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary">
          Capture field interactions using structured forms or AI-powered natural language.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="outlined" 
          color="inherit" 
          startIcon={isSaved ? <CheckCircle size={16} color="#22C55E" /> : <Save size={16} />}
          sx={{ color: 'text.secondary', borderColor: 'divider' }}
        >
          {isSaved ? 'Draft Saved' : 'Save Draft'}
        </Button>
      </Box>
    </Box>
  );
};

export default PageHeader;
