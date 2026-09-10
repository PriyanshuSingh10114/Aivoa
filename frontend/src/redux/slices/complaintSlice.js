import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { analyzeComplaintText, uploadComplaintDocument, saveComplaint as apiSaveComplaint, chatWithCopilot } from '../../services/api';

const initialComplaintForm = {
  origin: {
    complaint_source: 'Hospital / Clinic',
    customer_name: '',
    customer_contact: '',
  },
  product: {
    product_name: '',
    product_strength: '',
    batch_number: '',
    manufacturing_date: '',
    expiry_date: '',
    quantity_affected: '',
  },
  details: {
    complaint_type: 'Physical Contamination',
    complaint_date: new Date().toISOString().split('T')[0],
    description: '',
  },
  assessment: {
    severity: 'Major',
    priority: 'P2 - High',
  },
};

const initialState = {
  complaintForm: initialComplaintForm,
  completeness: {
    is_complete: false,
    missing_fields: [],
    completeness_score: 0,
  },
  classification: {
    category: 'Unclassified',
    subcategory: '',
    defect_type: '',
  },
  riskAssessment: {
    risk_level: 'Medium',
    risk_score: 50,
    patient_impact: 'Potential',
    quality_impact: 'Medium',
    investigation_required: true,
    recall_evaluation_required: false,
    reasoning: [],
  },
  recommendations: {
    potential_root_causes: [],
    corrective_actions: [],
    preventive_actions: [],
  },
  summary: '',
  duplicateMatches: [],
  confidence: {},
  sourceDocument: {
    name: '',
    rawText: '',
  },
  extractionStage: 'idle', // 'idle' | 'uploading' | 'extracting' | 'analyzing' | 'complete' | 'error'
  chatMessages: [
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am your AI Complaint Intake Assistant. Drag & drop a complaint document (PDF, DOCX, TXT, EML) or paste raw text below to auto-populate and assess.',
      timestamp: new Date().toISOString(),
    },
  ],
  isLoading: false,
  isCopilotLoading: false,
  isSaving: false,
  saveSuccess: false,
  trackingNumber: null,
  error: null,
  updatedFields: [],
};

// Async Thunk: Analyze Pasted Text
export const processComplaintText = createAsyncThunk(
  'complaint/processText',
  async (text, { rejectWithValue }) => {
    try {
      const result = await analyzeComplaintText(text);
      return { ...result, sourceName: 'Pasted Complaint Text', rawText: text };
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || err.message || 'Analysis failed.');
    }
  }
);

// Async Thunk: Upload Document
export const processComplaintFile = createAsyncThunk(
  'complaint/processFile',
  async (file, { rejectWithValue }) => {
    try {
      const result = await uploadComplaintDocument(file);
      return { ...result, sourceName: file.name };
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || err.message || 'File processing failed.');
    }
  }
);

// Async Thunk: Send message to AI Copilot
export const sendCopilotMessage = createAsyncThunk(
  'complaint/sendCopilotMessage',
  async (message, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(complaintSlice.actions.addOptimisticMessage({ sender: 'user', text: message }));
      const state = getState().complaint;
      const complaintData = {
        origin: state.complaintForm.origin,
        product: state.complaintForm.product,
        details: state.complaintForm.details,
        assessment: state.complaintForm.assessment,
        risk: state.riskAssessment,
        completeness: state.completeness,
      };
      const history = state.chatMessages.map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text }));
      const res = await chatWithCopilot(message, complaintData, history);
      return res.reply;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || err.message || 'Copilot failed.');
    }
  }
);

// Async Thunk: Save Complaint to Database
export const saveComplaintToDb = createAsyncThunk(
  'complaint/saveComplaint',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().complaint;
      const payload = {
        data: state.complaintForm,
        ai_assessment: {
          risk_assessment: state.riskAssessment,
          recommendations: state.recommendations,
          classification: state.classification,
          completeness: state.completeness,
          summary: state.summary,
        },
        document_name: state.sourceDocument.name || 'Web Form Entry',
        raw_text: state.sourceDocument.rawText || state.complaintForm.details.description,
        conversation: state.chatMessages,
      };
      const response = await apiSaveComplaint(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || err.message || 'Save failed.');
    }
  }
);

