import { useEffect, useState } from 'react'
import Head from 'next/head'
import { JelaApi } from '@/api/jela-api'
import { Education, Experience, Introduction, Keyword, KeywordType } from '@/models/cover-models'
import IntroductionSection from '@/components/sections/IntroductionSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import EducationSection from '@/components/sections/EducationSection'
import KeywordsSection from '@/components/sections/KeywordsSection'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useAppContext } from '@/app-context'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
})

const CoverPage = () => {
  const { t, i18n } = useAppContext()
  const [intro, setIntro] = useState<Introduction | null>(null)
  const [experiences, setExperiences] = useState<Experience[] | null>(null)
  const [educations, setEducations] = useState<Education[] | null>(null)
  const [skills, setSkills] = useState<Keyword[] | null>(null)
  const [technologies, setTechnologies] = useState<Keyword[] | null>(null)
  const [programmingLanguages, setProgrammingLanguages] = useState<Keyword[] | null>(null)

  // Function to fetch all data from the backend
  const fetchData = async () => {
    try {
      const [introData, expData, eduData, skillData, techData, langData] = await Promise.all([
        JelaApi.getIntroduction(),
        JelaApi.getExperiences(),
        JelaApi.getEducations(),
        JelaApi.getKeywords(KeywordType.Skill),
        JelaApi.getKeywords(KeywordType.Technology),
        JelaApi.getKeywords(KeywordType.Language),
      ])

      setIntro(introData)
      setExperiences(expData)
      setEducations(eduData)
      setSkills(skillData)
      setTechnologies(techData)
      setProgrammingLanguages(langData)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [i18n?.language])

  return (
    <>
      <Head>
        <title>{intro ? intro.title : t('loading')}</title>
      </Head>
      <main>
        <IntroductionSection intro={intro} />
        <KeywordsSection
          skills={skills}
          technologies={technologies}
          programmingLanguages={programmingLanguages}
        />
        <EducationSection educations={educations} />
        <ExperienceSection experiences={experiences} />
      </main>
    </>
  )
}

export default CoverPage
