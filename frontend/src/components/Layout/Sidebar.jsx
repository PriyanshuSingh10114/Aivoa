import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider, Avatar } from '@mui/material';
import { LayoutDashboard, Users, Calendar, BarChart2, FileText, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 260;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const primaryMenuItems = [
    { text: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { text: 'HCP Copilot', icon: <Users size={20} />, path: '/log' },
    { text: 'Calendar', icon: <Calendar size={20} />, path: '/calendar' },
  ];

  const secondaryMenuItems = [
    { text: 'Analytics', icon: <BarChart2 size={20} />, path: '/analytics' },
    { text: 'Reports', icon: <FileText size={20} />, path: '/reports' },
    { text: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ];

  const renderMenuItem = (item) => {
    const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
    return (
      <ListItem 
        button 
        key={item.text} 
        onClick={() => navigate(item.path)}
        sx={{
          mb: 0.5,
          borderRadius: 2,
          backgroundColor: isActive ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
          color: isActive ? 'primary.main' : 'text.secondary',
          '&:hover': {
            backgroundColor: isActive ? 'rgba(37, 99, 235, 0.12)' : 'rgba(0, 0, 0, 0.04)',
            color: isActive ? 'primary.main' : 'text.primary',
          }
        }}
      >
        <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText 
          primary={item.text} 
          primaryTypographyProps={{ 
            fontSize: '0.875rem',
            fontWeight: isActive ? 600 : 500 
          }} 
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
          backgroundColor: '#F8FAFC', // Slightly offset from white for depth
          borderRight: '1px solid #E5E7EB',
          display: 'flex',
          flexDirection: 'column'
        },
      }}
    >
      {/* Brand Header */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ 
          width: 32, height: 32, borderRadius: 2, 
          background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          color: 'white', fontWeight: 'bold' 
        }}>
          A
        </Box>
        <Typography variant="h6" color="text.primary" fontWeight="bold">
          Aiova Health
        </Typography>
      </Box>
      
      {/* Primary Navigation */}
      <Box sx={{ flexGrow: 1, px: 2, overflowY: 'auto' }}>
        <List>
          <Typography variant="caption" sx={{ px: 2, color: 'text.disabled', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Main Menu
          </Typography>
          {primaryMenuItems.map(renderMenuItem)}
        </List>

        <Divider sx={{ my: 2 }} />

        <List>
          <Typography variant="caption" sx={{ px: 2, color: 'text.disabled', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Workspace
          </Typography>
          {secondaryMenuItems.map(renderMenuItem)}
        </List>
      </Box>

      {/* User Footer */}
      <Box sx={{ p: 2, borderTop: '1px solid #E5E7EB' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1, borderRadius: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.04)', cursor: 'pointer' } }}>
          <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: '1rem' }}>RS</Avatar>
          <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
            <Typography variant="subtitle2" noWrap>Rahul Sharma</Typography>
            <Typography variant="caption" color="text.secondary" noWrap>Field Representative</Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
