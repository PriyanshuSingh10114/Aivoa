import React from 'react';
import { Box, Button, CircularProgress, Alert, AlertTitle } from '@mui/material';
import { RotateCcw, Save, AlertTriangle } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { resetComplaintForm, saveComplaintToDb, dismissSaveBanner } from '../../redux/slices/complaintSlice';

export const FormActionBar = () => {
  const dispatch = useDispatch();
  const { isSaving, saveSuccess, trackingNumber, duplicateMatches, error } = useSelector((state) => state.complaint);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset this complaint form? All uncommitted edits will be cleared.')) {
      dispatch(resetComplaintForm());
    }
  };

  const handleSave = () => {
    dispatch(saveComplaintToDb());
  };

  return (
    <Box sx={{ mt: 3 }}>
      {/* Duplicate Alert */}
      {duplicateMatches && duplicateMatches.length > 0 && (
        <Alert severity="warning" icon={<AlertTriangle size={20} />} sx={{ mb: 2, borderRadius: 2 }}>
          <AlertTitle sx={{ fontWeight: 700 }}>Potential Duplicate Complaint Detected</AlertTitle>
          {duplicateMatches.map((m, idx) => (
            <Box key={idx} sx={{ fontSize: '0.875rem' }}>
              • {m.matched_reason} (Similarity: {m.similarity_score}%)
            </Box>
          ))}
        </Alert>
      )}

      {/* Save Success Alert */}
      {saveSuccess && (
        <Alert severity="success" onClose={() => dispatch(dismissSaveBanner())} sx={{ mb: 2, borderRadius: 2 }}>
          <AlertTitle sx={{ fontWeight: 700 }}>Complaint Committed to QMS Database</AlertTitle>
          Tracking Number: <strong>{trackingNumber}</strong>. Status: <em>Pending Triage</em>.
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 1, borderTop: '1px solid #E2E8F0' }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleReset}
          startIcon={<RotateCcw size={16} />}
          sx={{ textTransform: 'none', fontWeight: 600, px: 3, borderRadius: 1.5, borderColor: '#CBD5E1', color: '#475569' }}
        >
          Reset Form
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isSaving}
          startIcon={isSaving ? <CircularProgress size={16} color="inherit" /> : <Save size={16} />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
            py: 1,
            borderRadius: 1.5,
            bgcolor: '#2563EB',
            '&:hover': { bgcolor: '#1D4ED8' }
          }}
        >
          {isSaving ? 'Saving to QMS...' : 'Save Complaint'}
        </Button>
      </Box>
    </Box>
  );
};
