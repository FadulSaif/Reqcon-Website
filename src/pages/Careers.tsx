import React, { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle2, Check, Heart, ShieldCheck, Award } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';
import Input from '../components/Input';
import FileInput from '../components/FileInput';
import Button from '../components/Button';
import Eyebrow from '../components/Eyebrow';
import SEO from '../components/SEO';
import { toAbsoluteUrl } from '../config/site';

interface CareerFormInputs {
  name: string;
  email: string;
  phone: string;
  cv: File | null;
}

const Careers: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(
    () => new URLSearchParams(location.search).get('formsubmit') === 'success'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<CareerFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      cv: null
    }
  });

  const onSubmit: SubmitHandler<CareerFormInputs> = () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const form = formRef.current;

      if (!form) {
        throw new Error('Careers form element is unavailable.');
      }

      const successRedirect = form.elements.namedItem('_next');
      if (successRedirect instanceof HTMLInputElement) {
        successRedirect.value = new URL(
          `${location.pathname}?formsubmit=success`,
          window.location.origin
        ).toString();
      }

      form.submit();
    } catch (error) {
      console.error('Unable to submit the careers form.', error);
      setIsSubmitting(false);
      setSubmitError(t('contact.form.submit_error'));
    }
  };

  const expectationBullets = t('careers.expectations_bullets', { returnObjects: true }) as string[];

  return (
    <div className="flex flex-col w-full">
      <SEO
        title="Arbeta hos oss | Karriär som IT-konsult i Stockholm & Göteborg | REQCON AB"
        description="Bli en del av REQCON AB. Vi söker drivna IT-konsulter, kravanalytiker, testledare och agila projektledare i Stockholm och Göteborg."
      />

      {/* 1. HERO SECTION */}
      <section
        className="relative py-24 md:py-36 px-6 border-b border-border-custom overflow-hidden text-center flex items-center justify-center min-h-[calc(100svh-var(--navbar-height))] bg-slate-950 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/careers-handshake-hero.png')" }}
      >
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/80 dark:from-black dark:via-black/75 dark:to-black/85 pointer-events-none" />
        
        {/* Content Container */}
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 relative z-10 text-white">
          <Eyebrow margin="none">
            {t('careers.hero_badge')}
          </Eyebrow>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight uppercase text-center">
            {t('careers.title')}
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-2xl text-center font-medium">
            {t('careers.hero_subtitle')}
          </p>

          <div className="mt-2 text-base md:text-lg text-white font-extrabold tracking-wide uppercase px-6 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 select-none text-center shadow-lg">
            {t('careers.tagline')}
          </div>

          <Button
            type="button"
            variant="primary"
            size="lg"
            className="rounded-full"
            onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            {t('careers.hero_cta')}
          </Button>
        </div>
      </section>

      {/* 2. VAD VI ERBJUDER DIG */}
      <Section background="default" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 text-left">
          <div className="flex flex-col gap-3">
            <Eyebrow>{t('careers.offer_badge')}</Eyebrow>
            <h2 className="heading-display text-text-primary">{t('careers.offer_title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 flex flex-col gap-4 border-l-4 border-brand-secondary shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <p className="body-md leading-relaxed text-text-secondary">
                {t('careers.offer_p1')}
              </p>
            </Card>

            <Card className="p-6 flex flex-col gap-4 border-l-4 border-brand-secondary shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <p className="body-md leading-relaxed text-text-secondary">
                {t('careers.offer_p2')}
              </p>
            </Card>

            <Card className="p-6 flex flex-col gap-4 border-l-4 border-brand-secondary shadow-sm hover:shadow-md transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="body-md leading-relaxed text-text-secondary">
                {t('careers.offer_p3')}
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* 3. VAD FÖRVÄNTAR SIG REQCON AV DIG? */}
      <Section background="alt" className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 text-left">
          <div className="flex flex-col gap-3">
            <Eyebrow>{t('careers.expectations_badge')}</Eyebrow>
            <h2 className="heading-display text-text-primary">{t('careers.expectations_title')}</h2>
          </div>

          <div className="flex flex-col gap-5 body-lg leading-relaxed text-text-secondary">
            <p>{t('careers.expectations_p1')}</p>
            <p>{t('careers.expectations_p2')}</p>
          </div>

          {/* Bullet List Card */}
          <Card className="p-8 md:p-10 flex flex-col gap-6 shadow-md border border-border-custom">
            <h3 className="heading-md text-text-primary">{t('careers.expectations_list_title')}</h3>
            <ul className="flex flex-col gap-4">
              {Array.isArray(expectationBullets) && expectationBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-brand-secondary shrink-0 mt-0.5" />
                  <span className="body-md text-text-primary font-medium">{bullet}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-border-custom mt-2">
              <p className="body-lg font-bold text-text-primary italic">
                "{t('careers.expectations_footer')}"
              </p>
            </div>
          </Card>
        </div>
      </Section>



      {/* 5. SPONTANANSÖKAN FORM SECTION */}
      <Section id="application-form" background="alt" className="scroll-mt-[var(--navbar-height)] py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-left relative">
          {/* Decorative Ambient Glow Blobs */}
          <div className="absolute -top-16 -left-16 w-72 h-72 bg-accent-primary/10 dark:bg-accent-primary/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-brand-secondary/15 dark:bg-brand-secondary/5 rounded-full blur-[80px] pointer-events-none" />
          
          {/* Premium Form Card */}
          <Card className="p-8 md:p-10 bg-gradient-to-br from-white/95 via-white to-slate-50/90 dark:from-zinc-950/95 dark:via-zinc-950 dark:to-zinc-900/60 border border-white/20 dark:border-zinc-850/60 shadow-2xl rounded-[2rem] relative overflow-hidden group">
            <div className="flex flex-col gap-2 mb-8 border-b border-border-custom pb-6">
              <Eyebrow margin="compact">
                {t('careers.form.badge')}
              </Eyebrow>
              <h3 className="text-2xl md:text-3xl font-black text-text-primary uppercase tracking-tight">
                {t('careers.form.title')}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {t('careers.form.subtitle')}
              </p>
            </div>

            {isSubmitSuccess ? (
              <div className="py-8 text-center flex flex-col items-center gap-6">
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
              </div>
            ) : (
              <form
                ref={formRef}
                action="https://formsubmit.co/info@reqcon.se"
                method="POST"
                encType="multipart/form-data"
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
                noValidate
              >
                <input type="hidden" name="_subject" value="New job application — REQCON website" />
                <input
                  type="hidden"
                  name="_next"
                  value={`${toAbsoluteUrl(location.pathname)}?formsubmit=success`}
                />
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label={t('careers.form.name')}
                    placeholder={t('careers.form.name_placeholder')}
                    error={errors.name?.message}
                    {...register('name', { required: t('careers.form.name_error') })}
                  />

                  <Input
                    label={t('careers.form.phone')}
                    placeholder={t('careers.form.phone_placeholder')}
                    error={errors.phone?.message}
                    {...register('phone', { required: t('careers.form.phone_error') })}
                  />
                </div>

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

                <Controller
                  name="cv"
                  control={control}
                  rules={{
                    required: t('careers.form.cv_error'),
                    validate: (file) => {
                      if (!file) return true;

                      const allowedTypes = [
                        'application/pdf',
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                      ];
                      const allowedExtensions = /\.(pdf|doc|docx)$/i;

                      if (!allowedTypes.includes(file.type) && !allowedExtensions.test(file.name)) {
                        return t('careers.form.cv_type_error');
                      }

                      return file.size <= 5 * 1024 * 1024 || t('careers.form.cv_size_error');
                    }
                  }}
                  render={({ field }) => (
                    <FileInput
                      label={t('careers.form.cv')}
                      accept=".pdf,.doc,.docx"
                      name="attachment"
                      error={errors.cv?.message}
                      onFileSelect={(file) => field.onChange(file)}
                    />
                  )}
                />

                {submitError && (
                  <p className="text-sm font-medium text-red-600" role="alert">
                    {submitError}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-2 transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/25 transform hover:-translate-y-0.5"
                  isLoading={isSubmitting}
                  rightIcon={<Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />}
                >
                  {t('careers.form.submit')}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </Section>

    </div>
  );
};

export default Careers;
