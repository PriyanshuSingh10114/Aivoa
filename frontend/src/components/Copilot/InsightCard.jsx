import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Lightbulb, AlertTriangle } from 'lucide-react';

const InsightCard = () => {
  return (
    <Card sx={{ bgcolor: 'white', mb: 2, border: '1px solid #E5E7EB', borderRadius: 3, boxShadow: 'none' }}>
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <Lightbulb size={18} color="#F59E0B" />
          <Typography variant="subtitle2" color="text.primary" fontWeight="bold">
            Smart Insights
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 1.5, p: 1, bgcolor: '#FEF3C7', borderRadius: 2, border: '1px solid #FDE68A' }}>
            <AlertTriangle size={16} color="#D97706" style={{ marginTop: 2 }} />
            <Typography variant="body2" color="#92400E">
              Doctor has not been visited for 18 days. High engagement probability for CardioX.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, p: 1, bgcolor: '#F3F4F6', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Mention the latest clinical trial results published last week.
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
