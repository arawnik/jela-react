import { Experience } from '@/models/cover-models';
import { formatEraText } from '@/utils/dateUtils';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

interface ExperienceSectionProps {
  experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const { t } = useTranslation('common');
  const [isCollapsed, setIsCollapsed] = useState<boolean[]>(experiences.map(() => true)); // Initialize all as collapsed

  // Toggle function for each collapsible block
  const toggleCollapse = (index: number) => {
    setIsCollapsed((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <section className="container container-narrow text-center">
      <hr />
      <h2 className="popout-font popout-text">{t('experience')}</h2>
      <hr />
      <div className="timeline">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className="timeline-box row"
          >
            {/* Left Side: Era and Title */}
            <div className="timeline-left col-md-6">
              <p className="h4">{formatEraText(experience.startDate, experience.endDate)}</p>
              <p className="h5">
                {experience.title}
                {experience.company && experience.company.name ? `, ${experience.company.name}` : ''}
              </p>
            </div>

            {/* Right Side: Company, Description, and Keywords */}
            <div className="timeline-right col-md-6">
              <p className="h4">{experience.company.name}</p>
              <p>{experience.description}</p>

              {/* Keywords as Collapsible Badges */}
              <fieldset className="collapsible">
                <legend
                  onClick={() => toggleCollapse(index)}
                  style={{ cursor: 'pointer' }}
                >
                  {t('keywords')}
                  <span className="ms-2">
                    {isCollapsed[index] ? (
                      <i className="bi bi-chevron-compact-down"></i>
                    ) : (
                      <i className="bi bi-chevron-compact-up"></i>
                    )}
                  </span>
                </legend>
                <div style={{ display: isCollapsed[index] ? 'none' : 'block' }}>
                  {experience.keywords.map((keyword, keywordIndex) => (
                    <span
                      key={keywordIndex}
                      className="badge list-badge"
                    >
                      {keyword.name}
                    </span>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
