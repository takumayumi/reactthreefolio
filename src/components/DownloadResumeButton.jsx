import TagManager from "react-gtm-module";
import resume from "../assets/doc/Resume.pdf";

const DownloadResumeButton = () => {
  const handleClick = () => {
    TagManager.dataLayer({
      dataLayer: {
        event: "file_download",
        file_name: "Resume",
      },
    });
  };

  return (
    <a
      className="group relative my-10 flex w-full flex-row items-center justify-center p-4 font-semibold italic md:w-auto md:px-12"
      download="Resume.pdf"
      href={resume}
      onClick={handleClick}
    >
      <span className="absolute left-0 top-0 z-0 h-full w-full border-4 border-green transition-all duration-300 ease-ease group-hover:bg-green group-hover:[transform:_rotateX(180deg)]" />
      <span className="relative z-10 text-green transition-colors duration-300 ease-ease group-hover:text-magenta">
        Download My Resume
      </span>
    </a>
  );
};

export default DownloadResumeButton;
