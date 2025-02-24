import { useEffect, useState } from "react";
import { SearchFilter, SearchFilterResult, Section } from "../components";
import TagManager from "react-gtm-module";
import certs from "../assets/data/certifications.json";
import projs from "../assets/data/projects.json";

const Highlights = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const [tag, setTag] = useState("Personal Projects");

  const sortData = (data) => {
    data.sort((a, b) => {
      const getDateValue = (cert) =>
        cert.date ? new Date(cert.date) : new Date(`${cert.year}-01-01`);

      return getDateValue(b) - getDateValue(a);
    });

    return data;
  };

  // Get result
  useEffect(() => {
    if (data.length > 0) {
      let filteredData = data;

      filteredData = filteredData.filter(
        (item) =>
          item.group === (tag === "Personal Projects" ? "projs" : "certs"),
      );

      // Filter by query
      if (query.length > 0) {
        TagManager.dataLayer({
          dataLayer: {
            event: "search",
            env: import.meta.env.VITE_ENVIRONMENT,
            search: query,
          },
        });

        filteredData = filteredData.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase()),
        );
      }

      // Filter by filter items
      if (filter.length > 0) {
        TagManager.dataLayer({
          dataLayer: {
            event: "search",
            env: import.meta.env.VITE_ENVIRONMENT,
            search: filter,
          },
        });

        filteredData = filteredData.filter((item) =>
          filter.every(
            (filterItem) =>
              item.techs.includes(filterItem) || item.tags.includes(filterItem),
          ),
        );
      }

      setResult(sortData(filteredData));
    }
  }, [data, filter, query, tag]);

  // Get data
  useEffect(() => {
    const mergedData = [];

    certs.certifications.forEach((certYear) => {
      certYear.certs.forEach((cert) => {
        mergedData.push({
          group: "certs",
          year: certYear.year,
          ...cert,
        });
      });
    });

    projs.projects.forEach((projYear) => {
      projYear.projs.forEach((proj) => {
        mergedData.push({
          group: "projs",
          year: projYear.year,
          ...proj,
        });
      });
    });

    mergedData.sort((a, b) => b.year - a.year);

    setData(sortData(mergedData));
  }, []);

  return (
    <Section className="flex h-auto flex-col">
      <SearchFilter
        data={data}
        filter={filter}
        query={query}
        result={result}
        setFilter={setFilter}
        setTag={setTag}
        setQuery={setQuery}
        tag={tag}
      />
      <SearchFilterResult result={result} />
      <p className="note border-t border-red/50 pt-10 text-yellow/50">
        This page includes only personal projects, and certificates. Due to
        confidentiality agreements, I cannot publicly share work done during my
        employment.
      </p>
    </Section>
  );
};

export default Highlights;
