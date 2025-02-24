import { useEffect, useState } from "react";
import {
  Accordion,
  DownloadResumeButton,
  Employers,
  Section,
} from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import educJSON from "../assets/data/education.json";
import skillsJSON from "../assets/data/skills.json";

const Resume = () => {
  const [educ, setEduc] = useState([]);
  const [skills, setSkills] = useState(null);

  const getYear = (date) => {
    return new Date(date).getFullYear();
  };

  useEffect(() => {
    setEduc(educJSON.education[0]);
    setSkills(skillsJSON.main_skills);
  }, []);

  return (
    <Section>
      {/* Download */}
      <div className="flex w-full items-center justify-end" id="download">
        <DownloadResumeButton />
      </div>
      {/* Introduction */}
      <div className="block w-full" id="introduction">
        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
        <p>
          Integer vitae sodales ante. Donec sit amet ultricies ipsum, ut egestas
          est. Etiam tempor nunc in facilisis cursus. Mauris eu tincidunt augue.
          Praesent nisl elit, ullamcorper eu ex non, iaculis molestie arcu.
          Aliquam erat volutpat. Quisque vel magna vitae justo iaculis maximus.
          Ut tempus nec velit in luctus. Sed eget convallis elit, vitae
          vestibulum nunc. Pellentesque quis tellus at tortor volutpat mollis
          non nec libero. Duis eu sem dictum, molestie leo sed, semper erat.
        </p>
      </div>
      {/* Skills */}
      {skills?.length > 0 && (
        <div className="block w-full" id="skills">
          <h3>Tools and Technologies</h3>
          {skills.map((item, i) => (
            <Accordion key={i} item={item} />
          ))}
        </div>
      )}
      {/* Experiences */}
      <div className="block w-full" id="experiences">
        <h3>Experiences</h3>
        <Employers />
      </div>
      {/* Education */}
      <div className="block w-full" id="education">
        <h3>Education</h3>
        <div className="flex w-full flex-col gap-5">
          <p className="italic">
            {getYear(educ.start_date)} - {getYear(educ.end_date)}
          </p>
          <p className="body font-bold">{educ.degree}</p>
          <div className="flex items-center gap-5">
            <p>{educ.school_name}</p>
            &bull;
            <a href={educ.gmaps} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon="fa-solid fa-map-marker-alt" />
            </a>
            &bull;
            <a href={educ.website} target="_blank" rel="noreferrer">
              <FontAwesomeIcon icon="fa-solid fa-globe" />
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Resume;
