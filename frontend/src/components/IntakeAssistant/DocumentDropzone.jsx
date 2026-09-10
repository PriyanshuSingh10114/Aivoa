import React, { useState, useRef } from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { processComplaintFile } from '../../redux/slices/complaintSlice';

export const DocumentDropzone = () => {
  const dispatch = useDispatch();
  const { isLoading, sourceDocument } = useSelector((state) => state.complaint);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    const ext = file.name.split('.').pop().toLowerCase();
    const validExts = ['pdf', 'docx', 'doc', 'txt', 'eml', 'msg'];
    if (!validExts.includes(ext)) {
      alert(`Unsupported format .${ext}. Please provide PDF, DOCX, TXT, or EML.`);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File exceeds 10MB limit.');
      return;
    }
    dispatch(processComplaintFile(file));
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <Box
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
      sx={{
        p: 3,
        textAlign: 'center',
        cursor: 'pointer',
        bgcolor: isDragOver ? '#EFF6FF' : '#F8FAFC',
        border: '2px dashed',
        borderColor: isDragOver ? '#2563EB' : '#CBD5E1',
        borderRadius: 2,
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: '#2563EB',
          bgcolor: '#F1F5F9',
        },
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        style={{ display: 'none' }}
        accept=".pdf,.docx,.doc,.txt,.eml,.msg"
      />

      <Box sx={{ display: 'inline-flex', p: 1.5, borderRadius: '50%', bgcolor: '#EFF6FF', mb: 1.5 }}>
        <UploadCloud size={28} color="#2563EB" />
      </Box>

      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E293B', mb: 0.5 }}>
        Drag & drop complaint document here
      </Typography>
      <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 1.5 }}>
        or click to browse from your computer
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.8, flexWrap: 'wrap' }}>
        <Chip label="PDF" size="small" sx={{ fontSize: '0.65rem', height: 20, bgcolor: '#E2E8F0', fontWeight: 600 }} />
        <Chip label="DOCX" size="small" sx={{ fontSize: '0.65rem', height: 20, bgcolor: '#E2E8F0', fontWeight: 600 }} />
        <Chip label="TXT" size="small" sx={{ fontSize: '0.65rem', height: 20, bgcolor: '#E2E8F0', fontWeight: 600 }} />
        <Chip label="EML" size="small" sx={{ fontSize: '0.65rem', height: 20, bgcolor: '#E2E8F0', fontWeight: 600 }} />
        <Chip label="Max 10MB" size="small" sx={{ fontSize: '0.65rem', height: 20, bgcolor: '#FEF3C7', color: '#92400E', fontWeight: 600 }} />
      </Box>

      {sourceDocument?.name && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mt: 2, pt: 1.5, borderTop: '1px solid #E2E8F0' }}>
          <CheckCircle2 size={16} color="#16A34A" />
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#166534' }}>
            Loaded: {sourceDocument.name}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
