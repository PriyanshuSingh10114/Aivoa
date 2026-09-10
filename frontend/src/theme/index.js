import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  spacing: 8,
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    h1: { fontSize: 28, fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', lineHeight: 1.2 },
    h2: { fontSize: 24, fontWeight: 600, color: '#0F172A', letterSpacing: '-0.01em', lineHeight: 1.3 },
    h3: { fontSize: 18, fontWeight: 600, color: '#0F172A', lineHeight: 1.4 },
    h5: { fontSize: 18, fontWeight: 700, color: '#0F172A' },
    h6: { fontSize: 16, fontWeight: 600, color: '#0F172A' },
    subtitle1: { fontSize: 14, fontWeight: 600, color: '#334155' },
    subtitle2: { fontSize: 14, fontWeight: 500, color: '#475569' },
    body1: { fontSize: 14, color: '#334155', lineHeight: 1.5 },
    body2: { fontSize: 13, color: '#475569', lineHeight: 1.5 },
    caption: { fontSize: 12, fontWeight: 600, color: '#64748B', letterSpacing: '0.02em' },
  },
  palette: {
    mode: 'light',
    primary: { main: '#2563EB', light: '#3B82F6', dark: '#1D4ED8', contrastText: '#FFFFFF' },
    secondary: { main: '#64748B', light: '#94A3B8', dark: '#475569', contrastText: '#FFFFFF' },
    success: { main: '#10B981', light: '#34D399', dark: '#059669', contrastText: '#FFFFFF' },
    warning: { main: '#F59E0B', light: '#FBBF24', dark: '#D97706', contrastText: '#FFFFFF' },
    error: { main: '#EF4444', light: '#F87171', dark: '#DC2626', contrastText: '#FFFFFF' },
    background: { default: '#F8FAFC', paper: '#FFFFFF' },
    divider: '#E2E8F0',
    text: { primary: '#0F172A', secondary: '#475569', disabled: '#94A3B8' }
  },
  shape: { 
    borderRadius: 8
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.05)',
    '0px 4px 6px -1px rgba(0, 0, 0, 0.05), 0px 2px 4px -1px rgba(0, 0, 0, 0.03)',
    '0px 10px 15px -3px rgba(0, 0, 0, 0.05), 0px 4px 6px -2px rgba(0, 0, 0, 0.025)',
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: '#FFFFFF',
          '& fieldset': {
            borderColor: '#CBD5E1',
          },
          '&:hover fieldset': {
            borderColor: '#94A3B8',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#2563EB',
          },
        },
        input: {
          fontSize: '0.875rem',
          padding: '8.5px 12px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          color: '#64748B',
          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -8px) scale(0.75)',
            backgroundColor: '#FFFFFF',
            padding: '0 4px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05), 0px 4px 20px rgba(0, 0, 0, 0.02)',
          border: '1px solid #E2E8F0',
          backgroundImage: 'none',
          overflow: 'hidden',
          borderRadius: 8,
          transition: 'all 0.2s ease-in-out',
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
