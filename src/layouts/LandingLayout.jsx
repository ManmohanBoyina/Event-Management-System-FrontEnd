import React from "react";

const LandingLayout = ({ children }) => {
  return <main>{children}</main>;
};

LandingLayout.auth = false;
export default LandingLayout;
