import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';
import { Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { processComplaintText } from '../../redux/slices/complaintSlice';

export const TextPasteArea = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.complaint);
  const [text, setText] = useState('');

  const handleExtract = () => {
    if (!text.trim()) return;
    dispatch(processComplaintText(text));
  };

  return (
    <Box sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0' }}>
      <TextField
        fullWidth
        multiline
        rows={4}
        size="small"
        placeholder="Paste raw customer email, complaint letter, or incident report here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: '#F8FAFC',
            fontSize: '0.875rem',
          },
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5 }}>
        <Button
          variant="contained"
          size="small"
          onClick={handleExtract}
          disabled={isLoading || !text.trim()}
          startIcon={isLoading ? <CircularProgress size={14} color="inherit" /> : <Sparkles size={14} />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 1.5,
            bgcolor: '#2563EB',
            '&:hover': { bgcolor: '#1D4ED8' }
          }}
        >
          {isLoading ? 'Analyzing...' : 'Extract & Analyze'}
        </Button>
      </Box>
    </Box>
  );
};
