import { JelaApi } from '@/api/jela-api';
import { Project } from '@/models/projects-models';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAppContext } from '@/app-context';

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
});

const ProjectsPage = () => {
  const { t, i18n } = useAppContext();
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchData = async () => {
    try {
      const projectsData = await JelaApi.getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [i18n?.language]);

  return (
    <>
      <Head>
        <title>{t('projects')}</title>
      </Head>
      <main className="container">
        <h2 className="popout-font">{t('projects')}</h2>

        <div className="featurette-container">
          {projects.map((project, index) => (
            <div>
              <hr className="featurette-divider" />
              <div className={`row featurette ${index % 2 !== 0 ? 'order-md-2' : ''}`}>
                <div className={`col-md-7 ${index % 2 !== 0 ? 'order-md-2' : ''} d-flex flex-column`}>
                  <div className="align-items-stretch mb-auto">
                    <h3 className="featurette-heading">
                      <span className="main-header">{project.name}</span>{' '}
                      <span className="text-muted">{project.info}</span>
                    </h3>
                    <p dangerouslySetInnerHTML={{ __html: project.description }}></p>
                  </div>
                  <div className="align-items-end">
                    <div className="info-block">
                      {project.keywords.map((keyword) => (
                        <span className="badge list-badge">{keyword.name}</span>
                      ))}
                    </div>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-box-arrow-up-right"></i> {t('checkItOut')}
                    </a>
                  </div>
                </div>
                <div className={`col-md-5 ${index % 2 !== 0 ? 'order-md-1' : ''}`}>
                  <img
                    className="border"
                    src={'https://jerejunttila.fi' + project.image}
                    alt={`${project.name} showcase`}
                    width={500}
                    height={300}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default ProjectsPage;
