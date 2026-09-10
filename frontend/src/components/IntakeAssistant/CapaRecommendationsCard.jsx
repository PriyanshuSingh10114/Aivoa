import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Lightbulb, Wrench, ShieldCheck } from 'lucide-react';
import { useSelector } from 'react-redux';

export const CapaRecommendationsCard = () => {
  const { recommendations } = useSelector((state) => state.complaint);

  if (
    !recommendations ||
    (!recommendations.potential_root_causes?.length &&
      !recommendations.corrective_actions?.length &&
      !recommendations.preventive_actions?.length)
  ) {
    return null;
  }

  return (
    <Box sx={{ mb: 2.5, p: 2.5, bgcolor: '#FFFFFF', borderRadius: 2, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Lightbulb size={20} color="#2563EB" />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E293B', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
          CAPA & Root Cause Considerations
        </Typography>
      </Box>

      {/* Potential Root Causes */}
      {recommendations.potential_root_causes && recommendations.potential_root_causes.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
            <Lightbulb size={13} color="#EAB308" /> Potential Root Causes to Investigate:
          </Typography>
          {recommendations.potential_root_causes.map((rc, i) => (
            <Typography key={i} variant="caption" sx={{ display: 'block', color: '#334155', mb: 0.3 }}>
              • {rc}
            </Typography>
          ))}
        </Box>
      )}

      {/* Corrective Actions */}
      {recommendations.corrective_actions && recommendations.corrective_actions.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
            <Wrench size={13} color="#2563EB" /> Corrective Action Recommendations:
          </Typography>
          {recommendations.corrective_actions.map((ca, i) => (
            <Typography key={i} variant="caption" sx={{ display: 'block', color: '#334155', mb: 0.3 }}>
              • {ca}
            </Typography>
          ))}
        </Box>
      )}

      {/* Preventive Actions */}
      {recommendations.preventive_actions && recommendations.preventive_actions.length > 0 && (
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 700, color: '#475569', display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
            <ShieldCheck size={13} color="#16A34A" /> Preventive Action Considerations:
          </Typography>
          {recommendations.preventive_actions.map((pa, i) => (
            <Typography key={i} variant="caption" sx={{ display: 'block', color: '#334155', mb: 0.3 }}>
              • {pa}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};
