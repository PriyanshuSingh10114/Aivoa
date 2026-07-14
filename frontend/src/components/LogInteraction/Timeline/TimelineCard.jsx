import React from 'react';
import { Box, Typography } from '@mui/material';
import { Card } from '../../Shared/Card';
import { SectionHeader } from '../../Shared/SectionHeader';
import { StatusChip } from '../../Shared/StatusChip';
import { Calendar, FileText } from 'lucide-react';

const mockHistory = [
  {
    id: 1,
    date: 'Oct 12, 2023',
    type: 'In-Person Visit',
    summary: 'Discussed recent clinical trial data for CardioX. Doctor requested samples.',
    products: ['CardioX'],
    sentiment: 'positive'
  },
  {
    id: 2,
    date: 'Sep 28, 2023',
    type: 'Virtual Call',
    summary: 'Follow-up on patient side-effects with NeuroZ. Addressed concerns.',
    products: ['NeuroZ'],
    sentiment: 'neutral'
  }
];

export const TimelineCard = () => {
  return (
    <Card sx={{ mb: 3 }}>
      <SectionHeader title="Interaction History" subtitle="Previous engagements with Dr. Rajesh Kumar" />
      
      <Box sx={{ mt: 2 }}>
        {mockHistory.map((interaction, index) => (
          <Box 
            key={interaction.id}
            sx={{
              display: 'flex',
              gap: 3,
              position: 'relative',
              pb: index !== mockHistory.length - 1 ? 4 : 0
            }}
          >
            {/* Timeline Line */}
            {index !== mockHistory.length - 1 && (
              <Box 
                sx={{
                  position: 'absolute',
                  left: 19,
                  top: 40,
                  bottom: -8,
                  width: '2px',
                  bgcolor: '#E2E8F0'
                }}
              />
            )}
            
            {/* Icon */}
            <Box sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '50%', 
              bgcolor: '#F8FAFC', 
              border: '1px solid #E2E8F0',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0,
              zIndex: 1
            }}>
              <Calendar size={18} color="#64748B" />
            </Box>

            {/* Content */}
            <Box sx={{ flexGrow: 1, pt: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ color: 'text.primary', fontWeight: 600 }}>
                    {interaction.date}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {interaction.type}
                  </Typography>
                </Box>
                <StatusChip status={interaction.sentiment} label={interaction.sentiment} />
              </Box>

              <Box sx={{ p: 2, bgcolor: '#F8FAFC', borderRadius: 2, border: '1px solid #E2E8F0' }}>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  {interaction.summary}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <FileText size={14} color="#64748B" />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Products:</Typography>
                  {interaction.products.map(p => (
                    <Typography key={p} variant="caption" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {p}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
};
