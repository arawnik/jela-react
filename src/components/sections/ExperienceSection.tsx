import { Experience } from '@/models/cover-models';

interface ExperienceSectionProps {
    experiences: Experience[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => (
    <section>
        <h2>Experiences</h2>
        {experiences.length === 0 ? (
            // Placeholder display
            <div className="placeholder-glow">
                <p className="placeholder col-6"></p>
                <p className="placeholder col-8"></p>
                <p className="placeholder col-5"></p>
                <p className="placeholder col-7"></p>
            </div>
        ) : (
            // Actual data display
            experiences.map((experience, index) => (
                <div key={index}>
                    <h3>{experience.title}</h3>
                    <p>{experience.description}</p>
                    <p><strong>Company:</strong> {experience.company.name}</p>
                    <p><strong>Era:</strong> {experience.start_date} - {experience.end_date || 'Present'}</p>
                </div>
            ))
        )}
    </section>
);

export default ExperienceSection;