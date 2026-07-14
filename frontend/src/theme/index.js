import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  spacing: 8, // Strict 8-point grid
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    h1: { fontSize: 28, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.2 },
    h2: { fontSize: 24, fontWeight: 600, color: '#0F172A', letterSpacing: '-0.01em', lineHeight: 1.3 },
    h3: { fontSize: 18, fontWeight: 600, color: '#0F172A', lineHeight: 1.4 },
    h6: { fontSize: 16, fontWeight: 600, color: '#0F172A' },
    subtitle1: { fontSize: 14, fontWeight: 600, color: '#334155' },
    subtitle2: { fontSize: 14, fontWeight: 500, color: '#475569' },
    body1: { fontSize: 14, color: '#334155', lineHeight: 1.5 },
    body2: { fontSize: 13, color: '#475569', lineHeight: 1.5 },
    caption: { fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' },
  },
  palette: {
    mode: 'light',
    primary: { main: '#2563EB', light: '#3B82F6', dark: '#1D4ED8', contrastText: '#FFFFFF' }, // Blue
    secondary: { main: '#64748B', light: '#94A3B8', dark: '#475569', contrastText: '#FFFFFF' }, // Slate
    success: { main: '#10B981', light: '#34D399', dark: '#059669', contrastText: '#FFFFFF' }, // Emerald
    warning: { main: '#F59E0B', light: '#FBBF24', dark: '#D97706', contrastText: '#FFFFFF' }, // Amber
    error: { main: '#EF4444', light: '#F87171', dark: '#DC2626', contrastText: '#FFFFFF' }, // Red
    background: { default: '#F8FAFC', paper: '#FFFFFF' }, // Slate-50 background
    divider: '#E2E8F0', // Slate-200 very light borders
    text: { primary: '#0F172A', secondary: '#475569', disabled: '#94A3B8' }
  },
  shape: { 
    borderRadius: 16 // Modern enterprise rounded corners
  },
  shadows: [
    'none', // 0
    '0px 1px 2px rgba(0, 0, 0, 0.05)', // 1 - Micro interactions
    '0px 4px 6px -1px rgba(0, 0, 0, 0.05), 0px 2px 4px -1px rgba(0, 0, 0, 0.03)', // 2 - Cards
    '0px 10px 15px -3px rgba(0, 0, 0, 0.05), 0px 4px 6px -2px rgba(0, 0, 0, 0.025)', // 3 - Modals/Dropdowns
    // Fill the rest with none to satisfy MUI's 25 shadow requirement
    ...Array(21).fill('none') 
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F8FAFC',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '::-webkit-scrollbar': { width: '6px', height: '6px' },
        '::-webkit-scrollbar-track': { background: 'transparent' },
        '::-webkit-scrollbar-thumb': { background: '#CBD5E1', borderRadius: '4px' },
        '::-webkit-scrollbar-thumb:hover': { background: '#94A3B8' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05), 0px 4px 20px rgba(0, 0, 0, 0.02)',
          border: '1px solid #E2E8F0',
          backgroundImage: 'none',
          overflow: 'hidden',
          transition: 'all 0.2s ease-in-out',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
          '&:last-child': { paddingBottom: '24px' },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          borderRadius: 8,
          padding: '8px 16px',
          '&:hover': { boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 6,
        },
      },
    },
  },
});
