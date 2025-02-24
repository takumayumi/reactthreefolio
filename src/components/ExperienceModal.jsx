import { DynamicImageLoader } from ".";
import PropTypes from "prop-types";
import Modal from "./Modal";

const ExperienceModal = ({ exp, open, setOpen }) => {
  const {
    company_name,
    position_title,
    employment_type,
    responsibilities,
    technologies,
  } = exp;

  return (
    <Modal open={open} setOpen={setOpen}>
      {company_name && (
        <DynamicImageLoader
          alt={company_name}
          className="self-center w-auto h-8 lg:h-10"
          filename={company_name
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/[^a-zA-Z_]/g, "")}
          folder="comps"
          width="302"
          height="160"
        />
      )}
      <h4 className="text-center pt-5">{position_title}</h4>
      <p className="text-center">({employment_type})</p>
      {responsibilities && (
        <ul className="list-disc pl-4">
          {responsibilities.map(
            (desc, index) =>
              desc.length > 20 && <li key={`desc-${index}`}>{desc}</li>,
          )}
        </ul>
      )}
      {technologies && (
        <>
          <p className="font-bold">Tools and Technologies:</p>
          <p>
            {technologies
              .sort((a, b) =>
                a.toLowerCase().localeCompare(b.toLowerCase()),
              )
              ?.join(", ")}
          </p>
        </>
      )}
    </Modal>
  );
};

ExperienceModal.propTypes = {
  exp: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default ExperienceModal;
