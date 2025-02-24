import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { DynamicImageLoader, HighlightModal } from ".";
import PropTypes from "prop-types";

const SearchFilterResult = ({ result }) => {
  const [highlight, setHighlight] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleClick = (highlight) => {
    setHighlight(highlight);
    setOpenModal(true);
  };

  return (
    <div
      className={classNames(
        "note block w-full py-10 lg:py-20",
        result.length > 0 ? "" : "py-20 lg:py-40",
      )}
    >
      {result.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-10">
            {result.map((res, index) => {
              const isCert = res.group === "certs";

              return (
                <div
                  className="flex cursor-pointer flex-col gap-2 rounded-lg bg-yellow/70 p-4 pb-2 text-magenta transition-colors duration-200 ease-ease"
                  onClick={() => handleClick(res)}
                  key={`res-` + index}
                  title={res.title}
                >
                  <div className="group relative h-40 w-full overflow-hidden rounded-lg">
                    <DynamicImageLoader
                      alt={res.title}
                      className="relative z-0 h-full w-full object-cover object-center"
                      filename={`${res.year}_${res.id}`}
                      folder={isCert ? "certs" : "projs"}
                      width="302"
                      height="160"
                    />
                    <span className="absolute left-0 top-0 z-10 h-full w-full bg-magenta/50 transition-colors duration-200 ease-ease content-[''] group-hover:bg-magenta/80" />
                    <FontAwesomeIcon
                      className="body absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-yellow opacity-0 transition-opacity duration-200 ease-ease group-hover:opacity-100"
                      icon="fa-solid fa-circle-info"
                    />
                  </div>
                  <p className="truncate">{res.title}</p>
                </div>
              );
            })}
          </div>
          <HighlightModal
            data={highlight}
            open={openModal}
            setOpen={setOpenModal}
          />
        </>
      ) : (
        <div className="body flex w-full flex-col items-center justify-center gap-5 text-center">
          <FontAwesomeIcon icon="fa-regular fa-face-sad-cry" />
          <p>
            Sorry, no result.
            <br />
            Please search again, bestie.
          </p>
        </div>
      )}
    </div>
  );
};

SearchFilterResult.propTypes = {
  result: PropTypes.array.isRequired,
};

export default SearchFilterResult;
