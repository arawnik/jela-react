import { appWithTranslation } from 'next-i18next';
import App, { AppContext, AppProps } from 'next/app';
import HeaderComponent from '@/components/HeaderComponent';
import nextI18NextConfig from '../../next-i18next.config';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
          <HeaderComponent />
          <Component {...pageProps} />
        </>
    );
};
/*
MyApp.getInitialProps = async (appContext: AppContext) => {
  const { locale } = appContext.router;
  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      ...(await serverSideTranslations(locale || 'en', ['common'])),
    },
  };
};
*/

export default appWithTranslation(MyApp, nextI18NextConfig);