const complaintSlice = createSlice({
  name: 'complaint',
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { section, field, value } = action.payload;
      if (state.complaintForm[section]) {
        state.complaintForm[section][field] = value;
      }
    },
    updateEntireForm: (state, action) => {
      state.complaintForm = { ...state.complaintForm, ...action.payload };
    },
    setExtractionStage: (state, action) => {
      state.extractionStage = action.payload;
    },
    addOptimisticMessage: (state, action) => {
      state.chatMessages.push({
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString(),
      });
    },
    resetComplaintForm: (state) => {
      state.complaintForm = initialComplaintForm;
      state.completeness = initialState.completeness;
      state.classification = initialState.classification;
      state.riskAssessment = initialState.riskAssessment;
      state.recommendations = initialState.recommendations;
      state.summary = '';
      state.duplicateMatches = [];
      state.confidence = {};
      state.sourceDocument = { name: '', rawText: '' };
      state.extractionStage = 'idle';
      state.saveSuccess = false;
      state.trackingNumber = null;
      state.error = null;
    },
    dismissSaveBanner: (state) => {
      state.saveSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Process Text
    builder
      .addCase(processComplaintText.pending, (state) => {
        state.isLoading = true;
        state.extractionStage = 'extracting';
        state.error = null;
        state.saveSuccess = false;
      })
      .addCase(processComplaintText.fulfilled, (state, action) => {
        state.isLoading = false;
        state.extractionStage = 'complete';
        const { extracted_data, completeness, classification, risk_assessment, recommendations, summary, duplicate_matches, confidence, sourceName, rawText } = action.payload;
        
        state.complaintForm = {
          origin: { ...state.complaintForm.origin, ...(extracted_data.origin || {}) },
          product: { ...state.complaintForm.product, ...(extracted_data.product || {}) },
          details: { ...state.complaintForm.details, ...(extracted_data.details || {}) },
          assessment: { ...state.complaintForm.assessment, ...(extracted_data.assessment || {}) },
        };
        state.completeness = completeness || state.completeness;
        state.classification = classification || state.classification;
        state.riskAssessment = risk_assessment || state.riskAssessment;
        state.recommendations = recommendations || state.recommendations;
        state.summary = summary || '';
        state.duplicateMatches = duplicate_matches || [];
        state.confidence = confidence || {};
        state.sourceDocument = { name: sourceName, rawText: rawText || '' };
        
        state.chatMessages.push({
          id: Date.now(),
          sender: 'ai',
          text: `Extraction complete! ${summary || 'I have extracted the batch details and assessed the quality risk.'}`,
          timestamp: new Date().toISOString(),
        });
      })
      .addCase(processComplaintText.rejected, (state, action) => {
        state.isLoading = false;
        state.extractionStage = 'error';
        state.error = action.payload || 'Failed to analyze complaint.';
        state.chatMessages.push({
          id: Date.now(),
          sender: 'ai',
          text: `Error analyzing complaint: ${action.payload || 'An error occurred.'}`,
          timestamp: new Date().toISOString(),
        });
      });

    // Process File
    builder
      .addCase(processComplaintFile.pending, (state) => {
        state.isLoading = true;
        state.extractionStage = 'uploading';
        state.error = null;
        state.saveSuccess = false;
      })
      .addCase(processComplaintFile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.extractionStage = 'complete';
        const { extracted_data, completeness, classification, risk_assessment, recommendations, summary, duplicate_matches, confidence, sourceName } = action.payload;
        
        state.complaintForm = {
          origin: { ...state.complaintForm.origin, ...(extracted_data.origin || {}) },
          product: { ...state.complaintForm.product, ...(extracted_data.product || {}) },
          details: { ...state.complaintForm.details, ...(extracted_data.details || {}) },
          assessment: { ...state.complaintForm.assessment, ...(extracted_data.assessment || {}) },
        };
        state.completeness = completeness || state.completeness;
        state.classification = classification || state.classification;
        state.riskAssessment = risk_assessment || state.riskAssessment;
        state.recommendations = recommendations || state.recommendations;
        state.summary = summary || '';
        state.duplicateMatches = duplicate_matches || [];
        state.confidence = confidence || {};
        state.sourceDocument = { name: sourceName, rawText: '' };
        
        state.chatMessages.push({
          id: Date.now(),
          sender: 'ai',
          text: `File "${sourceName}" parsed and analyzed! Batch: ${extracted_data.product?.batch_number || 'N/A'}. Risk: ${risk_assessment?.risk_level || 'Medium'}.`,
          timestamp: new Date().toISOString(),
        });
      })
      .addCase(processComplaintFile.rejected, (state, action) => {
        state.isLoading = false;
        state.extractionStage = 'error';
        state.error = action.payload || 'Failed to process document.';
        state.chatMessages.push({
          id: Date.now(),
          sender: 'ai',
          text: `Document processing error: ${action.payload || 'Failed to read document.'}`,
          timestamp: new Date().toISOString(),
        });
      });

    // Copilot Chat
    builder
      .addCase(sendCopilotMessage.pending, (state) => {
        state.isCopilotLoading = true;
      })
      .addCase(sendCopilotMessage.fulfilled, (state, action) => {
        state.isCopilotLoading = false;
        state.chatMessages.push({
          id: Date.now(),
          sender: 'ai',
          text: action.payload,
          timestamp: new Date().toISOString(),
        });
      })
      .addCase(sendCopilotMessage.rejected, (state, action) => {
        state.isCopilotLoading = false;
        state.chatMessages.push({
          id: Date.now(),
          sender: 'ai',
          text: 'I encountered an error replying to your question. Please try again.',
          timestamp: new Date().toISOString(),
        });
      });

    // Save Complaint
    builder
      .addCase(saveComplaintToDb.pending, (state) => {
        state.isSaving = true;
        state.error = null;
      })
      .addCase(saveComplaintToDb.fulfilled, (state, action) => {
        state.isSaving = false;
        state.saveSuccess = true;
        state.trackingNumber = action.payload.tracking_number;
        state.chatMessages.push({
          id: Date.now(),
          sender: 'ai',
          text: `Complaint saved to QMS database successfully! Tracking Number: ${action.payload.tracking_number}`,
          timestamp: new Date().toISOString(),
        });
      })
      .addCase(saveComplaintToDb.rejected, (state, action) => {
        state.isSaving = false;
        state.error = action.payload || 'Failed to save complaint.';
      });
  },
});

export const {
  updateFormField,
  updateEntireForm,
  setExtractionStage,
  addOptimisticMessage,
  resetComplaintForm,
  dismissSaveBanner,
} = complaintSlice.actions;

export default complaintSlice.reducer;
