'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Upload, X, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeUploadModal({ isOpen, onClose }: ResumeUploadModalProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['application/pdf'];

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return { valid: false, error: 'Only PDF files are supported' };
    }
    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, error: 'File size must be less than 5MB' };
    }
    return { valid: true };
  };


  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    const validation = validateFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Invalid file');
      setUploadStatus('error');
      return;
    }

    setSelectedFile(file);
    setUploadStatus('idle');
    setErrorMessage('');
    setUploadProgress(0);
  };

  const handleUpload = async () => {

  if (!selectedFile) return;

  try {

    setIsUploading(true);
    setUploadStatus('idle');



    const formData =
      new FormData();

    formData.append(
      "file",
      selectedFile
    );

    const response =
  await api.post(
    '/resume/upload',
    formData
  );

const data =
  response.data;

    setUploadStatus(
      "success"
    );

    setTimeout(() => {

      onClose();

      router.push(
        "/dashboard/resumes"
      );

    }, 1000);

  } catch (err: any) {

    setUploadStatus(
      "error"
    );



  } finally {

    setIsUploading(false);
  }
};
  const handleReset = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadStatus('idle');
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Upload Resume</h2>
                  <p className="mt-1 text-sm text-foreground/60">
                    PDF files up to 5MB
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {uploadStatus === 'success' ? (
                  // Success State
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center gap-4 py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CheckCircle2 className="h-12 w-12 text-green-500" />
                    </motion.div>
                    <div className="text-center">
                      <h3 className="font-semibold text-foreground">Upload Successful</h3>
                      <p className="mt-1 text-sm text-foreground/60">
                        Your resume is being analyzed...
                      </p>
                    </div>
                  </motion.div>
                ) : uploadStatus === 'error' ? (
                  // Error State
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center gap-4 py-8"
                  >
                    <AlertCircle className="h-12 w-12 text-red-500" />
                    <div className="text-center">
                      <h3 className="font-semibold text-foreground">Upload Failed</h3>
                      <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                    </div>
                    <Button
                      onClick={handleReset}
                      variant="ghost"
                      className="mt-2"
                    >
                      Try Again
                    </Button>
                  </motion.div>
                ) : selectedFile && (isUploading || isAnalyzing) ? (
                  // Upload/Analysis Progress State
                  <div className="space-y-6 py-4">
                    {/* File Info */}
                    <div className="flex items-center gap-3 rounded-lg bg-background p-4">
                      <FileText className="h-5 w-5 text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-foreground/60">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-foreground">
                          {isAnalyzing ? 'Analyzing Resume...' : 'Uploading...'}
                        </p>
                        <span className="text-sm font-semibold text-primary">
                          {Math.round(uploadProgress)}%
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-primary/80"
                          initial={{ width: '0%' }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    {/* Status Text */}
                    <p className="text-xs text-foreground/60 text-center">
                      {isAnalyzing
                        ? 'Analyzing your resume for ATS compatibility, skills, and career match...'
                        : 'Uploading your resume securely...'}
                    </p>
                  </div>
                ) : selectedFile ? (
                  // File Selected, Ready to Upload
                  <div className="space-y-6 py-4">
                    {/* File Preview */}
                    <div className="flex items-center gap-3 rounded-lg bg-background p-4">
                      <FileText className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-foreground/60">
                          {(selectedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>

                    {/* Info Box */}
                    <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                      <p className="text-sm text-foreground/70">
                        Your resume will be analyzed for ATS compatibility, skill extraction, and career matching.
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        onClick={handleReset}
                        variant="ghost"
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleUpload}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Upload & Analyze
                      </Button>
                    </div>
                  </div>
                ) : (
                  // Initial Drag-Drop State
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                      dragActive
                        ? 'border-primary bg-primary/5'
                        : 'border-border bg-background hover:bg-background/50'
                    }`}
                  >
                    {/* Upload Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                    </div>

                    {/* Text */}
                    <h3 className="font-semibold text-foreground">
                      {dragActive ? 'Drop your resume here' : 'Drag and drop your resume'}
                    </h3>
                    <p className="mt-2 text-sm text-foreground/60">
                      or click below to select a file
                    </p>

                    {/* Hidden Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    {/* Browse Button */}
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="ghost"
                      className="mt-4 text-primary hover:text-primary/80 hover:bg-transparent"
                    >
                      Browse Files
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
