import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import debounce from "lodash.debounce";
import PropTypes from "prop-types";
import skillsJSON from "../assets/data/skills.json";

const FilterButton = ({
  isActive,
  onClick,
  title,
  type = "button",
  icon,
  children,
  className,
}) => (
  <button
    className={classNames(
      "h-full w-full truncate rounded-lg bg-red px-6 py-1 sm:px-4",
      isActive ? "active" : "",
      className,
      title === "Filter"
        ? "col-span-2 flex items-center justify-between bg-red sm:col-span-1"
        : "block text-center [&.active]:bg-magenta/80 [&.active]:font-bold",
    )}
    onClick={onClick}
    title={title}
    type={type}
  >
    {children}
    {icon && (
      <FontAwesomeIcon
        className="text-base transition-transform duration-200 ease-ease"
        icon={icon}
      />
    )}
  </button>
);

FilterButton.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node,
  className: PropTypes.string,
};

const getGroup = (data) => {
  const techCounts = {};

  data.forEach((item) => {
    const combinedTechs = [...(item.techs || []), ...(item.tags || [])];

    combinedTechs.forEach((tech) => {
      if (!techCounts[tech]) {
        techCounts[tech] = { count: 0 };
      }

      techCounts[tech].count += 1;
    });
  });

  const skillsObj = {};

  skillsJSON.skills.forEach((skill) => {
    const relevantTechs = skill.techs
      .filter((tech) => techCounts[tech])
      .map((tech) => ({
        tech,
        count: techCounts[tech].count,
      }));

    if (relevantTechs.length > 0) {
      skillsObj[skill.name] = relevantTechs;
    }
  });

  return skillsObj;
};

