import React, { useState, useEffect } from 'react';
import { Experience } from '@/models/cover-models';
import { formatEraText } from '@/utils/dateUtils';
import { useTranslation } from 'next-i18next';

interface ExperienceSectionProps {
  experiences: Experience[];
}

const COLLAPSE_STATE_KEY = 'experience_collapsed_states';
const COLLAPSE_STATE_DEFAULT = true;

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
  const { t } = useTranslation('common');
  const [isCollapsed, setIsCollapsed] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    // Load collapsed states from localStorage if available
    const storedState = localStorage.getItem(COLLAPSE_STATE_KEY);
    const initialState: { [key: number]: boolean } = storedState ? JSON.parse(storedState) : {};
    // Init by initial state where possible, default otherwise
    const collapseStateWithDefaults = experiences.reduce(
      (accumulator, experience) => {
        accumulator[experience.id] = initialState[experience.id] ?? COLLAPSE_STATE_DEFAULT;
        return accumulator;
      },
      {} as { [key: number]: boolean }
    );

    setIsCollapsed(collapseStateWithDefaults);
  }, [experiences]);

  // Toggle function for each collapsible block
  const toggleCollapse = (id: number) => {
    setIsCollapsed((prevState) => {
      const newState = { ...prevState, [id]: !prevState[id] };
      localStorage.setItem(COLLAPSE_STATE_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <section className="container container-narrow text-center">
      <hr />
      <h2 className="popout-font popout-text">{t('experience')}</h2>
      <hr />
      <div className="timeline">
        {experiences.map((experience) => (
          <div className="timeline-box row">
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
                  onClick={() => toggleCollapse(experience.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {t('keywords')}
                  <span className="ms-2">
                    {isCollapsed[experience.id] ? (
                      <i className="bi bi-chevron-compact-down"></i>
                    ) : (
                      <i className="bi bi-chevron-compact-up"></i>
                    )}
                  </span>
                </legend>
                <div style={{ display: isCollapsed[experience.id] ? 'none' : 'block' }}>
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
