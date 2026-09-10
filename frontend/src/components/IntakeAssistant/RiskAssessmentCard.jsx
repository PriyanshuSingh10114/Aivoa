import React from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';
import { ShieldAlert, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useSelector } from 'react-redux';

export const RiskAssessmentCard = () => {
  const { riskAssessment, classification } = useSelector((state) => state.complaint);

  if (!riskAssessment || (!riskAssessment.risk_score && !riskAssessment.reasoning?.length)) {
    return null;
  }

  const getLevelColor = (level) => {
    switch (level?.toUpperCase()) {
      case 'CRITICAL':
        return { bg: '#FEE2E2', text: '#991B1B', border: '#F87171' };
      case 'HIGH':
        return { bg: '#FFEDD5', text: '#9A3412', border: '#FDBA74' };
      case 'MEDIUM':
        return { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' };
      default:
        return { bg: '#DCFCE7', text: '#166534', border: '#86EFAC' };
    }
  };

  const colors = getLevelColor(riskAssessment.risk_level);

  return (
    <Box sx={{ mb: 2.5, p: 2.5, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ShieldAlert size={20} color="#DC2626" />
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            AI-Assisted Risk Assessment
          </Typography>
        </Box>

        <Chip
          label={`${riskAssessment.risk_level || 'Medium'} Risk (${riskAssessment.risk_score || 50}/100)`}
          size="small"
          sx={{
            fontWeight: 800,
            fontSize: '0.75rem',
            bgcolor: colors.bg,
            color: colors.text,
            border: `1px solid ${colors.border}`,
            borderRadius: 1
          }}
        />
      </Box>

      {/* Impact Indicators */}
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
        <Box sx={{ p: 1, px: 1.5, bgcolor: '#F8FAFC', borderRadius: 1.5, border: '1px solid #E2E8F0', flex: '1 1 45%' }}>
          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontWeight: 600 }}>
            Patient Safety Impact
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
            {riskAssessment.patient_impact || 'Potential'}
          </Typography>
        </Box>

        <Box sx={{ p: 1, px: 1.5, bgcolor: '#F8FAFC', borderRadius: 1.5, border: '1px solid #E2E8F0', flex: '1 1 45%' }}>
          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', fontWeight: 600 }}>
            Quality / GMP Impact
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
            {riskAssessment.quality_impact || 'High'}
          </Typography>
        </Box>
      </Box>

      {/* QA Actions Flagged */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        {riskAssessment.investigation_required && (
          <Chip
            size="small"
            icon={<AlertTriangle size={12} color="#D97706" />}
            label="Formal QA Investigation Recommended"
            sx={{ bgcolor: '#FFFBEB', color: '#B45309', fontWeight: 600, fontSize: '0.7rem' }}
          />
        )}
        {riskAssessment.recall_evaluation_required && (
          <Chip
            size="small"
            icon={<AlertTriangle size={12} color="#DC2626" />}
            label="Health Hazard / Recall Evaluation Review"
            sx={{ bgcolor: '#FEF2F2', color: '#B91C1C', fontWeight: 600, fontSize: '0.7rem' }}
          />
        )}
      </Box>

      {/* Reasoning Points */}
      {riskAssessment.reasoning && riskAssessment.reasoning.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', display: 'block', mb: 0.5 }}>
            Assessment Reasoning:
          </Typography>
          {riskAssessment.reasoning.map((r, i) => (
            <Typography key={i} variant="caption" sx={{ display: 'block', color: '#334155', mb: 0.3 }}>
              • {r}
            </Typography>
          ))}
        </Box>
      )}

      {/* Regulatory Disclaimer */}
      <Box sx={{ p: 1.2, bgcolor: '#F1F5F9', borderRadius: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Info size={14} color="#64748B" />
        <Typography variant="caption" sx={{ color: '#64748B', fontSize: '0.7rem', lineHeight: 1.3 }}>
          AI Recommendation only. Final triage and regulatory action require Quality Unit authorization.
        </Typography>
      </Box>
    </Box>
  );
};
