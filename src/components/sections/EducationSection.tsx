import { Education } from '@/models/cover-models';
import { getYear } from 'date-fns';
import { useTranslation } from 'next-i18next';

interface EducationSectionProps {
  educations: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ educations }) => {
  const { t } = useTranslation('common');

  return (
    <section className="container container-narrow text-center">
      <hr />
      <h2 className="popout-font popout-text">{t('Education')}</h2>
      <hr />
      <div className="timeline">
        {educations.map((education, index) => (
          <div
            key={index}
            className="timeline-box row"
          >
            <div className="timeline-left col-md-6">
              <p className="h4">
                {getYear(education.startDate)} - {getYear(education.endDate)}
              </p>
            </div>
            <div className="timeline-right col-md-6">
              <p className="h5">
                {education.title}
                {education.institution && education.institution.department
                  ? `, ${education.institution.department}`
                  : ''}
              </p>
              <p>{education.institution.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
