import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { theme } from './theme';
import LogInteraction from './pages/LogInteraction';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/log" replace />} />
          <Route path="/log" element={<LogInteraction />} />
          <Route path="*" element={<Box p={3}><Typography>404 Not Found</Typography></Box>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
