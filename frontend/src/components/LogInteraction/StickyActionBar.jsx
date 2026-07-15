import React, { useState } from 'react';
import { Box, Button, Typography, Divider, Alert } from '@mui/material';
import { Send, CheckCircle2, Trash2, AlertCircle, PlusCircle } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { saveInteraction } from '../../services/api';
import { resetForm } from '../../redux/slices/formSlice';
import { clearChat, resetActionFlags } from '../../redux/slices/chatSlice';
import { useEffect } from 'react';

export const StickyActionBar = () => {
  const dispatch = useDispatch();
  const form = useSelector(state => state.form.interactionForm);
  const chatMessages = useSelector(state => state.chat.chatMessages);
  const { isLoading: isChatLoading, shouldSave, shouldClear } = useSelector(state => state.chat);
  
  const [isSaving, setIsSaving] = useState(false);
  const [savedId, setSavedId] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [saveError, setSaveError] = useState(null);

  useEffect(() => {
    if (shouldSave) {
      handleSave();
      dispatch(resetActionFlags());
    }
    if (shouldClear) {
      handleClear();
      dispatch(resetActionFlags());
    }
  }, [shouldSave, shouldClear, dispatch]);

  const validateForm = () => {
    const errors = [];
    if (!form.hcp?.doctor_name) errors.push("Doctor Name");
    if (!form.hcp?.hospital) errors.push("Hospital");
    if (!form.hcp?.speciality) errors.push("Speciality");
    if (!form.interaction?.type) errors.push("Interaction Type");
    if (!form.products?.primary) errors.push("Primary Product");
    if (!form.discussion?.summary) errors.push("Summary");
    if (!form.outcome?.sentiment) errors.push("Sentiment");
    
    // We'll relax follow-up date as it's not strictly required in many CRMs, 
    // but the user requested it. Let's enforce it based on instructions.
    if (!form.follow_up?.date) errors.push("Follow-up Date");
    
    return errors;
  };

  const handleSave = async () => {
    setValidationErrors([]);
    setSaveError(null);
    
    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      return; // Stop saving
    }

    setIsSaving(true);
    try {
      // Pass both the form data and the chat history, plus savedId if we are updating
      const response = await saveInteraction(form, chatMessages, savedId);
      setSavedId(response.interaction_id);
      setIsSaving(false);
    } catch (e) {
      console.error(e);
      setSaveError("Unable to save interaction. Please try again.");
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    if (savedId || window.confirm("Are you sure you want to clear the current interaction?")) {
      dispatch(clearChat());
      dispatch(resetForm());
      setSavedId(null);
      setIsSaving(false);
      setValidationErrors([]);
      setSaveError(null);
    }
  };

  return (
    <Box sx={{ mt: 'auto', pt: 3 }}>
      <Divider sx={{ mb: 2 }} />
      
      {/* Error & Validation Banner */}
      {validationErrors.length > 0 && (
        <Alert severity="error" icon={<AlertCircle size={20} />} sx={{ mb: 2, borderRadius: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>Missing Required Fields</Typography>
          <Typography variant="body2">
            Please ask the AI to extract: {validationErrors.join(', ')}
          </Typography>
        </Alert>
      )}
      
      {saveError && (
        <Alert severity="error" icon={<AlertCircle size={20} />} sx={{ mb: 2, borderRadius: 2 }}>
          {saveError}
        </Alert>
      )}

      {/* Action Bar */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        bgcolor: '#FFFFFF',
        position: 'sticky',
        bottom: 0,
        pb: 2
      }}>
        <Box>
          {savedId ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#059669', bgcolor: '#D1FAE5', px: 2, py: 1, borderRadius: 2, border: '1px solid #34D399' }}>
              <CheckCircle2 size={20} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Interaction Saved Successfully (ID: INT-2026-{savedId.split('-')[0]})
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Review extracted fields before saving to CRM.
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {savedId ? (
             <Button 
              variant="outlined" 
              color="primary"
              startIcon={<PlusCircle size={18} />}
              onClick={handleClear}
              sx={{ borderColor: 'primary.main', bgcolor: '#EFF6FF' }}
            >
              Log Another Interaction
            </Button>
          ) : (
            <>
              <Button 
                variant="outlined" 
                color="secondary"
                startIcon={<Trash2 size={18} />}
                onClick={handleClear}
                disabled={isChatLoading || isSaving}
                sx={{ 
                  borderColor: '#E2E8F0', 
                  color: 'text.secondary',
                  '&:hover': { bgcolor: '#F8FAFC', borderColor: '#CBD5E1' }
                }}
              >
                Clear Conversation
              </Button>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<Send size={18} />}
                onClick={handleSave}
                disabled={isChatLoading || isSaving}
                sx={{ boxShadow: '0 4px 6px -1px rgba(37,99,235,0.2)' }}
              >
                {isSaving ? 'Saving...' : 'Submit to CRM'}
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
