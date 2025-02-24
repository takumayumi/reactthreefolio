import { useEffect, useState } from "react";
import { Cooking } from ".";
import PropTypes from "prop-types";

const DynamicVideoLoader = ({ ...props }) => {
  const { className, ext, filename, folder, height, width } = props;
  const [loading, setLoading] = useState(true);
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    const loadVideo = async () => {
      if (folder && filename) {
        try {
          const videoPath = `../assets/vid/${folder}/${filename}.${ext || 'mp4'}`;
          console.log(`Attempting to load video from: ${videoPath}`);
          
          const { default: dynamicVideo } = await import(/* @vite-ignore */ videoPath);
          setVideoSrc(dynamicVideo);
          setLoading(false);
        } catch (error) {
          console.error(`Error loading video: ${error.message}`);
        }
      } else {
        console.error("Folder or filename is not defined.");
      }
    };
    
    loadVideo();
  }, [ext, filename, folder]);

  if (loading) {
    return <Cooking />;
  }

  return videoSrc ? (
    <video
      className={className}
      src={videoSrc}
      height={height}
      width={width}
      controls={false}
      autoPlay
      loop
      muted
    />
  ) : (
    <Cooking />
  );
};

DynamicVideoLoader.propTypes = {
  className: PropTypes.string,
  ext: PropTypes.string,
  filename: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default DynamicVideoLoader;
