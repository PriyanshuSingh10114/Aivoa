import React from 'react';
import { Box, AppBar, Toolbar, IconButton, InputBase, Badge } from '@mui/material';
import { Bell, Search, Moon } from 'lucide-react';

const TopNav = () => {
  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        backgroundColor: '#FFFFFF', 
        borderBottom: '1px solid #E5E7EB',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        height: 56, // Compact height
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '56px !important', px: 2 }}>
        
        {/* Global Search - Dense */}
        <Box
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            width: 320, 
            height: 32,
            backgroundColor: '#F3F4F6', 
            borderRadius: 1.5,
            px: 1.5,
            transition: 'all 0.2s',
            '&:focus-within': {
              backgroundColor: '#FFFFFF',
              boxShadow: '0 0 0 2px rgba(37,99,235,0.2)'
            }
          }}
        >
          <Search size={16} color="#6B7280" />
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: 13 }}
            placeholder="Search CRM..."
          />
        </Box>

        {/* Global Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <Moon size={18} />
          </IconButton>
          
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { right: 2, top: 2, fontSize: 10, minWidth: 16, height: 16 } }}>
              <Bell size={18} />
            </Badge>
          </IconButton>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
