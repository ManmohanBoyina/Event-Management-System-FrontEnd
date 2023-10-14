import React from "react";
import Navbar from "@/components/common/Navbar";

const DefaultLayout = ({ children }) => {
  return <main>
    <Navbar/>
    {children}</main>;
};

// DefaultLayout.auth = true;  
export default DefaultLayout;
