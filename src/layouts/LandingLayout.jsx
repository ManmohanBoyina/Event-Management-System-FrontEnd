import React from "react";
import Navbar from "@/components/common/Navbar";

const LandingLayout = ({ children }) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

// LandingLayout.auth = false;
export default LandingLayout;
