import Navbar from "../components/NavBar.js";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { MdOutlineGraphicEq } from "react-icons/md";
import { FiSun } from "react-icons/fi";
import { BsTrophy } from "react-icons/bs";
import { BiLink } from "react-icons/bi";
import ContactUs from "../components/ContactUs.js";
import { ANNOUNCEMENT_URL, ABOUT_URL, CLUB_URL } from "../API/config";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const COVER_IMAGE_URL =
  "https://images.unsplash.com/photo-1665780993894-ceb3a89bc5c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";

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
        image={COVER_IMAGE_URL}
        h1={"Be the Change."}
        h2={details.tagline}
      />
      <div className="flex flex-col-reverse lg:flex-row justify-start items-stretch w-full">
        <div className="w-full lg:w-3/4">
          <AboutUs />
          <div className="lg:grid lg:grid-rows-1 lg:grid-cols-3 lg:items-stretch">
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

const HeroCover = ({ image, h1, h2 }) => {
  return (
    <div
      className="pt-32 h-[80vh] bg-red-300 p-4 lg:p-8 flex justify-start items-end"
      style={{
        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${image}})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="">
        <div className="text-5xl lg:text-7xl uppercase font-sans text-transparent font-bold select-none [-webkit-text-stroke-width:1px] lg:[-webkit-text-stroke-width:2px] [-webkit-text-stroke-color:#fff]">
          <p className="">{h1}</p>
        </div>
        <div className="flex space-x-6 mt-4 w-full">
          <div className="h-full flex items-start">
            <FaQuoteLeft size={32} className="text-white hidden lg:block" />
            <FaQuoteLeft size={24} className="text-white lg:hidden" />
          </div>
          <div className="flex items-end">
            <p className="text-white lg:text-lg w-full lg:w-[60%] font-serif">
              {h2}
            </p>
            <div className="-ml-3">
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

  const IMAGE =
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80";
  return (
    <div className="w-full p-8 lg:pr-0 flex items-stretch">
      <div className="w-full lg:w-2/3 lg:mr-8 py-6">
        <h2 className="text-2xl uppercase font-sans tracking-wider">
          About Us
        </h2>
        <h1 className="text-5xl font-bold uppercase font-sans tracking-wider">
          Student's Union
        </h1>
        <div
          className="w-full my-4 h-[200px] lg:hidden"
          style={{
            background: `url(${IMAGE})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <p className="font-sans text-sm mt-8 tracking-wide text-justify lg:text-left">
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
        <p className="font-sans text-sm mt-8 tracking-wide text-justify lg:text-left">
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
          "absolute -top-8 -right-8 text-4xl text-emerald-500 opacity-25",
        size: 196,
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
    <div className="grid grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-x-0 lg:gap-y-8 px-8">
      {stats.map((stat, index) => (
        <div className="text-white flex flex-col items-center space-y-1">
          <h1 className="text-6xl font-sans font-bold">{stat.num}</h1>
          <h2 className="font-serif text-sm tracking-wider">{stat.tagline}</h2>
        </div>
      ))}
    </div>
  );
};

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  const sendrequest = async () => {
    const res = await axios.get(`${ANNOUNCEMENT_URL}`).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    sendrequest().then((data) => setAnnouncements(data));
  }, []);

  // const dummyAnnouncements = [
  //   {
  //     type: "Event",
  //     title: "ICAARS 2022",
  //     date: "21st - 23rd January 2022",
  //     body: "The First and Second International Conference on Advancements in Automation, Robotics and Sensing was hosted in Coimbatore, India by the Department of Robotics and Automation Engineering, PSG College of Technology",
  //     link: "https://www.psgtech.edu/icaars2022/",
  //   },
  //   {
  //     type: "Event",
  //     title: "INTRAMS 2022",
  //     date: "21st - 23rd January 2022",
  //     body: "Cultural events are events designed for entertainment and enjoyment of a more or less wide audience.",
  //     link: "https://www.psgtech.edu/intrams2022/",
  //   },
  //   {
  //     type: "Classified",
  //     title: "Need volunteers for Republic Day",
  //     date: "25th January 2022",
  //     body: "Volunteers are needed for Republic Day celebrations at PSG College of Technology",
  //     link: "https://www.psgtech.edu/",
  //   },
  // ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-2xl font-serif text-white">Announcements</h1>
        <div className="w-[70%] h-[1px] mt-1 bg-white"></div>
      </div>
      <div className="flex flex-col space-y-6 w-full py-4 h-[650px] overflow-y-auto">
        {announcements.map((announcements, index) => (
          <div className="px-8">
            <p className="text-sm text-gray-300 italic ">{announcements.type}</p>
            <div className="flex w-full">
              <h1 className=" text-white font-bold font-sans w-2/3">
                {announcements.title}
              </h1>
              <p className="text-xs text-gray-300 text-right whitespace-nowrap">
                {announcements.date}
              </p>
            </div>
            <div className="flex w-full mt-1">
              <p className="text-xs text-gray-100 text-ellipsis [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box] overflow-hidden">
                {announcements.body}
              </p>
              <a href={announcements.link}>
                <BiLink
                  size={24}
                  className="ml-4 text-white hover:text-gray-400"
                />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Landing;
