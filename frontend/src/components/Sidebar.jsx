import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { LayoutDashboard, Users, Calendar, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 260;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Dashboard', icon: <LayoutDashboard size={22} />, path: '/' },
    { text: 'HCP Log', icon: <Users size={22} />, path: '/log' },
    { text: 'Calendar', icon: <Calendar size={22} />, path: '/calendar' },
    { text: 'Settings', icon: <Settings size={22} />, path: '/settings' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#FFFFFF',
          borderRight: '1px solid #E2E8F0',
        },
      }}
    >
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ width: 32, height: 32, borderRadius: 1.5, backgroundColor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
          A
        </Box>
        <Typography variant="h6" color="primary.main" fontWeight="bold">
          Aiova CRM
        </Typography>
      </Box>
      
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <ListItem 
              button 
              key={item.text} 
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                borderRadius: 2,
                backgroundColor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'white' : 'text.secondary',
                '&:hover': {
                  backgroundColor: isActive ? 'primary.main' : 'rgba(15, 82, 186, 0.08)',
                  color: isActive ? 'white' : 'primary.main',
                }
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: isActive ? 600 : 500 }} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
