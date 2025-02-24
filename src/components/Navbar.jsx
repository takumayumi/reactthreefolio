import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import TagManager from "react-gtm-module";

const BackgroundOverlay = ({ ...props }) => {
  const { isNavOpen, pos } = props;

  return (
    <span
      className={classNames(
        "fixed -z-10 h-screen w-screen transform transition-transform duration-700 ease-[cubic-bezier(.77,0,.175)]",
        pos === "back" ? "bg-gray/20" : "bg-gray",
        isNavOpen
          ? "translate-x-0 translate-y-0 " +
              (pos === "back" ? "delay-0" : "delay-100")
          : "-translate-y-full translate-x-0 " +
              (pos === "back" ? "delay-100" : "delay-0"),
      )}
    />
  );
};

BackgroundOverlay.propTypes = {
  isNavOpen: PropTypes.bool,
  pos: PropTypes.string,
};

const Link = ({ ...props }) => {
  const { icon, index, isNavOpen, link, onClick, text } = props;
  const delay = (isNavOpen ? (index + 5) * 100 : 0) + "ms";

  return (
    <NavLink
      className={classNames(
        "group relative inline-block translate-y-full pb-2 text-center text-2xl text-magenta opacity-0 transition-[opacity,_transform] duration-300 ease-in last:mr-0 sm:text-4xl lg:text-5xl",
        isNavOpen ? "translate-y-0 opacity-100" : "",
      )}
      to={link}
      style={{ transitionDelay: delay }}
      onClick={onClick}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {text}
      <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-magenta transition-all duration-300 ease-in-out group-hover:w-full group-[.active]:w-full" />
    </NavLink>
  );
};

Link.propTypes = {
  icon: PropTypes.object,
  index: PropTypes.number.isRequired,
  isNavOpen: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
};

const MenuIcon = ({ ...props }) => {
  const { isNavOpen, onClick } = props;
  const lines = ["top", "mid", "bot"];

  return (
    <div className="wrapper pointer-events-none fixed left-1/2 top-0 z-30 -translate-x-1/2 transform py-20">
      <div
        className="group pointer-events-auto relative z-40 ml-auto block h-10 w-10 cursor-pointer"
        onClick={onClick}
      >
        {lines.map((_, i) => (
          <span
            key={i}
            className={classNames(
              "mb-1 block h-1 w-10 transition-[transform,_background-color,_width] duration-500 ease-in-out first:w-[20px] last:float-right last:w-[20px]",
              isNavOpen
                ? "-translate-x-0.5 -rotate-45 bg-magenta first:translate-x-[1px] first:rotate-45 last:-translate-x-[3px] last:rotate-45"
                : "bg-yellow group-hover:first:w-10 group-hover:last:w-10",
            )}
          />
        ))}
      </div>
    </div>
  );
};

MenuIcon.propTypes = {
  isNavOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const links = [
    {
      link: "/",
      text: "Home",
    },
    {
      link: "/Resume",
      text: "Resume",
    },
    {
      link: "/Highlights",
      text: "Highlights",
    },
    {
      link: "/Contact",
      text: "Contact",
    },
  ];
  const location = useLocation();

  useEffect(() => {
    const name = location.pathname.replace("/", "");
    TagManager.dataLayer({
      dataLayer: {
        event: "page_view",
        env: import.meta.env.VITE_ENVIRONMENT,
        page: name === "" ? "Home" : name,
      },
    });
  }, [location]);

  const handleClick = (text) => {
    handleToggle();
    TagManager.dataLayer({
      dataLayer: {
        event: "click",
        env: import.meta.env.VITE_ENVIRONMENT,
        link: text,
      },
    });
  };

  const handleToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <MenuIcon onClick={handleToggle} isNavOpen={isNavOpen} />
      <nav
        className={classNames(
          "nav fixed z-20",
          isNavOpen ? "is-open visible" : "",
        )}
      >
        <BackgroundOverlay isNavOpen={isNavOpen} pos="back" />
        <BackgroundOverlay isNavOpen={isNavOpen} pos="front" />
        <ul className="pointer-events-none fixed left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform flex-col justify-center gap-16 text-center lg:flex-row lg:gap-12 xl:gap-20 [.nav.is-open_&]:pointer-events-auto">
          {links.length > 0 &&
            links.map((link, i) => (
              <li key={i}>
                <Link
                  index={i}
                  isNavOpen={isNavOpen}
                  link={link.link}
                  onClick={() => handleClick(link.text)}
                  text={link.text}
                />
              </li>
            ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
