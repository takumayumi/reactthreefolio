import PropTypes from "prop-types";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({ open, setOpen, children }) => {
  return (
    <div
      className={classNames(
        "note fixed left-0 top-0 z-60 block h-full w-full overflow-hidden overflow-y-auto transition-opacity duration-200 ease-in",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="absolute left-0 top-0 h-auto min-h-full w-full">
        <span
          className="absolute z-10 h-full w-full bg-black/80"
          onClick={() => setOpen(false)}
        />
        <div
          className={classNames(
            "container relative left-0 top-0 z-20 mx-auto my-20 h-auto max-w-[90%] overflow-visible bg-magenta text-red transition-transform duration-200 ease-in-out md:max-w-[70%] xl:max-w-5xl",
            open ? "scale-100 delay-200" : "scale-0",
          )}
        >
          <div className="w-full h-full p-10 border-8 border-dotted border-green flex flex-col gap-5 bg-yellow/70">
            <FontAwesomeIcon
              className="absolute -right-2 -top-14 z-30 cursor-pointer rounded-full text-green"
              icon="fa-regular fa-circle-xmark"
              onClick={() => setOpen(false)}
            />
            {open ? children : null}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
