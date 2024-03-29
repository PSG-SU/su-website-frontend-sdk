import Navbar from "../components/NavBar.js";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { MdOutlineGraphicEq } from "react-icons/md";
import { FiSun } from "react-icons/fi";
import { BsTrophy } from "react-icons/bs";
import ContactUs from "../components/ContactUs.js";
import Announcements from "../components/Announcements.js";
import { ABOUT_URL, CLUB_URL } from "../API/config";
import React, { useEffect, useState } from "react";
import axios from "axios";

// const COVER_IMAGE_URL =
//   "https://images.unsplash.com/photo-1665780993894-ceb3a89bc5c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

const Landing = () => {
  const [details, setDetails] = useState({});
  const [numberOfClubs, setNumberOfClubs] = useState(0);
  const [numberOfAssociations, setNumberOfAssociations] = useState(0);

  useEffect(() => {
    axios.get(`${ABOUT_URL}`).then((res) => {
      setDetails(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${CLUB_URL}`).then((res) => {
      setNumberOfClubs(res.data.filter((club) => club.category === "Clubs").length);
      setNumberOfAssociations(res.data.filter((club) => club.category === "Associations").length);
    });
  })

  return (
    <main className="w-screen overflow-x-hidden bg-white">
      <Navbar canScrollAdjust />
      <HeroCover
        h1={"Be the Change."}
        h2={details.tagline}
      />
      <div className="flex flex-col-reverse lg:flex-row justify-start items-stretch w-full">
        <div className="w-full lg:w-3/4">
          <AboutUs />
          <div className="lg:grid lg:grid-rows-1 lg:grid-cols-3 lg:items-stretch text-justify">
            <IconBackgroundSection
              title="Our Mission"
              icon={<MdOutlineGraphicEq />}
              body={details.ourMission}
            />
            <IconBackgroundSection
              title="Our Plan"
              icon={<FiSun />}
              body={details.ourPlan}
            />
            <IconBackgroundSection
              title="Our Vision"
              icon={<BsTrophy />}
              body={details.ourVision}
            />
          </div>
          <AboutCollege />
        </div>
        <div className="w-full lg:w-1/4 bg-indigo-900 py-8 space-y-20">
          <StatSection
            stats={[
              { num: numberOfClubs, tagline: "Clubs" },
              { num: numberOfAssociations, tagline: "Associations" },
              { num: details.numberOfSchemes, tagline: "Schemes" },
              { num: details.numberOfWings, tagline: "Wings" },
            ]}
          />
          <Announcements />
        </div>
      </div>
      <div id="contact-us">
        <ContactUs homePage={true} />
      </div>
    </main>
  );
};

const HeroCover = ({ h1, h2 }) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((index) => (index + 1) % 6);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <img
        src={`assets/Landing/${imgIndex}.jpg`}
        alt="cover"
        className="w-full h-[80vh] object-cover filter brightness-50"
      />
      <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8">
        <div className="text-5xl lg:text-7xl uppercase font-sans text-transparent font-bold select-none [-webkit-text-stroke-width:1px] lg:[-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:#fff]">
          <p className="">{h1}</p>
        </div>
        <div className="flex space-x-4 lg:space-x-6 mt-4 w-full">
          <div className="h-full flex items-start">
            <FaQuoteLeft size={32} className="text-white hidden lg:block" />
            <FaQuoteLeft size={24} className="text-white lg:hidden" />
          </div>
          <div className="flex items-end pr-4 lg:pr-0">
            <p className="text-white lg:text-lg w-full lg:w-[60%] font-serif">
              {h2}
            </p>
            <div className="lg:-ml-3">
              <FaQuoteRight size={32} className="text-white hidden lg:block" />
              <FaQuoteRight size={24} className="text-white lg:hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  const [aboutUsContent, setAboutUsContent] = useState("");

  useEffect(() => {
    axios.get(`${ABOUT_URL}`).then((res) => {
      setAboutUsContent(res.data.content);
    });
  }, []);

  const IMAGE = "/assets/Landing/about.jpg";

  return (
    <div className="w-full p-8 lg:pr-0 flex items-stretch">
      <div className="w-full lg:w-2/3 lg:mr-8 py-6">
        <h2 className="text-2xl uppercase font-sans tracking-wider">
          About Us
        </h2>
        <h1 className="text-5xl font-bold uppercase font-sans tracking-wider">
          Students Union
        </h1>
        <div
          className="w-full my-4 h-[200px] lg:hidden"
          style={{
            background: `url(${IMAGE})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <p className="font-sans text-sm mt-8 tracking-wide text-justify">
          {aboutUsContent}
        </p>
      </div>
      <div
        className="w-1/3 hidden lg:block"
        style={{
          background: `url(${IMAGE})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
};

const AboutCollege = () => {
  const [aboutCollege, setAboutCollege] = useState("");

  useEffect(() => {
    axios.get(`${ABOUT_URL}`).then((res) => {
      setAboutCollege(res.data.aboutCollege);
    });
  }, []);

  const IMAGE = "https://www.psgtech.edu/images/slider/slider1.jpg";
  return (
    <div className="w-full p-8 lg:pr-0 flex items-stretch">
      <div className="w-full lg:w-2/3 lg:mr-8 py-6">
        <h2 className="text-2xl uppercase font-sans tracking-wider">
          About College
        </h2>
        <h1 className="text-4xl lg:text-5xl font-bold uppercase font-sans tracking-wider">
          PSG College of Technology
        </h1>
        <div
          className="w-full my-4 h-[200px] lg:hidden"
          style={{
            background: `url(${IMAGE})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <p className="font-sans text-sm mt-8 tracking-wide text-justify">
          {aboutCollege}
        </p>
      </div>
      <div
        className="w-1/3 hidden lg:block"
        style={{
          background: `url(${IMAGE})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
};

const IconBackgroundSection = ({ title, icon, body }) => {
  return (
    <div
      className="bg-emerald-50 p-8 w-full relative"
      style={{ clipPath: "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)" }}
    >
      {React.cloneElement(icon, {
        className:
          "absolute -top-0 -right-4 text-4xl text-emerald-500 opacity-25",
        size: 156,
      })}
      <div className="p-3 rounded-full bg-emerald-800 text-white w-fit shadow-lg ">
        {React.cloneElement(icon, {

          size: 32,
        })}
      </div>
      <h1 className="mt-4 font-serif text-xl font-semibold text-emerald-700">
        {title}
      </h1>
      <p className="mt-4 font-sans text-emerald-600 text-sm">{body}</p>
    </div>
  );
};

const StatSection = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-x-0 lg:gap-y-8 px-8 pt-4">
      {stats.map((stat, index) => (
        <div className="text-white flex flex-col items-center space-y-1">
          <h1 className="text-6xl font-sans font-bold">{stat.num}</h1>
          <h2 className="font-serif text-sm tracking-wider">{stat.tagline}</h2>
        </div>
      ))}
    </div>
  );
};

export default Landing;
