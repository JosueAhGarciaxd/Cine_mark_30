import React from "react";
import PropTypes from "prop-types";

const Title = ({ text, level = "h1", className = "" }) => {
  const HeadingTag = level;

  return <HeadingTag className={`title ${className}`}>{text}</HeadingTag>;
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
  level: PropTypes.oneOf(["h1", "h2", "h3", "h4", "h5", "h6"]),
  className: PropTypes.string,
};

export default Title;
