import { useEffect, useState } from 'react';
import Head from 'next/head';
import { JelaApi } from '@/api/jela-api';
import { Education, Experience, Introduction, Keyword, KeywordType } from '@/models/cover-models';
import IntroductionSection from '@/components/sections/IntroductionSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import EducationSection from '@/components/sections/EducationSection';
import KeywordsSection from '@/components/sections/KeywordsSection';

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const CoverPage = () => {
  const [intro, setIntro] = useState<Introduction | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Keyword[]>([]);
  const [technologies, setTechnologies] = useState<Keyword[]>([]);
  const [programmingLanguages, setProgrammingLanguages] = useState<Keyword[]>([]);

  useEffect(() => {
    // Fetch introduction with delay
    delay(1500)
      .then(() => JelaApi.getIntroduction())
      .then(setIntro)
      .catch(console.error);

    // Fetch experiences with delay
    delay(3000)
      .then(() => JelaApi.getExperiences())
      .then(setExperiences)
      .catch(console.error);

    // Fetch educations with delay
    delay(4500)
      .then(() => JelaApi.getEducations())
      .then(setEducations)
      .catch(console.error);

    // Fetch skills with delay
    delay(6000)
      .then(() => JelaApi.getKeywords(KeywordType.Skill))
      .then(setSkills)
      .catch(console.error);

    // Fetch technologies with delay
    delay(7500)
      .then(() => JelaApi.getKeywords(KeywordType.Technology))
      .then(setTechnologies)
      .catch(console.error);

    // Fetch programming languages with delay
    delay(9000)
      .then(() => JelaApi.getKeywords(KeywordType.Language))
      .then(setProgrammingLanguages)
      .catch(console.error);
  }, []);

  /*useEffect(() => {
    JelaApi.getIntroduction().then(setIntro).catch(console.error);
    JelaApi.getExperiences().then(setExperiences).catch(console.error);
    JelaApi.getEducations().then(setEducations).catch(console.error);
    JelaApi.getKeywords(KeywordType.Skill).then(setSkills).catch(console.error);
    JelaApi.getKeywords(KeywordType.Technology).then(setTechnologies).catch(console.error);
    JelaApi.getKeywords(KeywordType.Language).then(setProgrammingLanguages).catch(console.error);
  }, []);*/

  return (
    <>
      <Head>
        <title>{intro ? intro.title : "Loading..."}</title>
      </Head>
      <main>
        <IntroductionSection intro={intro} />
        <ExperienceSection experiences={experiences} />
        <EducationSection educations={educations} />
        <KeywordsSection
          skills={skills}
          technologies={technologies}
          programmingLanguages={programmingLanguages}
        />
      </main>
    </>
  );
};

export default CoverPage;