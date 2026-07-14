import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar } from '@mui/material';
import { LayoutDashboard, Users, Calendar, MessageSquare, Settings, Activity } from 'lucide-react';

export const Sidebar = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <LayoutDashboard size={20} />, active: false },
    { text: 'HCP Directory', icon: <Users size={20} />, active: false },
    { text: 'Interactions', icon: <MessageSquare size={20} />, active: true },
    { text: 'Calendar', icon: <Calendar size={20} />, active: false },
    { text: 'Analytics', icon: <Activity size={20} />, active: false },
  ];

  return (
    <Box 
      sx={{ 
        width: 260, 
        flexShrink: 0,
        height: '100vh', 
        bgcolor: '#FFFFFF', 
        borderRight: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Logo Area */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 32, height: 32, bgcolor: 'primary.main', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Activity size={20} color="white" />
        </Box>
        <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main' }}>Aiova</Typography>
      </Box>

      <Divider />

      {/* Navigation */}
      <List sx={{ px: 2, py: 3, flexGrow: 1 }}>
        <Typography variant="caption" sx={{ px: 2, mb: 1, display: 'block' }}>Main Menu</Typography>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              bgcolor: item.active ? 'primary.main' : 'transparent',
              color: item.active ? 'primary.contrastText' : 'text.secondary',
              '&:hover': {
                bgcolor: item.active ? 'primary.main' : 'rgba(37, 99, 235, 0.05)',
                color: item.active ? 'white' : 'primary.main',
              }
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{ variant: 'body2', fontWeight: item.active ? 600 : 500 }} 
            />
          </ListItem>
        ))}
      </List>

      {/* User Area */}
      <Box sx={{ p: 3, borderTop: '1px solid #E2E8F0' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: 'secondary.light' }}>JS</Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>John Smith</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', textTransform: 'none' }}>Field Rep</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
