import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiBars3BottomRight } from "react-icons/hi2";
import { IoCloseOutline } from "react-icons/io5";
import { HashLink } from "react-router-hash-link";

const Navbar = ({ canScrollAdjust = false }) => {
  const [onTop, setOnTop] = useState(canScrollAdjust);
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  const changeOnTop = () => {
    // console.log(window);
    if (!canScrollAdjust) return;
    if (window.scrollY >= 100) {
      setOnTop(false);
    } else {
      setOnTop(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeOnTop, false);
  });

  return (
    <nav className="fixed z-50 h-auto w-full">
      <div
        className={`flex justify-between items-center  w-full ${onTop
          ? "p-4 lg:p-8 bg-gradient-to-b from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.5)]"
          : "p-3 lg:p-4 bg-gradient-to-b from-[rgba(0,0,0,1)] to-[rgba(0,0,0,1)]"
          } transition-all ${navOpen && "bg-black bg-opacity-90"}`}
      >
        <button className="flex items-center space-x-4"
          onClick={(e) => { navigate(`/`) }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/PSG_College_of_Technology_logo.png/220px-PSG_College_of_Technology_logo.png"
            alt="logo"
            className={`h-auto ${onTop ? "w-8 lg:w-12" : "w-6"
              } transition-all ease-in-out`}
            style={{ filter: "invert(1)" }}
          />
          <div className="space-y-0.5">
            <h1
              className={`${onTop ? "text-xl lg:text-3xl" : "text-xl"
                } font-poppins font-[500] text-white text-left`}
            >
              Students Union
            </h1>
            <h2
              className={`text-xs lg:text-sm text-left font-poppins text-white ${!onTop && "hidden"
                }`}
            >
              PSG College of Technology
            </h2>
          </div>
        </button>
        <div className="items-center space-x-6 text-sm hidden lg:flex">
          <NavItem text="SU By Law" to="/by-law" />
          <NavItem text="Clubs" to="/clubs" />
          <NavItem text="Associations" to="/associations" />
          <NavItem text="Schemes & Wings" to="/schemes-and-wings" />
          <NavItem text="SU Feed" to="/feed" />
          <NavItem text="Gallery" to="/gallery" />
          <NavItem text="Our Team" to="/team" />
          <NavItem text="Contact Us" to="/#contact-us" />
        </div>
        <div className="lg:hidden">
          <button
            className="text-white"
            onClick={() => {
              setNavOpen(!navOpen);
            }}
          >
            {navOpen ? <IoCloseOutline size={32} /> : <HiBars3BottomRight size={32} />}
          </button>
        </div>
      </div>

      {navOpen && (
        <div className={`w-screen h-screen bg-black bg-opacity-90 flex flex-col justify-center items-center space-y-4`}>
          <NavItem text="SU By Law" to="/by-law" />
          <NavItem text="Clubs" to="/clubs" />
          <NavItem text="Associations" to="/associations" />
          <NavItem text="Schemes & Wings" to="/schemes-and-wings" />
          <NavItem text="SU Feed" to="/feed" />
          <NavItem text="Gallery" to="/gallery" />
          <NavItem text="Our Team" to="/team" />
          <NavItem text="Contact Us" to="/#contact-us" />
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ text, to = "/" }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="font-sans uppercase">
      <HashLink
        smooth
        scroll={(el) => el.scrollIntoView({ behavior: "smooth" })}
        to={to}
        className="text-white"
        onMouseEnter={(e) => setIsHover(true)}
        onMouseLeave={(e) => setIsHover(false)}
      >
        <p className="">{text}</p>
        <div className="mt-1 h-[1px] flex justify-center items-center">
          <div
            className={`h-full ${isHover ? "w-[70%]" : "w-0"
              } transition-all bg-white origin-center`}
          ></div>
        </div>
      </HashLink>
    </div>
  );
};

export default Navbar;
