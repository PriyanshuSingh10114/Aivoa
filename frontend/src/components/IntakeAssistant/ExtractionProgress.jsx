import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useSelector } from 'react-redux';

export const ExtractionProgress = () => {
  const { isLoading, extractionStage } = useSelector((state) => state.complaint);

  if (!isLoading && extractionStage !== 'extracting' && extractionStage !== 'uploading') {
    return null;
  }

  const stages = [
    { label: 'Parsing Document / Raw Text', active: true },
    { label: 'Extracting QMS Entities via LangGraph', active: true },
    { label: 'Evaluating GMP Completeness', active: true },
    { label: 'Calculating Risk Score & CAPA Recommendations', active: true },
  ];

  return (
    <Box sx={{ p: 2.5, mb: 2.5, bgcolor: '#EFF6FF', borderRadius: 2, border: '1px solid #BFDBFE' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Loader2 size={18} className="animate-spin" color="#2563EB" />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E40AF' }}>
          LangGraph Extraction Pipeline in Progress...
        </Typography>
      </Box>

      <LinearProgress sx={{ height: 6, borderRadius: 3, mb: 2, bgcolor: '#DBEAFE', '& .MuiLinearProgress-bar': { bgcolor: '#2563EB' } }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
        {stages.map((st, idx) => (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircle2 size={14} color="#3B82F6" />
            <Typography variant="caption" sx={{ color: '#1E3A8A', fontWeight: 500 }}>
              {st.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
