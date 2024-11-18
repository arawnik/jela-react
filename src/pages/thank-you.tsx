import Head from 'next/head';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAppContext } from '@/app-context';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});

const ThankYouPage = () => {
  const { t } = useAppContext();

  return (
    <>
      <Head>
        <title>{t('thankYou')}</title>
      </Head>
      <main className="container my-5">
        <h2 className="popout-font">{t('thankYou')}</h2>
        <p className="fw-semibold">{t('thankYouMessage')}</p>
      </main>
    </>
  );
};

export default ThankYouPage;
