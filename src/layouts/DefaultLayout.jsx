import React from "react";

const DefaultLayout = ({ children }) => {
  return <main>{children}</main>;
};

DefaultLayout.auth = true;
export default DefaultLayout;
