import { Keyword } from '@/models/cover-models';

interface KeywordsSectionProps {
    skills: Keyword[];
    technologies: Keyword[];
    programmingLanguages: Keyword[];
}

const KeywordsSection: React.FC<KeywordsSectionProps> = ({ skills, technologies, programmingLanguages }) => (
    <section>
        <h2>Skills</h2>
        <ul>
            {skills.length === 0 ? (
                <li className="placeholder col-6"></li>
            ) : (
                skills.map((skill, index) => (
                    <li key={index}>
                        {skill.name} - <strong>Proficiency:</strong> {skill.proficiency.name} ({skill.proficiency.scale}%)
                    </li>
                ))
            )}
        </ul>
        
        <h2>Technologies</h2>
        <ul>
            {technologies.length === 0 ? (
                <li className="placeholder col-6"></li>
            ) : (
                technologies.map((tech, index) => (
                    <li key={index}>
                        {tech.name} - <strong>Proficiency:</strong> {tech.proficiency.name} ({tech.proficiency.scale}%)
                    </li>
                ))
            )}
        </ul>
        
        <h2>Programming Languages</h2>
        <ul>
            {programmingLanguages.length === 0 ? (
                <li className="placeholder col-6"></li>
            ) : (
                programmingLanguages.map((language, index) => (
                    <li key={index}>
                        {language.name} - <strong>Proficiency:</strong> {language.proficiency.name} ({language.proficiency.scale}%)
                    </li>
                ))
            )}
        </ul>
    </section>
);

export default KeywordsSection;