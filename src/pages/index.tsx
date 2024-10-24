import { JelaApi } from '@/api/jela-api';
import { CoverInfo } from '@/models/cover-info';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

interface FrontpageProps {
  info: CoverInfo;
}

const CoverPage = ({ info }: FrontpageProps) => {
  return (
    <>
      <Head>
        <title>{info.title}</title>
      </Head>
      <main>
        <h1>{info.title}</h1>
        <p>{info.introduction}</p>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const coverInfo = await JelaApi.getFrontpageData();

  return {
    props: {
      info: coverInfo,
    },
  };
};

export default CoverPage;
