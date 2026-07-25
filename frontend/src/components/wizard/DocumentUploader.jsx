import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle, File, X, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function DocumentUploader({ label = 'Student ID Proof', name, files = [], onUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (incomingFiles) => {
    const file = incomingFiles[0];
    
    // File validation: Size <= 3MB, PDF or Image
    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';
    
    if (!isImage && !isPdf) {
      toast.error('Only image uploads (PNG/JPEG) or PDFs are supported.');
      return;
    }
    
    if (file.size > 3 * 1024 * 1024) {
      toast.error('File size exceeds the 3MB limit.');
      return;
    }

    simulateUpload(file);
  };

  const simulateUpload = (file) => {
    // Generate object URL for image previews
    const previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
    
    // Initiate simulated progress
    setUploadProgress(prev => ({ ...prev, [file.name]: 10 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const curr = prev[file.name] || 0;
        if (curr >= 100) {
          clearInterval(interval);
          
          // Complete upload callback
          onUpload(name, {
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
            previewUrl,
            file,
          });
          
          toast.success(`${file.name} uploaded successfully!`);
          return prev;
        }
        return { ...prev, [file.name]: curr + 30 };
      });
    }, 200);
  };

  const handleRemove = (fileName) => {
    // Filter and trigger callback
    onUpload(name, null); // Clear file
    setUploadProgress(prev => {
      const copy = { ...prev };
      delete copy[fileName];
      return copy;
    });
    toast.success('Document removed.');
  };

  const activeFile = files && files.find(f => f.category === name);

  return (
    <div className="space-y-2 text-left w-full">
      <label className="text-xs font-semibold text-slate-400 pl-1">{label}</label>

      {/* Drag Zone */}
      {!activeFile ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-6 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer min-h-36 ${
            dragActive
              ? 'border-blue-500 bg-blue-500/5'
              : 'border-slate-800 bg-slate-900/10 hover:border-slate-700 hover:bg-slate-900/20'
          }`}
        >
          <input
            type="file"
            onChange={handleChange}
            accept=".pdf,.png,.jpg,.jpeg"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            id={`file-input-${name}`}
          />
          
          <div className="p-3 rounded-full bg-slate-950/60 border border-white/5 mb-3 flex items-center justify-center">
            <UploadCloud className="w-6 h-6 text-slate-500" />
          </div>

          <p className="text-xs text-white font-bold">Drag and drop file here</p>
          <p className="text-[10px] text-slate-500 font-semibold mt-1">PNG, JPG or PDF up to 3MB</p>
          
          {/* Progress bar overlay if active uploading */}
          {Object.keys(uploadProgress).map((fileName) => {
            const progress = uploadProgress[fileName];
            if (progress >= 100) return null;
            return (
              <div key={fileName} className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-4 rounded-2xl z-10 space-y-2">
                <span className="text-[10px] text-slate-400 font-bold">Uploading {fileName}...</span>
                <div className="w-3/4 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Document Thumbnail Card */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-2xl border border-white/[0.04] bg-slate-900/30 backdrop-blur-sm flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5 flex-1 min-w-0">
            {activeFile.previewUrl ? (
              <img
                src={activeFile.previewUrl}
                alt="Document Preview"
                className="w-10 h-10 rounded-lg object-cover border border-white/5 shadow-md shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-slate-950/60 border border-white/5 text-slate-500 flex items-center justify-center shrink-0 shadow-md">
                <File className="w-5 h-5 text-indigo-400" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate leading-none">{activeFile.name}</p>
              <p className="text-[9px] text-slate-500 font-semibold mt-1.5">{activeFile.size}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle className="w-4 h-4" />
            </span>
            <button
              type="button"
              onClick={() => handleRemove(activeFile.name)}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-950/40 text-slate-500 hover:text-white hover:border-slate-700 transition-colors focus:outline-none"
              title="Remove File"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
