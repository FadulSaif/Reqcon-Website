import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Check, Send, Award, Compass, Heart, Users } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';
import Input from '../components/Input';
import FileInput from '../components/FileInput';
import Button from '../components/Button';
import SEO from '../components/SEO';

interface CareerFormInputs {
  name: string;
  email: string;
  phone: string;
  cv: File | null;
}

const Careers: React.FC = () => {
  const { t } = useTranslation();
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<CareerFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      cv: null
    }
  });

  const onSubmit = async (data: CareerFormInputs) => {
    setIsSubmitting(true);
    console.log('CV Application submitted:', data);
    // Simulate API upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitSuccess(true);
    reset();
  };

  const benefits = [
    {
      icon: <Award className="w-5 h-5" />,
      title: t('careers.benefits.0.title'),
      description: t('careers.benefits.0.desc')
    },
    {
      icon: <Compass className="w-5 h-5" />,
      title: t('careers.benefits.1.title'),
      description: t('careers.benefits.1.desc')
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: t('careers.benefits.2.title'),
      description: t('careers.benefits.2.desc')
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: t('careers.benefits.3.title'),
      description: t('careers.benefits.3.desc')
    }
  ];

  const expectations = [
    t('careers.expectations.0'),
    t('careers.expectations.1'),
    t('careers.expectations.2'),
    t('careers.expectations.3')
  ];

  return (
    <div className="flex flex-col w-full">
      <SEO
        title={t('careers.title') + " - REQCON"}
        description={t('careers.subtitle')}
      />
      {/* Page Header */}
      <section className="relative py-24 md:py-36 px-6 border-b border-border-custom overflow-hidden text-center flex items-center justify-center min-h-[50vh] bg-slate-950">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img 
            src="/images/hero-company-image.jpg" 
            alt="REQCON Careers" 
            className="w-full h-full object-cover opacity-35 filter brightness-90 contrast-105"
          />
          {/* Dark gradient mask */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80 dark:from-black dark:via-black/75 dark:to-black/85" />
        </div>
        
        {/* Content Container */}
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10 text-white">
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-secondary/90 px-3 py-1 rounded-full bg-brand-secondary/10 border border-brand-secondary/15 select-none w-fit">
            {t('careers.badge')}
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight uppercase text-center">
            {t('careers.title')}
          </h1>
          
          <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl text-center font-medium">
            {t('careers.subtitle')}
          </p>
        </div>
      </section>

      {/* Benefits & Culture */}
      <Section background="default" title={t('careers.benefits_title')} subtitle={t('careers.benefits_subtitle')} badge={t('careers.benefits_badge')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
          {benefits.map((b, idx) => (
            <Card key={idx} hoverable={true} className="p-6 flex gap-4 shadow-sm">
              <div className="p-2.5 rounded-full bg-brand-secondary/10 text-brand-secondary shrink-0 h-10 w-10 flex items-center justify-center">
                {b.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-text-primary">{b.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{b.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Expectations */}
      <Section background="alt" title={t('careers.expectations_title')} subtitle={t('careers.expectations_subtitle')} badge={t('careers.expectations_badge')}>
        <div className="max-w-3xl mx-auto text-left bg-bg-surface border border-border-custom shadow-sm rounded-3xl p-8 md:p-12">
          <ul className="flex flex-col gap-6">
            {expectations.map((exp, idx) => (
              <li key={idx} className="flex gap-4 items-start">
                <div className="p-1 rounded-full bg-brand-secondary/15 text-brand-secondary mt-1 shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-base text-text-secondary leading-relaxed">{exp}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Application Form */}
      <Section background="default" title={t('careers.form.title')} subtitle={t('careers.form.subtitle')} badge={t('careers.form.badge')}>
        <div className="max-w-xl mx-auto text-left">
          {isSubmitSuccess ? (
            <Card className="p-8 text-center flex flex-col items-center gap-6 border-green-500/20 bg-green-50/10 dark:bg-green-950/5">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/20 text-green-500 flex items-center justify-center shadow-inner">
                <Check className="w-8 h-8" />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-bold text-text-primary">{t('careers.form.success_title')}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {t('careers.form.success_desc')}
                </p>
              </div>
              <Button onClick={() => setIsSubmitSuccess(false)} variant="secondary" size="md">
                {t('careers.form.success_btn')}
              </Button>
            </Card>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
              <Input
                label={t('careers.form.name')}
                placeholder={t('careers.form.name_placeholder')}
                error={errors.name?.message}
                {...register('name', { required: t('careers.form.name_error') })}
              />

              <Input
                label={t('careers.form.email')}
                type="email"
                placeholder={t('careers.form.email_placeholder')}
                error={errors.email?.message}
                {...register('email', {
                  required: t('careers.form.email_error'),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('careers.form.email_invalid')
                  }
                })}
              />

              <Input
                label={t('careers.form.phone')}
                placeholder={t('careers.form.phone_placeholder')}
                error={errors.phone?.message}
                {...register('phone', { required: t('careers.form.phone_error') })}
              />

              <Controller
                name="cv"
                control={control}
                rules={{ required: t('careers.form.cv_error') }}
                render={({ field }) => (
                  <FileInput
                    label={t('careers.form.cv')}
                    accept=".pdf,.doc,.docx"
                    error={errors.cv?.message}
                    onChange={(file) => field.onChange(file)}
                  />
                )}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full mt-2"
                isLoading={isSubmitting}
                rightIcon={<Send className="w-5 h-5" />}
              >
                {t('careers.form.submit')}
              </Button>
            </form>
          )}
        </div>
      </Section>
    </div>
  );
};

export default Careers;
