import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const DynamicImageLoader = ({ ...props }) => {
  const { alt, className, ext, filename, folder, height, width } = props;
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const { default: dynamicImage } = await import(
          `../assets/img/${folder}/${filename}.${ext ?? "png"}`
        );
        setImageSrc(dynamicImage);
      } catch (error) {
        console.error(`Error loading image: ${error}`);
      }
    };
    loadImage();
  }, [ext, filename, folder]);

  return imageSrc ? (
    <img
      alt={alt}
      className={className}
      src={imageSrc}
      height={height}
      width={width}
    />
  ) : null;
};

DynamicImageLoader.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  ext: PropTypes.string,
  filename: PropTypes.string.isRequired,
  folder: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default DynamicImageLoader;
