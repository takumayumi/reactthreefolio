import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, EffectFade, Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Cooking, EmployerModal } from ".";
import debounce from "lodash.debounce";
import expsJSON from "../assets/data/experiences.json";

const Employers = () => {
  const [exp, setExp] = useState({});
  const [expsData, setExpsData] = useState([]);
  const [isLG, setIsLG] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const swiperRef = useRef(null);

  const getYear = (date) => {
    if (date === "Present") {
      return date;
    }
    return new Date(date).getFullYear();
  };

  const handleClick = (exp) => {
    setExp(exp);
    setOpenModal(true);
  };

  useEffect(() => {
    setExpsData(expsJSON.experiences);
    const handleResize = () => {
      setIsLG(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", debounce(handleResize, 10));
    return () => {
      window.removeEventListener("resize", debounce(handleResize, 10));
    };
  }, []);

  return (
    <div className="relative mx-auto block w-full">
      {expsData.length > 0 ? (
        <Swiper
          className="block h-80 w-full overflow-visible rounded-3xl bg-green px-10 pb-12.5 pt-5 text-magenta sm:h-96 lg:h-112.5 lg:pb-5 [&_.swiper-wrapper]:items-center"
          direction={isLG ? "vertical" : "horizontal"}
          effect="fade"
          loop
          modules={[A11y, EffectFade, Mousewheel, Pagination]}
          mousewheel={{ invert: false }}
          pagination={{
            clickable: true,
            el: ".emp__pagination",
            renderBullet: (index, className) => {
              return `<span class="pagination-bullet ${className}"></span>`;
            },
          }}
          ref={swiperRef}
          slidesPerView={1}
        >
          {expsData.map((exp, i) => {
            const links = [
              {
                type: "gmaps",
                url: exp.gmaps,
                icon: "fa-solid fa-map-marker-alt",
              },
              {
                type: "website",
                url: exp.website ?? null,
                icon: "fa-solid fa-globe",
              },
              {
                type: "wiki",
                url: exp.wiki ?? null,
                icon: "fa-brands fa-wikipedia-w",
              },
            ];
            const filteredLinks = links.filter(
              (link) => !(link.type === "wiki" && exp.website),
            );
            return (
              <SwiperSlide
                className="group relative flex h-full w-full flex-col lg:max-w-250 lg:translate-y-0 lg:flex-row lg:gap-5 [&.swiper-slide-active_*]:transform-none [&.swiper-slide-active_*]:opacity-100"
                key={i}
              >
                <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 overflow-hidden text-center lg:left-[unset] lg:items-start lg:text-left [&_*]:translate-y-6.25 [&_*]:opacity-0 [&_*]:transition-all [&_*]:duration-500">
                  <p className="mt-auto font-bold italic group-[.swiper-slide-active]:delay-300">
                    {getYear(exp.start_date)} - {getYear(exp.end_date)}
                  </p>
                  <p className="w-full truncate font-bold group-[.swiper-slide-active]:delay-400">
                    {exp.position_title}
                  </p>
                  <div className="flex w-full items-center justify-center gap-5 group-[.swiper-slide-active]:delay-500 lg:justify-start">
                    <p className="truncate">{exp.company_name}</p>
                    {filteredLinks.map((link, index) =>
                      link.url ? (
                        <React.Fragment key={index}>
                          <span className="hidden lg:block">&bull;</span>
                          <a
                            className="hidden lg:block"
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <FontAwesomeIcon icon={link.icon} />
                          </a>
                        </React.Fragment>
                      ) : null,
                    )}
                  </div>
                  <div className="mb-auto mt-2 flex group-[.swiper-slide-active]:delay-600 lg:mt-4">
                    <button
                      className="truncate rounded-3xl bg-red px-8 py-3 text-sm uppercase text-yellow shadow-sm sm:text-base lg:text-2xl"
                      onClick={() => handleClick(exp)}
                      type="button"
                    >
                      Show more info
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <Cooking />
      )}
      {/* Pagination */}
      <div className="emp__pagination absolute -bottom-6 left-1/2 z-10 flex h-max -translate-x-1/2 -rotate-90 flex-col gap-2 lg:left-auto lg:right-5 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:rotate-0" />
      {/* Modal */}
      <EmployerModal exp={exp} open={openModal} setOpen={setOpenModal} />
    </div>
  );
};

export default Employers;
