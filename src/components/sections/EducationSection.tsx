import { Education } from '@/models/cover-models';

interface EducationSectionProps {
    educations: Education[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ educations }) => (
    <section>
        <h2>Education</h2>
        {educations.length === 0 ? (
            // Placeholder display
            <div className="placeholder-glow">
                <p className="placeholder col-6"></p>
                <p className="placeholder col-8"></p>
                <p className="placeholder col-4"></p>
                <p className="placeholder col-5"></p>
            </div>
        ) : (
            // Actual data display
            educations.map((education, index) => (
                <div key={index}>
                    <h3>{education.title}</h3>
                    <p>{education.description}</p>
                    <p><strong>Institution:</strong> {education.institution.name}</p>
                    <p><strong>Dates:</strong> {education.start_date} - {education.end_date}</p>
                </div>
            ))
        )}
    </section>
);

export default EducationSection;