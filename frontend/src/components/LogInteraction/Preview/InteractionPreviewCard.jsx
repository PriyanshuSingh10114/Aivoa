import React from 'react';
import { Card } from '../../Shared/Card';
import { SectionHeader } from '../../Shared/SectionHeader';
import { PreviewRow } from './PreviewRow';
import { useSelector } from 'react-redux';
import { Box, Typography, Divider } from '@mui/material';

export const InteractionPreviewCard = () => {
  const { interactionForm: form, confidence } = useSelector(state => state.form);

  // Confidence is now a string: "High", "Medium", "Low", so we can pass it directly
  const getScore = (key) => {
    return confidence[key] || "Low";
  };

  const renderSection = (title, children) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="overline" sx={{ fontWeight: 600, color: 'text.secondary', letterSpacing: 1.2, display: 'block', mb: 1 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );

  return (
    <Card sx={{ mb: 3 }}>
      <SectionHeader 
        title="CRM Extract Preview" 
        subtitle="Concise structured data ready for saving." 
      />
      <Box sx={{ mt: 2 }}>
        
        {renderSection("HCP Information", (
          <>
            <PreviewRow label="Doctor Name" value={form.hcp?.doctor_name} score={getScore('doctor_name')} />
            <PreviewRow label="Hospital / Clinic" value={form.hcp?.hospital} score={getScore('hospital')} />
            <PreviewRow label="Speciality" value={form.hcp?.speciality} score={getScore('speciality')} />
          </>
        ))}
        
        <Divider sx={{ my: 3 }} />
        
        {renderSection("Interaction Details", (
          <>
            <PreviewRow label="Interaction Type" value={form.interaction?.type} score={getScore('type')} />
            <PreviewRow label="Visit Date" value={form.interaction?.date} score={getScore('date')} />
            <PreviewRow label="Duration" value={form.interaction?.duration} score={getScore('duration')} />
          </>
        ))}

        <Divider sx={{ my: 3 }} />
        
        {renderSection("Products Discussed", (
          <>
            <PreviewRow label="Primary Product" value={form.products?.primary} score={getScore('primary')} />
            <PreviewRow label="Other Products Discussed" value={form.products?.secondary} type="list" score={getScore('secondary')} />
            <PreviewRow label="Competitor Products Mentioned" value={form.products?.competitors} type="list" score={getScore('competitors')} />
          </>
        ))}

        <Divider sx={{ my: 3 }} />
        
        {renderSection("Discussion Summary", (
          <>
            <PreviewRow label="Summary" value={form.discussion?.summary} score={getScore('summary')} />
            <PreviewRow label="Doctor Feedback" value={form.discussion?.doctor_feedback} score={getScore('doctor_feedback')} />
            <PreviewRow label="Objections" value={form.discussion?.objections} type="list" score={getScore('objections')} />
          </>
        ))}

        <Divider sx={{ my: 3 }} />

        {renderSection("Materials & Samples", (
          <>
            <PreviewRow label="Materials Shared" value={form.materials?.shared} type="list" score={getScore('shared')} />
            <PreviewRow label="Samples Distributed" value={form.materials?.samples_distributed !== null ? form.materials?.samples_distributed?.toString() : ""} score={getScore('samples_distributed')} />
            <PreviewRow label="Sample Quantity" value={form.materials?.sample_quantity} score={getScore('sample_quantity')} />
          </>
        ))}
        
        <Divider sx={{ my: 3 }} />

        {renderSection("Outcome", (
          <>
            <PreviewRow label="Overall Sentiment" value={form.outcome?.sentiment} type="sentiment" score={getScore('sentiment')} />
            <PreviewRow label="Prescription Intent" value={form.outcome?.prescription_intent} type="sentiment" score={getScore('prescription_intent')} />
          </>
        ))}

        <Divider sx={{ my: 3 }} />

        {renderSection("Follow-up", (
          <>
            <PreviewRow label="Follow-up Date" value={form.follow_up?.date} score={getScore('date')} />
            <PreviewRow label="Follow-up Notes" value={form.follow_up?.notes} score={getScore('notes')} />
          </>
        ))}

        <Divider sx={{ my: 3 }} />

        {renderSection("AI Recommendation", (
          <>
            <PreviewRow label="Next Best Action" value={form.ai_recommendation?.next_best_action} score={getScore('next_best_action')} />
            <PreviewRow label="AI Confidence" value={form.ai_recommendation?.confidence} type="sentiment" score={getScore('confidence')} />
          </>
        ))}

      </Box>
    </Card>
  );
};
