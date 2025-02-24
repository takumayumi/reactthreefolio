import classNames from "classnames";
import PropTypes from "prop-types";

const Cooking = ({ className }) => {
  return (
    <div
      className={classNames(
        "my-auto flex h-auto w-full flex-1 flex-col items-center justify-center pt-5 gap-5",
        className,
      )}
    >
      <div className="perspective-pan relative z-10 mr-16 h-3.5 w-pan origin-pan animate-pan rounded-bl-pan rounded-br-pan bg-pan shadow-pan">
        <span className="absolute left-pan-handle top-0 -z-20 h-2.5 w-pan-handle rounded-bl-pan-handle rounded-tr-pan-handle bg-pan-handle bg-no-repeat" />
        <span className="transform-egg absolute left-1/2 top-0 -z-20 h-egg w-egg animate-egg rounded-egg bg-white bg-egg bg-no-repeat shadow-egg" />
      </div>
      <p className="mt-10">Loading...</p>
    </div>
  );
};

Cooking.propTypes = {
  className: PropTypes.string,
};

export default Cooking;
