import React from 'react';
import { Card } from '../../Shared/Card';
import { SectionHeader } from '../../Shared/SectionHeader';
import { PreviewRow } from './PreviewRow';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

export const InteractionPreviewCard = () => {
  const formData = useSelector(state => state.form);

  return (
    <Card sx={{ mb: 3 }}>
      <SectionHeader 
        title="Structured Interaction Data" 
        subtitle="This preview updates automatically based on your conversation." 
      />
      <Box>
        <PreviewRow 
          label="Doctor Name" 
          value={formData.doctor_name} 
          score={98} 
        />
        <PreviewRow 
          label="Hospital / Clinic" 
          value={formData.hospital} 
          score={95} 
        />
        <PreviewRow 
          label="Products Discussed" 
          value={formData.products_discussed} 
          type="list"
          score={92} 
        />
        <PreviewRow 
          label="Doctor Sentiment" 
          value={formData.sentiment} 
          type="sentiment"
          score={88} 
        />
        <PreviewRow 
          label="Action Items" 
          value={formData.action_items} 
          type="list"
          score={85} 
        />
        <PreviewRow 
          label="Next Follow-up" 
          value={formData.next_follow_up_date} 
          score={99} 
        />
      </Box>
    </Card>
  );
};
