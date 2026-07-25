import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Check, Send } from 'lucide-react';
import Card from './Card';
import Input from './Input';
import { TextArea } from './Input';
import Button from './Button';

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const serviceId = new URLSearchParams(location.search).get('service');
  const serviceTitles: Record<string, string> = {
    'requirements-analysis': t('services.items.krav.title'),
    'testing-qa': t('services.items.test.title'),
    'project-management': t('services.items.pm.title'),
    'information-management': t('services.items.info.title'),
    'ux-design': t('services.items.ux.title'),
    'agile-methods': t('services.items.agile.title'),
  };
  const requestedService = serviceId ? serviceTitles[serviceId] : undefined;

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormInputs>({
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = async (data: ContactFormInputs) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('https://formsubmit.co/ajax/info@reqcon.se', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          ...(requestedService ? { service: requestedService } : {}),
          _subject: 'New contact inquiry — REQCON website',
          _honey: '',
        }),
      });

      if (response.status !== 200) throw new Error(`FormSubmit returned ${response.status}`);

      setIsSubmitSuccess(true);
      reset();
    } catch {
      setSubmitError(t('contact.form.submit_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card hoverable={false} className="p-8 shadow-sm">
      {isSubmitSuccess ? (
        <div className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shadow-inner">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-text-primary">{t('contact.form.success_title')}</h3>
          <p className="text-sm text-text-secondary max-w-sm leading-relaxed">{t('contact.form.success_desc')}</p>
          <Button variant="ghost" className="mt-4" onClick={() => setIsSubmitSuccess(false)}>
            {t('contact.form.success_btn')}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 text-left" noValidate>
          {requestedService && (
            <p className="text-sm text-text-secondary rounded-lg border border-brand-secondary/20 bg-brand-secondary/5 px-4 py-3">
              {t('contact.form.service_context', { service: requestedService })}
            </p>
          )}
          <Input label={t('contact.form.name')} placeholder={t('contact.form.name_placeholder')} error={errors.name?.message} {...register('name', { required: t('contact.form.name_error') })} />
          <Input
            label={t('contact.form.email')}
            type="email"
            placeholder={t('contact.form.email_placeholder')}
            error={errors.email?.message}
            {...register('email', {
              required: t('contact.form.email_error'),
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: t('contact.form.email_invalid') },
            })}
          />
          <Input label={t('contact.form.subject')} placeholder={t('contact.form.subject_placeholder')} error={errors.subject?.message} {...register('subject', { required: t('contact.form.subject_error') })} />
          <TextArea label={t('contact.form.message')} placeholder={t('contact.form.message_placeholder')} error={errors.message?.message} {...register('message', { required: t('contact.form.message_error') })} />
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          {submitError && <p className="text-sm font-medium text-red-600" role="alert">{submitError}</p>}
          <Button type="submit" variant="primary" className="w-full mt-2" isLoading={isSubmitting} rightIcon={<Send className="w-4 h-4" />}>
            {t('contact.form.submit')}
          </Button>
        </form>
      )}
    </Card>
  );
};

export default ContactForm;
