import PropTypes from "prop-types";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCertificate,
  faGlasses,
  faLinkSlash,
} from "@fortawesome/free-solid-svg-icons";
import { DynamicImageLoader } from ".";
import Modal from "./Modal";

const HighlightModal = ({ data, open, setOpen }) => {
  const {
    desc = [],
    group = "",
    id = 0,
    link = "",
    live_demo = "",
    techs = [],
    title = "",
    year = 2024,
  } = data;
  const isCert = group === "certs";
  const viewLink = isCert && link ? link : live_demo || "#";
  const viewText = isCert
    ? "Certificate of Completion"
    : live_demo
      ? "Live Demo"
      : "";

  return (
    <Modal open={open} setOpen={setOpen}>
      <DynamicImageLoader
        alt={title}
        className="h-auto w-full"
        filename={`${year}_${id}`}
        folder={isCert ? "certs" : "projs"}
        width="1000"
        height="auto"
      />
      <div className="flex w-full items-center justify-center">
        {viewLink !== "#" ? (
          <a
            className="inline-block flex-none border-b border-transparent text-center font-bold transition-colors duration-200 ease-linear sm:inline-flex sm:items-center sm:justify-center sm:gap-4 sm:hover:border-red"
            href={viewLink}
            rel="noreferrer"
            target="_blank"
          >
            View{" "}
            <FontAwesomeIcon
              className="hidden sm:block"
              icon={
                isCert ? faCertificate : live_demo ? faGlasses : faLinkSlash
              }
            />{" "}
            {viewText}
          </a>
        ) : (
          <span>Coming Soon!</span>
        )}
      </div>
      {techs && (
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          {techs.map((tech, index) => (
            <span
              className="rounded-full bg-red/90 px-2.5 py-1 text-sm text-yellow"
              key={`tech-${index}`}
            >
              {tech}
            </span>
          ))}
        </div>
      )}
      {desc.map((desc, index) =>
        Array.isArray(desc) ? (
          <div key={`desc-${index}`}>
            <ul className="list-outside list-disc pl-5">
              {desc.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p
            className={classNames(
              "leading-normal xl:leading-loose",
              desc === "Features" || desc === "Technologies Used"
                ? "font-extrabold"
                : "",
            )}
            key={`desc-${index}`}
          >
            {desc}
          </p>
        ),
      )}
    </Modal>
  );
};

HighlightModal.propTypes = {
  data: PropTypes.shape({
    desc: PropTypes.array,
    group: PropTypes.string,
    id: PropTypes.number,
    link: PropTypes.string,
    live_demo: PropTypes.string,
    techs: PropTypes.array,
    title: PropTypes.string,
    year: PropTypes.number,
  }).isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default HighlightModal;
