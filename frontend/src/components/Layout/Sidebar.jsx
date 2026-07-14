import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Avatar } from '@mui/material';
import { LayoutDashboard, Users, Calendar, BarChart2, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const primaryMenuItems = [
    { text: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
    { text: 'HCP Log', icon: <Users size={18} />, path: '/log' },
    { text: 'Calendar', icon: <Calendar size={18} />, path: '/calendar' },
    { text: 'Analytics', icon: <BarChart2 size={18} />, path: '/analytics' },
    { text: 'Settings', icon: <Settings size={18} />, path: '/settings' },
  ];

  const renderMenuItem = (item) => {
    const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
    return (
      <ListItem 
        button 
        key={item.text} 
        onClick={() => navigate(item.path)}
        sx={{
          py: 0.75,
          px: 1.5,
          mb: 0.25,
          borderRadius: 1.5,
          backgroundColor: isActive ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
          color: isActive ? 'primary.main' : 'text.secondary',
          '&:hover': {
            backgroundColor: isActive ? 'rgba(37, 99, 235, 0.12)' : 'rgba(0, 0, 0, 0.04)',
            color: isActive ? 'primary.main' : 'text.primary',
          }
        }}
      >
        <ListItemIcon sx={{ color: 'inherit', minWidth: 32 }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText 
          primary={item.text} 
          primaryTypographyProps={{ fontSize: 13, fontWeight: isActive ? 600 : 500 }} 
        />
      </ListItem>
    );
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#F8FAFC',
          borderRight: '1px solid #E5E7EB',
          display: 'flex',
          flexDirection: 'column'
        },
      }}
    >
      {/* Brand Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        <Box sx={{ 
          width: 28, height: 28, borderRadius: 1.5, 
          background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          color: 'white', fontWeight: 'bold', fontSize: 14 
        }}>
          A
        </Box>
        <Typography variant="h6" color="text.primary" fontSize={16} fontWeight="bold" letterSpacing="-0.02em">
          Aiova Health
        </Typography>
      </Box>
      
      {/* Primary Navigation */}
      <Box sx={{ flexGrow: 1, px: 1.5, overflowY: 'auto' }}>
        <List sx={{ pt: 0 }}>
          {primaryMenuItems.map(renderMenuItem)}
        </List>
      </Box>

      {/* User Footer */}
      <Box sx={{ p: 1.5, borderTop: '1px solid #E5E7EB' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1, borderRadius: 1.5, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)', cursor: 'pointer' } }}>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 12 }}>RS</Avatar>
          <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
            <Typography variant="subtitle2" fontSize={13} noWrap>Rahul Sharma</Typography>
            <Typography variant="caption" fontSize={11} color="text.secondary" noWrap>Rep (North)</Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
