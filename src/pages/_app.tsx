import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import HeaderComponent from '@/components/HeaderComponent';
import nextI18NextConfig from '../../next-i18next.config';
import { AppContextProvider } from '@/app-context';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AppContextProvider>
        <HeaderComponent />
        <Component {...pageProps} />
      </AppContextProvider>
    </>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);
