import React from "react";
import PropTypes from "prop-types";
import "./components.css";

const HandwritingFont = ({ text, fontClass }) => {
  const fontStyle = {
    fontFamily: fontClass,
    fontSize: "25px",
    fontWeight: "600",
    letterSpacing: "4px",
  };

  return <div style={fontStyle}>{text}</div>;
};

HandwritingFont.propTypes = {
  text: PropTypes.string.isRequired,
  fontClass: PropTypes.string.isRequired,
};

export default HandwritingFont;
