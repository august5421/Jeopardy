import React, { useState } from "react";
import "./components.css";

const LogoFont = ({
  text,
  color,
  fontSize,
  fontWeight,
  margins,
  align,
}) => {

  const logoStyle = {
    fontFamily: "LogoFont, sans-serif",
    color: color,
    fontSize: fontSize,
    fontWeight: fontWeight,
    margin: margins,
    letterSpacing: "3px",
    textAlign: align,
    transition: "color 0.3s ease",
  };

  return (
    <div
      style={logoStyle}
    >
      {text}
    </div>
  );
};

export default LogoFont;
