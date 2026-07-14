import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { Sparkles, Save } from 'lucide-react';
import { useSelector } from 'react-redux';

const Header = () => {
  const { currentDoctor } = useSelector(state => state.interaction);

  return (
    <Box sx={{ 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
      px: 3, py: 2, bgcolor: '#FFFFFF', borderBottom: '1px solid #E5E7EB',
      flexShrink: 0
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h1" fontSize={20} color="text.primary">
          Log Interaction
        </Typography>
        <Chip 
          icon={<Sparkles size={12} color="#2563EB" />} 
          label="AI Copilot" 
          size="small"
          sx={{ bgcolor: 'rgba(37,99,235,0.08)', color: '#2563EB', fontWeight: 600, height: 22, fontSize: 11 }} 
        />
        {currentDoctor && (
          <Chip 
            label={currentDoctor} 
            size="small"
            sx={{ bgcolor: '#F3F4F6', color: '#4B5563', fontWeight: 500, height: 22, fontSize: 11 }} 
          />
        )}
      </Box>

      <Button 
        variant="outlined" 
        size="small"
        color="inherit" 
        startIcon={<Save size={14} />}
        sx={{ color: 'text.secondary', borderColor: 'divider', height: 28 }}
      >
        Save Draft
      </Button>
    </Box>
  );
};

export default Header;
