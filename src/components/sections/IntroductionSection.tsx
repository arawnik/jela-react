import { Introduction } from '@/models/cover-models';

interface IntroductionSectionProps {
    intro: Introduction | null;
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ intro }) => (
    <section>
        {intro ? (
            // Actual data display
            <>
                <h1>{intro.title}</h1>
                <p>{intro.content}</p>
                <p><strong>Tagline:</strong> {intro.tagline}</p>
                <img src={"https://jerejunttila.fi" + intro.avatar} alt="Avatar" className="img-fluid" />
                <a href={intro.pdf} target="_blank" rel="noopener noreferrer">Download PDF</a>
            </>
        ) : (
            // Placeholders
            <>
                <h1><span className="placeholder col-6"></span></h1>
                <p><span className="placeholder col-8"></span></p>
                <p><strong>Tagline:</strong> <span className="placeholder col-4"></span></p>
                <div className="placeholder col-6" style={{ height: '150px', backgroundColor: '#e9ecef' }}></div>
                <span className="placeholder col-3"></span>
            </>
        )}
    </section>
);

export default IntroductionSection;