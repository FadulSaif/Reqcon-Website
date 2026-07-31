import React, { useState } from 'react';
import { useFormSubmit } from '../../hooks/useFormSubmit';
import HoneypotField from './HoneypotField';
import HumanVerification from './HumanVerification';

interface FormWrapperProps {
  formType: string;
  children: React.ReactNode;
  onSubmitSuccess?: () => void;
  className?: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ 
  formType, 
  children, 
  onSubmitSuccess,
  className = ""
}) => {
  const { status, message, submitForm } = useFormSubmit();
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    
    // Honeypot check
    if (formData._honey || formData._honey_trap) return;

    if (!turnstileToken) {
      return;
    }

    const result = await submitForm(formData, formType, turnstileToken);
    if (result.success && onSubmitSuccess) {
      onSubmitSuccess();
      setTurnstileToken('');
    }
  };

  return (
    <div className={`form-container ${className}`}>
      {status === 'success' ? (
        <div className="cf-success text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
          <p className="text-gray-600">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full">
          {/* FormSubmit Configuration (Fallback fields in case JS fails, handled mostly via AJAX) */}
          <input type="hidden" name="_subject" value={`New ${formType} Request`} />
          <input type="hidden" name="_template" value="table" />
          
          {/* Honeypot field for basic spam prevention */}
          <HoneypotField />
          <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" aria-hidden="true" />

          {/* Form Fields injected here */}
          {children}

          <HumanVerification 
            onVerify={(token) => setTurnstileToken(token)} 
            onExpire={() => setTurnstileToken('')} 
          />

          <button 
            type="submit" 
            disabled={status === 'loading' || !turnstileToken}
            className="btn btn-primary w-full mt-4"
          >
            {status === 'loading' ? 'Sending...' : 'Submit'}
          </button>

          {status === 'error' && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {message}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default FormWrapper;
