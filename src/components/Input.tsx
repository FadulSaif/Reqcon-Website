import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

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
          ref={ref}
          className={`w-full px-4 py-3 rounded-lg border bg-bg-surface text-text-primary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-border-custom focus:border-accent-primary'
          }`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <span
            id={`${inputId}-error`}
            className="text-xs text-red-500 font-medium mt-0.5"
            role="alert"
          >
            {error}
          </span>
        )}
        {!error && helperText && (
          <span
            id={`${inputId}-helper`}
            className="text-xs text-text-muted mt-0.5"
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;

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
        <textarea
          id={inputId}
          ref={ref}
          className={`w-full px-4 py-3 rounded-lg border bg-bg-surface text-text-primary text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary/20 ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-border-custom focus:border-accent-primary'
          }`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          rows={5}
          {...props}
        />
        {error && (
          <span
            id={`${inputId}-error`}
            className="text-xs text-red-500 font-medium mt-0.5"
            role="alert"
          >
            {error}
          </span>
        )}
        {!error && helperText && (
          <span
            id={`${inputId}-helper`}
            className="text-xs text-text-muted mt-0.5"
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default Input;
