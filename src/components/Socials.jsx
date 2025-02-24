import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import PropTypes from "prop-types";
import socialsJson from "../assets/data/socials.json";

const Socials = ({ className }) => {
  const [socialsData, setSocialsData] = useState(null);

  useEffect(() => {
    setSocialsData(socialsJson.socials);
  }, []);

  return (
    <div
      className={classNames(
        "mt-auto flex flex-col items-center gap-10 lg:flex-row lg:justify-end",
        className,
      )}
    >
      <p className="font-light">SAY HI!</p>
      <ul className="flex flex-row flex-wrap justify-center gap-5 lg:justify-normal lg:pl-6">
        {socialsData &&
          socialsData.map((social, i) => (
            <li className="relative" key={i}>
              <a
                className="peer relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red text-yellow/50 duration-500 [text-shadow:_0_0_5px_#F2EDD5] hover:text-yellow hover:shadow-social sm:h-16 sm:w-16 lg:h-18.5 lg:w-18.5"
                href={social.link}
                rel="noreferrer"
                target="_blank"
                title={social.name}
              >
                <FontAwesomeIcon
                  className="relative z-20"
                  icon={social.faClass}
                />
              </a>
              <span className="absolute left-0 top-0 z-0 h-full w-full scale-90 rounded-full bg-yellow duration-500 peer-hover:scale-[1.1] peer-hover:shadow-social-ring" />
            </li>
          ))}
      </ul>
    </div>
  );
};

Socials.propTypes = {
  className: PropTypes.string,
};

export default Socials;
