import React from 'react';
import { AppBar, Toolbar, Typography, Box, Chip, Avatar } from '@mui/material';
import { Activity, Database, Sparkles, UserRound } from 'lucide-react';

export const EnterpriseHeader = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', zIndex: 1200 }}>
      <Toolbar sx={{ justifyContent: 'space-between', height: 72 }}>
        
        {/* Left Side: Branding */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ 
            bgcolor: 'primary.main', 
            p: 1, 
            borderRadius: 2, 
            display: 'flex',
            boxShadow: '0 4px 6px -1px rgba(37,99,235,0.2)'
          }}>
            <Activity size={24} color="#FFFFFF" />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1 }}>
                Aiova Health CRM
              </Typography>
              <Chip 
                icon={<Sparkles size={12} color="#2563EB" />}
                label="AI Enabled" 
                size="small" 
                sx={{ height: 22, fontSize: '0.7rem', fontWeight: 700, bgcolor: '#EFF6FF', color: 'primary.main' }} 
              />
            </Box>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 500, letterSpacing: 0 }}>
              Healthcare Professional Interaction Logger
            </Typography>
          </Box>
        </Box>

        {/* Right Side: Status & Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Database size={16} color="#10B981" />
            <Typography variant="caption" sx={{ color: '#10B981', fontWeight: 600 }}>
              Connected
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#94A3B8' }}>|</Typography>
          <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 500 }}>
            {currentDate}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 2, pl: 2, borderLeft: '1px solid #E2E8F0' }}>
            <Avatar sx={{ bgcolor: '#F1F5F9', width: 32, height: 32 }}>
              <UserRound size={18} color="#64748B" />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" sx={{ lineHeight: 1.2, color: '#0F172A' }}>Alex Mercer</Typography>
              <Typography variant="caption" sx={{ color: '#64748B' }}>Field Representative</Typography>
            </Box>
          </Box>
        </Box>

      </Toolbar>
    </AppBar>
  );
};
