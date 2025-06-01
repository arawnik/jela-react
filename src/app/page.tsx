'use client'

import { JSX, useEffect, useState } from 'react'
import { JelaApi } from '@/api/jela-api'
import { Education, Experience, Introduction, Keyword, KeywordType } from '@/app/models'
import IntroductionSection from '@/components/sections/IntroductionSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import EducationSection from '@/components/sections/EducationSection'
import KeywordsSection from '@/components/sections/KeywordsSection'
import { useAppContext } from '@/app-context'
import Head from 'next/head'

const CoverPage = (): JSX.Element => {
  const { t, i18n } = useAppContext()

  const [intro, setIntro] = useState<Introduction | null>(null)
  const [experiences, setExperiences] = useState<Experience[] | null>(null)
  const [educations, setEducations] = useState<Education[] | null>(null)
  const [skills, setSkills] = useState<Keyword[] | null>(null)
  const [technologies, setTechnologies] = useState<Keyword[] | null>(null)
  const [programmingLanguages, setProgrammingLanguages] = useState<Keyword[] | null>(null)

  useEffect(() => {
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

    fetchData()
  }, [i18n.language])

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
