import { JelaApi } from '@/api/jela-api';
import { Project } from '@/models/project';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useAppContext } from '@/app-context';

interface ProjectsPageProps {
  projects: Project[];
}

const ProjectsPage = ({ projects }: ProjectsPageProps) => {
  const { t } = useAppContext();

  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <main>
        <h1>My Projects</h1>
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { i18n } = useAppContext();
  const projects = await JelaApi.getProjects();

  return {
    props: {
      projects: projects,
    },
  };
};

export default ProjectsPage;
