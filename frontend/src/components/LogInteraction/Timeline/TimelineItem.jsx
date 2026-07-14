import React from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import { Calendar, Eye, Edit2 } from 'lucide-react';

const TimelineItem = ({ date, type, sentiment, products, summary }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, position: 'relative' }}>
      {/* Timeline line */}
      <Box sx={{ position: 'absolute', left: 19, top: 40, bottom: -24, width: 2, bgcolor: '#E5E7EB' }} />
      
      {/* Icon node */}
      <Box sx={{ 
        width: 40, height: 40, borderRadius: '50%', bgcolor: '#EFF6FF', 
        border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', 
        justifyContent: 'center', zIndex: 1, flexShrink: 0
      }}>
        <Calendar size={18} color="#2563EB" />
      </Box>

      {/* Content */}
      <Box sx={{ 
        bgcolor: '#FFFFFF', p: 2, borderRadius: 3, border: '1px solid #E5E7EB', 
        flexGrow: 1, boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box>
            <Typography variant="subtitle2" fontWeight="bold">{date}</Typography>
            <Typography variant="caption" color="text.secondary">{type} Interaction</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'rgba(37,99,235,0.08)' } }}>
              <Eye size={16} />
            </IconButton>
            <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'rgba(37,99,235,0.08)' } }}>
              <Edit2 size={16} />
            </IconButton>
          </Box>
        </Box>
        
        <Typography variant="body2" color="text.primary" sx={{ mb: 1.5 }}>
          {summary}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label={sentiment} size="small" sx={{ bgcolor: sentiment === 'Positive' ? '#F0FDF4' : '#F3F4F6', color: sentiment === 'Positive' ? '#16A34A' : 'text.secondary' }} />
          {products.map(p => <Chip key={p} label={p} size="small" sx={{ bgcolor: '#F8FAFC', color: 'text.secondary', border: '1px solid #E5E7EB' }} />)}
        </Box>
      </Box>
    </Box>
  );
};

export default TimelineItem;
