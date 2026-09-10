import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormField } from '../../redux/slices/complaintSlice';
import { OriginSection } from './OriginSection';
import { ProductSection } from './ProductSection';
import { DetailsSection } from './DetailsSection';
import { AssessmentSection } from './AssessmentSection';
import { FormActionBar } from './FormActionBar';
import { ClipboardCheck } from 'lucide-react';

export const ComplaintForm = () => {
  const dispatch = useDispatch();
  const { complaintForm, trackingNumber } = useSelector((state) => state.complaint);

  const handleFieldChange = (section, field, value) => {
    dispatch(updateFormField({ section, field, value }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top Header */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3, pb: 2, borderBottom: '1px solid #E2E8F0' }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
            <ClipboardCheck size={26} color="#2563EB" />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Log Customer Complaint
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 500 }}>
            API & FDF Quality Assurance Module • GxP Compliant
          </Typography>
        </Box>

        <Chip
          label={trackingNumber ? `Logged: ${trackingNumber}` : "Pending Triage"}
          size="small"
          sx={{
            fontWeight: 700,
            fontSize: '0.75rem',
            bgcolor: trackingNumber ? '#DCFCE7' : '#FEF3C7',
            color: trackingNumber ? '#166534' : '#92400E',
            border: '1px solid',
            borderColor: trackingNumber ? '#86EFAC' : '#FDE68A',
            borderRadius: 1
          }}
        />
      </Box>

      {/* Form Body */}
      <Box sx={{ flexGrow: 1, pr: 1 }}>
        <OriginSection
          origin={complaintForm.origin}
          onChange={(field, val) => handleFieldChange('origin', field, val)}
        />

        <ProductSection
          product={complaintForm.product}
          onChange={(field, val) => handleFieldChange('product', field, val)}
        />

        <DetailsSection
          details={complaintForm.details}
          onChange={(field, val) => handleFieldChange('details', field, val)}
        />

        <AssessmentSection
          assessment={complaintForm.assessment}
          onChange={(field, val) => handleFieldChange('assessment', field, val)}
        />

        <FormActionBar />
      </Box>
    </Box>
  );
};
