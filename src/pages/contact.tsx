import { useState } from 'react';
import Head from 'next/head';
import { ContactForm } from '@/models/contact-models';
import { JelaApi } from '@/api/jela-api';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAppContext } from '@/app-context';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});

const ContactPage = () => {
  const { t } = useAppContext();
  const router = useRouter();
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      setErrors({ captcha: t('reCaptchaMissing') });
      return;
    }

    try {
      await JelaApi.submitContactForm({ ...formData, captchaToken });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      router.push('/thank-you');
    } catch (error: any) {
      setErrors(error);
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (token) {
      setErrors((prevErrors) => {
        const { captcha, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  return (
    <>
      <Head>
        <title>{t('contactMe')}</title>
        <Script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        />
      </Head>
      <main className="container my-5">
        <h1 className="popout-font mb-3">{t('contactMe')}</h1>
        <hr />
        <form
          onSubmit={handleSubmit}
          id="contact-form"
        >
          {/* Name Field */}
          <div className="form-group mb-3">
            <label
              htmlFor="name"
              className="form-label"
            >
              {t('yourName')}
            </label>
            <input
              type="text"
              id="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t('name')}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Email Field */}
          <div className="form-group mb-3">
            <label
              htmlFor="email"
              className="form-label"
            >
              {t('yourEmail')}
            </label>
            <input
              type="email"
              id="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder={t('email')}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Subject Field */}
          <div className="form-group mb-3">
            <label
              htmlFor="subject"
              className="form-label"
            >
              {t('yourSubject')}
            </label>
            <input
              type="text"
              id="subject"
              className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder={t('subject')}
            />
            {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
          </div>

          {/* Message Field */}
          <div className="form-group mb-3">
            <label
              htmlFor="message"
              className="form-label"
            >
              {t('yourMessage')}
            </label>
            <textarea
              id="message"
              className={`form-control ${errors.message ? 'is-invalid' : ''}`}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={t('message')}
            />
            {errors.message && <div className="invalid-feedback">{errors.message}</div>}
          </div>

          {/* reCAPTCHA Field */}
          <div className="row mb-4">
            <div className="col-md-6">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                onChange={handleCaptchaChange}
              />
            </div>
            {errors.captcha && (
              <div className="col-md-6 mt-3">
                <div
                  className="alert alert-danger"
                  role="alert"
                >
                  {errors.captcha}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-block"
          >
            Send
          </button>
        </form>
      </main>
    </>
  );
};

export default ContactPage;
