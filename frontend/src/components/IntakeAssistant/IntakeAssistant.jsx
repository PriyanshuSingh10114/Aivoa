import React, { useState } from 'react';
import { Box, Typography, Chip, Tabs, Tab } from '@mui/material';
import { Bot, FileUp, FileText } from 'lucide-react';
import { DocumentDropzone } from './DocumentDropzone';
import { TextPasteArea } from './TextPasteArea';
import { ExtractionProgress } from './ExtractionProgress';
import { RiskAssessmentCard } from './RiskAssessmentCard';
import { CompletenessCard } from './CompletenessCard';
import { CapaRecommendationsCard } from './CapaRecommendationsCard';
import { CopilotChat } from './CopilotChat';

export const IntakeAssistant = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', pr: 1 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, pb: 2, borderBottom: '1px solid #E2E8F0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Bot size={24} color="#2563EB" />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em' }}>
            AI Complaint Intake Assistant
          </Typography>
        </Box>

        <Chip
          label="BETA"
          size="small"
          sx={{
            fontWeight: 800,
            fontSize: '0.7rem',
            bgcolor: '#EFF6FF',
            color: '#2563EB',
            border: '1px solid #BFDBFE',
            borderRadius: 1
          }}
        />
      </Box>

      {/* Input Mode Tabs */}
      <Box sx={{ mb: 2 }}>
        <Tabs
          value={tabIndex}
          onChange={(_, val) => setTabIndex(val)}
          sx={{
            minHeight: 36,
            '& .MuiTab-root': {
              minHeight: 36,
              py: 0.5,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
            },
          }}
        >
          <Tab icon={<FileUp size={15} />} iconPosition="start" label="Upload Document" />
          <Tab icon={<FileText size={15} />} iconPosition="start" label="Paste Complaint / Email" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <Box sx={{ mb: 2.5 }}>
        {tabIndex === 0 ? <DocumentDropzone /> : <TextPasteArea />}
      </Box>

      {/* Staged Extraction Progress */}
      <ExtractionProgress />

      {/* AI Assessment & Insights Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flexGrow: 1 }}>
        <RiskAssessmentCard />
        <CompletenessCard />
        <CapaRecommendationsCard />
        <CopilotChat />
      </Box>
    </Box>
  );
};
