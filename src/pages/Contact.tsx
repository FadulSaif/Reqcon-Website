import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Phone, Mail, MapPin, Check, Send } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';
import Input, { TextArea } from '../components/Input';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { toAbsoluteUrl } from '../config/site';

interface ContactFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
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
    'agile-methods': t('services.items.agile.title')
  };
  const requestedService = serviceId ? serviceTitles[serviceId] : undefined;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormInputs) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('https://formsubmit.co/ajax/info@reqcon.se', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          ...data,
          ...(requestedService ? { service: requestedService } : {}),
          _subject: 'New contact inquiry — REQCON website',
          _honey: ''
        })
      });

      if (response.status !== 200) {
        throw new Error(`FormSubmit returned ${response.status}`);
      }

      setIsSubmitSuccess(true);
      reset();
    } catch {
      setSubmitError(t('contact.form.submit_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contacts = [
    {
      name: 'Fadi Rabah',
      title: 'Konsultchef - Stockholm',
      phone: '070-939 51 11',
      email: 'fadi.rabah@reqcon.se',
      address: 'Tullgårdsgatan 10, 116 68 Stockholm',
      mapUrl: 'https://maps.google.com/?q=Tullgårdsgatan+10,+Stockholm',
      image: '/images/team/fadi_rabah.jpg'
    },
    {
      name: 'Anel Pasic',
      title: 'Konsultchef - Göteborg',
      phone: '070-853 19 21',
      email: 'anel.pasic@reqcon.se',
      address: 'Gustaf Dalénsgatan 30 (Hisinge Hus), 417 24 Göteborg',
      mapUrl: 'https://maps.google.com/?q=Gustaf+Dalénsgatan+30,+Göteborg',
      image: '/images/team/anel_pasic.jpg'
    }
  ];

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "REQCON AB",
    "image": toAbsoluteUrl('/images/logo.png'),
    "telephone": "070-939 51 11",
    "email": "info@reqcon.se",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Tullgårdsgatan 10",
        "addressLocality": "Stockholm",
        "postalCode": "116 68",
        "addressCountry": "SE"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Gustaf Dalénsgatan 30",
        "addressLocality": "Göteborg",
        "postalCode": "417 24",
        "addressCountry": "SE"
      }
    ]
  };

  return (
    <div className="flex flex-col w-full">
      <SEO
        title="Kontakta oss | IT-konsulter i Stockholm & Göteborg | REQCON AB"
        description="Kontakta REQCON AB för rådgivning och bokning av seniora IT-konsulter inom kravanalys, testledning, UX och agil projektledning i Stockholm och Göteborg."
        schema={contactSchema}
      />
      {/* Page Header */}
      <section className="relative py-24 md:py-36 px-6 border-b border-border-custom overflow-hidden text-center flex items-center justify-center min-h-[50vh] bg-slate-950">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img 
            src="/images/about_office.jpg" 
            alt="REQCON Kontor i Stockholm och Göteborg" 
            className="w-full h-full object-cover opacity-30 filter brightness-[0.8] contrast-105"
          />
          {/* Dark gradient mask */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80 dark:from-black dark:via-black/75 dark:to-black/85" />
        </div>
        
        {/* Content Container */}
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10 text-white">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary/90 px-3 py-1 rounded-full bg-brand-secondary/10 border border-brand-secondary/15 select-none w-fit">
            {t('contact.badge')}
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight uppercase text-center">
            {t('contact.title')}
          </h1>
          
          <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl text-center font-medium">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Office Locations & Staff */}
      <Section background="default" title={t('contact.locations_title')} subtitle={t('contact.locations_subtitle')} badge={t('contact.locations_badge')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
          {contacts.map((c, idx) => (
            <Card key={idx} hoverable={true} className="p-8 flex flex-col justify-between shadow-sm">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-16 h-16 rounded-full object-cover border border-border-custom shrink-0 shadow-sm"
                    loading="lazy"
                  />
                  <div className="flex flex-col gap-0.5">
                    <h2 className="text-xl font-extrabold text-text-primary">{c.name}</h2>
                    <span className="text-xs font-semibold text-brand-secondary">{c.title}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4 text-sm text-text-secondary">
                  <a
                    href={`tel:${c.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 hover:text-brand-secondary transition-colors group"
                  >
                    <div className="p-2 bg-bg-surface border border-border-custom rounded-full text-text-secondary group-hover:text-brand-secondary transition-colors">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">{c.phone}</span>
                  </a>
                  
                  <a
                    href={`mailto:${c.email}`}
                    className="flex items-center gap-3 hover:text-brand-secondary transition-colors group"
                  >
                    <div className="p-2 bg-bg-surface border border-border-custom rounded-full text-text-secondary group-hover:text-brand-secondary transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">{c.email}</span>
                  </a>
                  
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-bg-surface border border-border-custom rounded-full text-text-secondary mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="text-left font-semibold leading-relaxed">
                      {c.address}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={c.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-secondary hover:text-brand-accent transition-colors"
                >
                  {t('contact.view_maps')} &rarr;
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Message Form */}
      <Section background="alt" title={t('contact.form.title')} subtitle={t('contact.form.subtitle')} badge={t('contact.form.badge')}>
        <div className="max-w-xl mx-auto">
          <Card hoverable={false} className="p-8 shadow-sm">
            {isSubmitSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shadow-inner">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary">{t('contact.form.success_title')}</h3>
                <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
                  {t('contact.form.success_desc')}
                </p>
                <Button
                  variant="ghost"
                  className="mt-4"
                  onClick={() => setIsSubmitSuccess(false)}
                >
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
                <Input
                  label={t('contact.form.name')}
                  placeholder={t('contact.form.name_placeholder')}
                  error={errors.name?.message}
                  {...register('name', { required: t('contact.form.name_error') })}
                />
                
                <Input
                  label={t('contact.form.email')}
                  type="email"
                  placeholder={t('contact.form.email_placeholder')}
                  error={errors.email?.message}
                  {...register('email', {
                    required: t('contact.form.email_error'),
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: t('contact.form.email_invalid')
                    }
                  })}
                />
                
                <Input
                  label={t('contact.form.subject')}
                  placeholder={t('contact.form.subject_placeholder')}
                  error={errors.subject?.message}
                  {...register('subject', { required: t('contact.form.subject_error') })}
                />

                <TextArea
                  label={t('contact.form.message')}
                  placeholder={t('contact.form.message_placeholder')}
                  error={errors.message?.message}
                  {...register('message', { required: t('contact.form.message_error') })}
                />

                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                {submitError && (
                  <p className="text-sm font-medium text-red-600" role="alert">
                    {submitError}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full mt-2"
                  isLoading={isSubmitting}
                  rightIcon={<Send className="w-4 h-4" />}
                >
                  {t('contact.form.submit')}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </Section>
    </div>
  );
};

export default Contact;
