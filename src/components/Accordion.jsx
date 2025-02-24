import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import TagManager from "react-gtm-module";

const Accordion = ({ ...props }) => {
  const { item } = props;
  const listRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const [height, setHeight] = useState(null);

  const handleClick = (name) => {
    setIsOpen(!isOpen);
    TagManager.dataLayer({
      dataLayer: {
        event: "click",
        env: import.meta.env.VITE_ENVIRONMENT,
        accordion: name,
      },
    });
  };

  const handleHeight = () => {
    const list = listRef.current;
    if (list) {
      setIsOpen(false);
      setHeight(`${list.scrollHeight}px`);
    }
  };

  useEffect(() => {
    handleHeight();
    window.addEventListener("resize", debounce(handleHeight, 10));

    return () => {
      window.removeEventListener("resize", debounce(handleHeight, 10));
    };
  }, []);

  return (
    <div className="my-10 block lg:my-20">
      <div
        className="inline-flex cursor-pointer items-center gap-5"
        onClick={() => handleClick(item.name)}
      >
        <h4>{item.name}</h4>
        <FontAwesomeIcon
          className="aspect-square rounded-full border-2 border-green p-1 text-xs text-green lg:p-1.5 lg:text-base"
          icon={isOpen ? faMinus : faPlus}
        />
      </div>
      {item.techs?.length > 0 && (
        <div
          className="overflow-hidden transition-height duration-300 ease-ease"
          ref={listRef}
          style={height ? { height: isOpen ? height : "0" } : {}}
        >
          <ul className="grid grid-cols-1 gap-1 pt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:pt-20 xl:grid-cols-4">
            {item.techs.map((tech, i) => (
              <li
                className="truncate sm:text-xl lg:text-3xl"
                key={i}
                title={tech}
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

Accordion.propTypes = {
  item: PropTypes.object,
};

export default Accordion;