const SearchFilter = ({
  data,
  filter,
  query,
  result,
  setFilter,
  setTag,
  setQuery,
  tag,
}) => {
  const [height, setHeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState({});
  const filterRef = useRef();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleCheck = (e) => {
    const id = e.target.getAttribute("data-name");
    const isChecked = e.target.checked;
  
    if (isChecked) {
      if (!filter.includes(id)) {
        setFilter([...filter, id]);
      }
    } else {
      setFilter(filter.filter((item) => item !== id));
    }
  };

  const handleOpen = () => setOpen(!open);

  const handleResize = () => {
    const filter = filterRef.current;
    if (filter) {
      setHeight(filter.scrollHeight);
    }
  };

  useEffect(() => {
    if (data.length > 0 && result.length > 0) {
      const dataGroup = getGroup(data);
      const resultGroup = getGroup(result);
      const updatedGroup = {};
    
      Object.keys(dataGroup).forEach((skillCategory) => {
        updatedGroup[skillCategory] = dataGroup[skillCategory].map(
          (techItem) => {
            const foundResultItem = resultGroup[skillCategory]?.find(
              (resultTech) => resultTech.tech === techItem.tech,
            );
          
            return {
              tech: techItem.tech,
              count: foundResultItem ? foundResultItem.count : 0,
            };
          },
        );
      });
    
      setSkills(updatedGroup);
    }
  }, [data, result]);

  useEffect(handleResize, [skills]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", debounce(handleResize, 10));

    return () => {
      window.removeEventListener("resize", debounce(handleResize, 10));
    };
  }, []);

  return (
    <div className="note my-5 block w-full rounded-lg bg-green ring-20 ring-green">
      <div className="grid w-full grid-cols-2 gap-y-2.5 sm:grid-cols-4 sm:gap-x-5 lg:gap-10">
        <div className="relative col-span-2">
          <input
            className="w-full rounded-full bg-red py-1 pl-6 pr-16 placeholder:text-yellow/50 sm:pr-12"
            onChange={(e) => handleChange(e)}
            placeholder="Search a project or a certificate"
            type="text"
          />
          <FontAwesomeIcon
            className={classNames(
              "pointer-events-none absolute right-6 top-1/2 z-10 -translate-y-1/2 text-base sm:right-5",
              query.length > 0 ? "text-yellow" : "text-yellow/50",
            )}
            icon="fa-solid fa-magnifying-glass"
          />
        </div>
        <div className="relative col-span-2 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          <FilterButton
            isActive={tag === "Personal Projects"}
            onClick={() => setTag("Personal Projects")}
            title="Personal Projects"
          >
            Projects
          </FilterButton>
          <FilterButton
            isActive={tag === "Certificates"}
            onClick={() => setTag("Certificates")}
            title="Certificates"
          >
            Certificates
          </FilterButton>
          <FilterButton onClick={handleOpen} title="Filter">
            <span className="block sm:hidden lg:block">Filter</span>
            <FontAwesomeIcon
              className="hidden sm:block lg:hidden"
              icon="fa-solid fa-sliders"
            />
            <FontAwesomeIcon
              className={classNames(open ? "rotate-180" : "")}
              icon="fa-solid fa-chevron-down"
            />
          </FilterButton>
        </div>
      </div>
      <div
        className="flex w-full items-start justify-between overflow-hidden text-magenta transition-height duration-200 ease-ease"
        ref={filterRef}
        style={{
          height: `${open ? height : 0}px`,
        }}
      >
        <div className="mt-5 grid w-full grid-cols-1 gap-5 border-t-2 border-red pt-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-10">
          {Object.keys(skills).map((skill) => (
            <div
              className="group/col col-span-1 block w-full md:first:col-span-3"
              key={skill.replace(/\s+/g, "_")}
            >
              <p className="truncate font-bold" title={skill}>
                {skill}
              </p>
              <div className="grid w-full grid-cols-1 group-first/col:grid-cols-1 group-first/col:gap-x-5 group-first/col:sm:grid-cols-3">
                {skills[skill].map(({ tech, count }) => {
                  const id = tech.replace(/\s+/g, "_");
                  return (
                    <div
                      className="relative block w-full [&_*]:box-border"
                      key={id}
                    >
                      <div
                        className="relative inline-block w-auto max-w-full"
                        title={tech}
                      >
                        <input
                          className="peer invisible absolute"
                          data-name={tech}
                          id={id}
                          onChange={(e) => handleCheck(e)}
                          type="checkbox"
                        />
                        <label
                          className="group/label flex w-auto  cursor-pointer select-none flex-row items-center overflow-hidden rounded-md transition-all duration-200 ease-ease peer-checked:[&_span:first-child]:animate-check peer-checked:[&_span:first-child]:border-red peer-checked:[&_span:first-child]:bg-red peer-checked:[&_span:first-child_svg]:[stroke-dashoffset:_0]"
                          htmlFor={id}
                        >
                          <span className="relative h-4.5 w-4.5 flex-none scale-100 rounded border border-solid border-red/50 shadow-sm transition-all duration-200 ease-ease group-hover/label:border-red">
                            <svg
                              className="absolute left-0.5 top-0.75 fill-none stroke-yellow stroke-2 transition-all delay-100 duration-300 ease-ease [stroke-dasharray:_16px] [stroke-dashoffset:_16px] [stroke-linecap:_round] [stroke-linejoin:_round] [transform:_translate3d(0,_0,_0)]"
                              width="12px"
                              height="10px"
                            >
                              <use xlinkHref="#check"></use>
                            </svg>
                          </span>
                          <span className="truncate pl-2">{tech}</span>
                          <span>&nbsp;({count})</span>
                        </label>
                        <svg className="pointer-events-none absolute h-0 w-0 select-none">
                          <symbol id="check" viewBox="0 0 12 10">
                            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                          </symbol>
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

SearchFilter.propTypes = {
  data: PropTypes.array.isRequired,
  filter: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  result: PropTypes.array.isRequired,
  setFilter: PropTypes.func.isRequired,
  setTag: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default SearchFilter;
