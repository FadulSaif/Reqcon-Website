import React, { forwardRef, useRef, useState } from 'react';
import { Upload, File, X } from 'lucide-react';

export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  onFileSelect?: (file: File | null) => void;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, error, helperText, className = '', id, onChange, onFileSelect, ...props }, ref) => {
    const inputId = id || `file-${Math.random().toString(36).substring(2, 9)}`;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const internalRef = useRef<HTMLInputElement | null>(null);

    // Sync with register ref
    const setRefs = (node: HTMLInputElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const handleButtonClick = () => {
      internalRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setSelectedFile(file);
      if (onFileSelect) {
        onFileSelect(file);
      }
      if (onChange) {
        onChange(e);
      }
    };

    const handleClearFile = (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelectedFile(null);
      if (internalRef.current) {
        internalRef.current.value = '';
      }
      if (onFileSelect) {
        onFileSelect(null);
      }
      // Trigger a change event with a mock target if needed, or trigger react-hook-form reset
      if (onChange && internalRef.current) {
        const event = {
          target: internalRef.current,
          type: 'change'
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    return (
      <div className={`w-full flex flex-col items-start gap-1.5 ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold uppercase tracking-wider text-text-primary select-none"
          >
            {label}
          </label>
        )}
        
        <input
          id={inputId}
          type="file"
          ref={setRefs}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx"
          {...props}
        />

        <div
          onClick={handleButtonClick}
          className={`w-full flex items-center justify-between p-4 rounded-lg border border-dashed bg-bg-surface cursor-pointer text-sm transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-900/50 focus-within:ring-2 focus-within:ring-accent-primary/20 ${
            error
              ? 'border-red-500 hover:border-red-600'
              : 'border-border-custom hover:border-accent-primary'
          }`}
        >
          {selectedFile ? (
            <div className="flex items-center gap-3 w-full min-w-0">
              <File className="w-5 h-5 text-accent-primary shrink-0" />
              <div className="flex flex-col min-w-0 text-left">
                <span className="text-sm font-medium text-text-primary truncate">
                  {selectedFile.name}
                </span>
                <span className="text-xs text-text-muted">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <button
                type="button"
                onClick={handleClearFile}
                className="ml-auto p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-text-muted hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary/20"
                aria-label="Ta bort fil"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-2 w-full gap-2 text-center">
              <div className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-accent-primary">
                <Upload className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-text-primary">Klicka för att ladda upp CV</span>
                <span className="text-xs text-text-muted mt-0.5">Endast PDF, DOC, DOCX (Max 5MB)</span>
              </div>
            </div>
          )}
        </div>

        {error && (
          <span
            className="text-xs text-red-500 font-medium mt-0.5"
            role="alert"
          >
            {error}
          </span>
        )}
        {!error && helperText && (
          <span className="text-xs text-text-muted mt-0.5">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';
export default FileInput;
