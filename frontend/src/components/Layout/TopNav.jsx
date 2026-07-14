import React from 'react';
import { Box, AppBar, Toolbar, IconButton, InputBase, Paper, Badge } from '@mui/material';
import { Bell, Search, Moon } from 'lucide-react';

const TopNav = () => {
  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: '#FFFFFF', 
        borderBottom: '1px solid #E5E7EB',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'flex-end', minHeight: '64px !important', px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Global Search */}
          <Paper
            component="form"
            elevation={0}
            sx={{ 
              p: '2px 8px', 
              display: 'flex', 
              alignItems: 'center', 
              width: 350, 
              backgroundColor: '#F3F4F6', 
              border: '1px solid transparent',
              borderRadius: 2,
              transition: 'all 0.2s',
              '&:hover, &:focus-within': {
                backgroundColor: '#FFFFFF',
                border: '1px solid #2563EB',
                boxShadow: '0 0 0 2px rgba(37,99,235,0.2)'
              }
            }}
          >
            <Search size={18} color="#6B7280" style={{ margin: '0 8px' }} />
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: '0.875rem' }}
              placeholder="Search HCPs, Hospitals, or Insights..."
              inputProps={{ 'aria-label': 'global search' }}
            />
          </Paper>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'rgba(37,99,235,0.08)' } }}>
              <Moon size={20} />
            </IconButton>
            
            <IconButton sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main', bgcolor: 'rgba(37,99,235,0.08)' } }}>
              <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { right: 2, top: 2 } }}>
                <Bell size={20} />
              </Badge>
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
