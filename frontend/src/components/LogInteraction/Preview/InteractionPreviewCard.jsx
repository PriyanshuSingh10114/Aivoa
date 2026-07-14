import React from 'react';
import { Card } from '../../Shared/Card';
import { SectionHeader } from '../../Shared/SectionHeader';
import { PreviewRow } from './PreviewRow';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

export const InteractionPreviewCard = () => {
  const { interactionForm: form } = useSelector(state => state.form);

  return (
    <Card sx={{ mb: 3 }}>
      <SectionHeader 
        title="Structured Interaction Data" 
        subtitle="This preview updates automatically based on your conversation." 
      />
      <Box>
        <PreviewRow 
          label="Doctor Name" 
          value={form.doctorName} 
          score={98} 
        />
        <PreviewRow 
          label="Hospital / Clinic" 
          value={form.hospital} 
          score={95} 
        />
        <PreviewRow 
          label="Products Discussed" 
          value={form.productsDiscussed} 
          type="list"
          score={92} 
        />
        <PreviewRow 
          label="Doctor Sentiment" 
          value={form.sentiment} 
          type="sentiment"
          score={88} 
        />
        <PreviewRow 
          label="Action Items" 
          value={form.actionItems} 
          type="list"
          score={85} 
        />
        <PreviewRow 
          label="Next Follow-up" 
          value={form.nextFollowUpDate} 
          score={99} 
        />
      </Box>
    </Card>
  );
};
