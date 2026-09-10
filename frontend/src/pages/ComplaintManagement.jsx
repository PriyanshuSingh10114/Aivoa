import React from 'react';
import { Box, AppBar, Toolbar, Typography, Chip } from '@mui/material';
import { Activity, ShieldCheck } from 'lucide-react';
import { ComplaintForm } from '../components/ComplaintForm/ComplaintForm';
import { IntakeAssistant } from '../components/IntakeAssistant/IntakeAssistant';

export const ComplaintManagement = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', bgcolor: '#F8FAFC' }}>
      {/* Enterprise Header */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', color: '#0F172A', zIndex: 10 }}>
        <Toolbar variant="dense" sx={{ minHeight: 52, px: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 0.8, bgcolor: '#2563EB', borderRadius: 1.5 }}>
              <Activity size={18} color="#FFFFFF" />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: '#0F172A' }}>
              AIOVA<span style={{ color: '#2563EB' }}>.AI</span>
            </Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8', mx: 0.5 }}>|</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
              Quality Management System (QMS) • Complaint Intake
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Chip
              icon={<ShieldCheck size={14} color="#16A34A" />}
              label="21 CFR Part 11 & EU GMP Annex 11 Validated Mode"
              size="small"
              sx={{ bgcolor: '#F0FDF4', color: '#166534', border: '1px solid #BBF7D0', fontWeight: 600, fontSize: '0.7rem' }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Split Layout */}
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Left Column - Log Customer Complaint Form (58%) */}
        <Box
          sx={{
            width: '58%',
            height: '100%',
            overflowY: 'auto',
            p: 3.5,
            borderRight: '1px solid #E2E8F0',
            bgcolor: '#F8FAFC',
          }}
        >
          <Box sx={{ maxWidth: 840, mx: 'auto' }}>
            <ComplaintForm />
          </Box>
        </Box>

        {/* Right Column - AI Complaint Intake Assistant (42%) */}
        <Box
          sx={{
            width: '42%',
            height: '100%',
            overflowY: 'auto',
            p: 3.5,
            bgcolor: '#FFFFFF',
          }}
        >
          <Box sx={{ maxWidth: 640, mx: 'auto' }}>
            <IntakeAssistant />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ComplaintManagement;
