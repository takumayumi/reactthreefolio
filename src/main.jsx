import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./assets/css/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleXmark,
  faEnvelope as faEnvelopeRegular,
  faFaceSadCry,
} from "@fortawesome/free-regular-svg-icons";
import {
  faChevronDown,
  faCircleInfo,
  faEnvelope,
  faGlobe,
  faMagnifyingGlass,
  faMapMarkerAlt,
  faPhone,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faJsfiddle,
  faLinkedin,
  faStackOverflow,
  faTwitter,
  faWikipediaW,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import TagManager from "react-gtm-module";

library.add(
  faChevronDown,
  faCircleInfo,
  faCircleXmark,
  faEnvelope,
  faEnvelopeRegular,
  faFaceSadCry,
  faGithub,
  faGlobe,
  faJsfiddle,
  faLinkedin,
  faMagnifyingGlass,
  faMapMarkerAlt,
  faPhone,
  faSliders,
  faStackOverflow,
  faTwitter,
  faWikipediaW,
  faYoutube,
);

TagManager.initialize({
  gtmId: "GTM-PDJ6ZKM2",
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
