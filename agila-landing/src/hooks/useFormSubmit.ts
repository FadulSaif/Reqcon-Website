import { useState } from 'react';
import { FORM_CONFIG } from '../config/formConfig';

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export const useFormSubmit = () => {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [message, setMessage] = useState('');

  const submitForm = async (formData: Record<string, any>, formType: string) => {
    setStatus('loading');
    
    // Construct the endpoint URL
    const url = `${FORM_CONFIG.endpoint}/ajax/${FORM_CONFIG.targetEmail}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New ${formType} Submission`,
          _captcha: FORM_CONFIG.captcha
        })
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you! Your submission has been received.');
        return { success: true };
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
      return { success: false, error };
    }
  };

  return { status, message, submitForm, setStatus };
};
