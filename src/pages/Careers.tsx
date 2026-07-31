import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Send, CheckCircle2, Check } from 'lucide-react';
import Section from '../components/Section';
import Card from '../components/Card';
import Input, { TextArea } from '../components/Input';
import FileInput from '../components/FileInput';
import Button from '../components/Button';
import Eyebrow from '../components/Eyebrow';
import SEO from '../components/SEO';
import SubpageHero from '../components/SubpageHero';
import { getButtonClassName } from '../components/buttonStyles';
import {
  GrowingTogetherIcon,
  IdeasInMotionIcon,
  InterlockingHandsIcon,
  LearningTogetherIcon,
  TargetGoalIcon,
  type CareerBenefitIcon,
} from '../components/CareerBenefitIcons';
import { toAbsoluteUrl } from '../config/site';

interface CareerFormInputs {
  name: string;
  email: string;
  phone: string;
  message: string;
  cv: File | null;
}

interface CareerBenefit {
  id: 'freedom' | 'learning' | 'influence' | 'investment';
  title: string;
  description: string;
  Icon: CareerBenefitIcon;
}

const Careers: React.FC = () => {
  const { t, i18n } = useTranslation();
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
      message: '',
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
  const routeLanguage = i18n.language.startsWith('en') ? 'en' : 'sv';
  const careerBenefits: readonly CareerBenefit[] = [
    {
      id: 'freedom',
      title: t('careers.offer_cards.freedom.title'),
      description: t('careers.offer_cards.freedom.description'),
      Icon: InterlockingHandsIcon,
    },
    {
      id: 'learning',
      title: t('careers.offer_cards.learning.title'),
      description: t('careers.offer_cards.learning.description'),
      Icon: LearningTogetherIcon,
    },
    {
      id: 'influence',
      title: t('careers.offer_cards.influence.title'),
      description: t('careers.offer_cards.influence.description'),
      Icon: GrowingTogetherIcon,
    },
    {
      id: 'investment',
      title: t('careers.offer_cards.investment.title'),
      description: t('careers.offer_cards.investment.description'),
      Icon: IdeasInMotionIcon,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <SEO
        title={i18n.language === 'sv'
          ? 'Arbeta hos oss | Karriär som IT-konsult i Stockholm & Göteborg | REQCON AB'
          : 'Work with us | IT consulting careers in Stockholm & Gothenburg | REQCON AB'}
        description={i18n.language === 'sv'
          ? 'Bli en del av REQCON AB. Vi söker drivna IT-konsulter, kravanalytiker, testledare och agila projektledare i Stockholm och Göteborg.'
          : 'Join REQCON AB. We welcome driven IT consultants, requirements analysts, test managers, and agile project managers in Stockholm and Gothenburg.'}
      />

      {/* 1. HERO SECTION */}
      <SubpageHero
        backgroundImage="/images/careers-handshake-hero.png"
        imageClassName="opacity-100"
      >
          <Eyebrow margin="none">
            {t('careers.hero_badge')}
          </Eyebrow>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight text-center">
            {t('careers.title')}
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-2xl text-center font-medium">
            {t('careers.hero_subtitle')}
          </p>

          <Button
            type="button"
            variant="primary"
            size="lg"
            className="rounded-full"
            onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            {t('careers.hero_cta')}
          </Button>
      </SubpageHero>

      {/* 2. INTRODUCTION */}
      <Section background="default" className="py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:gap-16">
          <div className="flex min-w-0 max-w-3xl flex-col items-start gap-4 text-left">
            <Eyebrow nowrap={false}>{t('careers.intro_badge')}</Eyebrow>
            <h2 className="heading-xl text-text-primary">{t('careers.intro_title')}</h2>
            <p className="body-lg max-w-2xl leading-relaxed text-text-secondary">
              {t('careers.intro_description')}
            </p>
          </div>

          <Card
            hoverable={false}
            className="flex min-h-64 min-w-0 items-center justify-center overflow-hidden border-brand-secondary/20 bg-gradient-to-br from-brand-secondary/15 via-accent-secondary/10 to-accent-light/15 p-8 md:p-10"
          >
            <div className="flex h-44 w-44 items-center justify-center rounded-[2rem] border border-brand-secondary/25 bg-brand-secondary/5 p-6 text-accent-secondary shadow-sm backdrop-blur-sm md:h-52 md:w-52 md:p-7">
              <TargetGoalIcon />
            </div>
          </Card>
        </div>
      </Section>

      {/* 3. WHAT WE OFFER */}
      <Section background="alt" className="py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 text-left md:gap-12">
          <div className="flex max-w-3xl flex-col items-start gap-3">
            <Eyebrow>{t('careers.offer_badge')}</Eyebrow>
            <h2 className="heading-display text-text-primary">{t('careers.offer_title')}</h2>
            <p className="body-lg max-w-2xl leading-relaxed text-text-secondary">
              {t('careers.offer_intro')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {careerBenefits.map(({ id, title, description, Icon }) => (
              <Card
                key={id}
                hoverable={false}
                className="flex h-full min-w-0 flex-col gap-5 p-6 md:p-7"
              >
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-brand-secondary/15 bg-brand-secondary/10 p-3 text-accent-secondary dark:text-accent-light">
                  <Icon />
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="heading-md text-text-primary">{title}</h3>
                  <p className="body-md leading-relaxed text-text-secondary">{description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. EXPECTATIONS */}
      <Section background="default" className="py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 text-left md:gap-12">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
            <div className="flex min-w-0 flex-col items-start gap-5">
              <Eyebrow>{t('careers.expectations_badge')}</Eyebrow>
              <h2 className="heading-display text-text-primary">{t('careers.expectations_title')}</h2>
              <div className="flex flex-col gap-4 body-lg leading-relaxed text-text-secondary">
                <p>{t('careers.expectations_p1')}</p>
                <p>{t('careers.expectations_p2')}</p>
              </div>
            </div>

            <Card hoverable={false} className="flex min-w-0 flex-col gap-6 p-7 shadow-md md:p-9">
              <h3 className="heading-md text-text-primary">{t('careers.expectations_list_title')}</h3>
              <ul className="flex flex-col gap-4">
                {Array.isArray(expectationBullets) && expectationBullets.map((bullet) => (
                  <li key={bullet} className="flex min-w-0 items-start gap-3.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-secondary" aria-hidden="true" />
                    <span className="body-md min-w-0 text-text-primary">{bullet}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="rounded-3xl border border-brand-secondary/20 bg-brand-secondary/10 px-6 py-7 md:px-9 md:py-8">
            <div className="flex max-w-4xl flex-col gap-2">
              <p className="heading-md text-text-primary">{t('careers.expectations_footer')}</p>
              <p className="body-lg font-medium text-brand-secondary">{t('careers.tagline')}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. PERSONNEL POLICY */}
      <Section background="dark" className="py-14 md:py-18">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 text-left md:flex-row md:items-center">
          <div className="flex max-w-2xl flex-col items-start gap-3">
            <Eyebrow>{t('careers.policy_badge')}</Eyebrow>
            <h2 className="heading-lg text-white">{t('careers.policy_banner')}</h2>
          </div>
          <Link
            to={`/${routeLanguage}/personalpolicy`}
            className={getButtonClassName({
              variant: 'primary',
              size: 'lg',
              className: 'shrink-0 rounded-full',
            })}
            aria-label={t('careers.policy_banner_cta')}
          >
            <span>{t('careers.policy_banner_cta')}</span>
            <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </Link>
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
              <h3 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">
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

                <TextArea
                  label={t('careers.form.message')}
                  placeholder={t('careers.form.message_placeholder')}
                  {...register('message')}
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
