import classNames from "classnames";
import PropTypes from "prop-types";

const Section = ({ children, className, ...props }) => {
  return (
    <>
      <div className="section-padding top-0 h-35" />
      <div className="section-offset top-35 bg-gradient-to-t" />
      <div className="relative h-full w-full overflow-y-auto pb-30 pt-40">
        <div className={classNames("wrapper", className)} {...props}>
          {children}
        </div>
      </div>
      <div className="section-offset bottom-25 bg-gradient-to-b" />
      <div className="section-padding bottom-0 h-25" />
    </>
  );
};

Section.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Section;
