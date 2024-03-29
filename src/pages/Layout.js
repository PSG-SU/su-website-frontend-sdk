import React from "react";
import ContactUs from "../components/ContactUs.js";
import Navbar from "../components/NavBar.js";

const Layout = ({ children, noPadding = false }) => {
  return (
    <div className="w-screen overflow-x-hidden">
      <Navbar />
      <div className={`pt-16 min-h-[calc(100vh-8rem)] ${!noPadding && "lg:px-[calc(100vw/28)]"} bg-gray-50`}>
        {children}
      </div>
      <ContactUs />
    </div>
  );
};

export default Layout;
