import { Keyword } from '@/models/cover-models';
import { useTranslation } from 'next-i18next';

interface KeywordsSectionProps {
  skills: Keyword[];
  technologies: Keyword[];
  programmingLanguages: Keyword[];
}

const KeywordsSection: React.FC<KeywordsSectionProps> = ({ programmingLanguages, skills, technologies }) => {
  const { t } = useTranslation('common');

  return (
    <section className="container container-narrow text-center">
      <div className="row">
        {/* Programming Languages Section */}
        <div className="col-md-6">
          <h2 className="popout-font popout-text h3">{t('Programming languages')}</h2>
          <div className="info-block">
            {programmingLanguages.map((language, index) => (
              <div key={index}>
                <p>{language.name}</p>
                <div className="progress info-progress position-relative">
                  <div
                    className="progress-bar progress-bar-striped"
                    role="progressbar"
                    style={{ width: `${language.proficiency?.scale || 0}%` }}
                    aria-label={language.proficiency?.name}
                    aria-valuenow={language.proficiency?.scale || 0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  ></div>
                  <div className="align-middle justify-content-center d-flex position-absolute w-100 progress-text">
                    {language.proficiency?.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="col-md-6">
          <h2 className="popout-font popout-text h3">{t('Skills')}</h2>
          <div className="info-block">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="badge list-badge"
              >
                {skill.name}
              </span>
            ))}
          </div>

          {/* Technologies Section */}
          <h2 className="popout-font popout-text h3">{t('Technologies')}</h2>
          <div className="info-block">
            {technologies.map((technology, index) => (
              <span
                key={index}
                className="badge list-badge"
              >
                {technology.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeywordsSection;
