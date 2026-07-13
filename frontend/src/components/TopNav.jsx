import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Avatar, InputBase, Paper } from '@mui/material';
import { Bell, Search } from 'lucide-react';

const TopNav = () => {
  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: '#FFFFFF', 
        borderBottom: '1px solid #E2E8F0',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* We'll use this space if needed, drawer is usually underneath but we set zIndex so it's fine */}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Paper
            component="form"
            elevation={0}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, backgroundColor: '#F1F5F9', borderRadius: 8 }}
          >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <Search size={20} color="#64748B" />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: '0.875rem' }}
              placeholder="Search doctors, hospitals..."
              inputProps={{ 'aria-label': 'search doctors' }}
            />
          </Paper>

          <IconButton>
            <Bell size={20} color="#64748B" />
          </IconButton>
          
          <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', ml: 1 }}>R</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
