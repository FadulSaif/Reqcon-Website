import React, { forwardRef } from 'react';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, helperText, className = '', id, rows = 4, ...props }, ref) => {
    const textId = id || `textarea-${Math.random().toString(36).substring(2, 9)}`;

    return (
      <div className={`w-full flex flex-col items-start gap-1.5 ${className}`}>
        {label && (
          <label
            htmlFor={textId}
            className="text-xs font-semibold tracking-wider text-text-primary select-none"
          >
            {label}
          </label>
        )}
        <textarea
          id={textId}
          ref={ref}
          rows={rows}
          className={`w-full px-4 py-3 rounded-lg border bg-bg-surface text-text-primary text-sm transition-all duration-200 resize-y focus:outline-none focus:ring-2 focus:ring-accent-primary/20 ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-border-custom focus:border-accent-primary'
          }`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textId}-error` : helperText ? `${textId}-helper` : undefined}
          {...props}
        />
        {error && (
          <span
            id={`${textId}-error`}
            className="text-xs text-red-500 font-medium mt-0.5"
            role="alert"
          >
            {error}
          </span>
        )}
        {!error && helperText && (
          <span
            id={`${textId}-helper`}
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
export default TextArea;
