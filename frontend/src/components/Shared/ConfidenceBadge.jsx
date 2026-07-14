import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

/**
 * Confidence Badge for AI Extracted Fields.
 * Now expects 'score' to be "High", "Medium", or "Low".
 */
export const ConfidenceBadge = ({ score, source = "AI" }) => {
  let color = '#10B981'; // Green
  let Icon = CheckCircle2;
  let text = 'High Confidence';

  if (score === "Low") {
    color = '#EF4444'; // Red
    Icon = AlertCircle;
    text = 'Low Confidence - Review Required';
  } else if (score === "Medium") {
    color = '#F59E0B'; // Amber
    Icon = AlertTriangle;
    text = 'Medium Confidence';
  }

  if (source === "User") {
    color = '#2563EB'; // Blue
    Icon = CheckCircle2;
    text = 'Manual Override';
  }

  return (
    <Tooltip title={`${text} (${source})`}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: `${color}15`, px: 1, py: 0.25, borderRadius: 1 }}>
        <Icon size={12} color={color} />
        <Typography variant="caption" sx={{ color: color, fontSize: 11, fontWeight: 700, m: 0, textTransform: 'uppercase' }}>
          {source === "User" ? "User" : score}
        </Typography>
      </Box>
    </Tooltip>
  );
};
