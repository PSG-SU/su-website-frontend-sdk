import React from "react";

import { IoLocationSharp, IoLogoYoutube } from "react-icons/io5";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { MdPhone } from "react-icons/md";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

// Contact Us

const ContactUs = ({ homePage = false }) => {
  return (
    <React.Fragment>
      <section
        id="section9"
        className={`w-screen bg-black px-[calc(100vw/22)] pt-16 pb-8 font-poppins ${!homePage && "mt-8"}`}
      >
        <h1 className="text-[2.75rem] text-white font-semibold pb-6 text-center lg:text-left">Contact Us</h1>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 text-white mt-4">
          <div className="space-y-6 w-full lg:w-[30%]">
            <button
              className="flex items-center space-x-4 text-gray-300 hover:text-white transition-all ease-in-out duration-300"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/students_union_psgtech/",
                  "_blank"
                )
              }
            >
              <BsInstagram size={24} />
              <p className="text-lg">@students_union_psgtech</p>
            </button>
            <button
              className="flex items-center space-x-4 text-gray-300 hover:text-white transition-all ease-in-out duration-300"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/company/studentsunion-psgtech/",
                  "_blank"
                )
              }
            >
              <BsLinkedin size={24} />
              <p className="text-lg">Students Union</p>
            </button>
            <button
              className="flex items-center space-x-4 text-gray-300 hover:text-white transition-all ease-in-out duration-300"
              onClick={() => window.open("mailto:studentsunion@psgtech.ac.in", "_blank")}
            >
              <SiGmail size={24} />
              <p className="text-lg">studentsunion@psgtech.ac.in</p>
            </button>
            <button
              className="flex items-center space-x-4 text-gray-300 hover:text-white transition-all ease-in-out duration-300"
              onClick={() => window.open("https://www.youtube.com/c/StudentsUnionPSGTech", "_blank")}
            >
              <IoLogoYoutube size={24} />
              <p className="text-lg">Students Union PSG Tech</p>
            </button>
          </div>

          <div className="w-full lg:w-[40%] space-y-6">
            <button
              className="flex items-center space-x-4 text-gray-300 hover:text-white transition-all ease-in-out duration-300"
              onClick={() =>
                window.open("https://linktr.ee/su.psgtech", "_blank")
              }
            >
              <Icon icon="simple-icons:linktree" className="text-2xl" />
              <p className="text-lg">Linktree</p>
            </button>
            <button
              className="flex items-center space-x-4 text-gray-300 hover:text-white transition-all ease-in-out duration-300"
              onClick={() => window.open("https://goo.gl/maps/vC8ETQHr43EvvZmz6", "_blank")}
            >
              <IoLocationSharp size={24} className="w-8 lg:w-auto" />
              <p className="text-lg text-left">F Block 2nd Floor, PSG College of Technology</p>
            </button>
            <button
              className="flex items-center space-x-4 text-gray-300 hover:text-white transition-all ease-in-out duration-300"
              onClick={() => window.open("tel:+91 422 257 5000", "_blank")}
            >
              <MdPhone size={24} />
              <p className="text-lg">+91 422 257 5000</p>
            </button>
          </div>

          <div className="w-full lg:w-[30%]">
            <PSGMap />
          </div>
        </div>

        <div className="mt-16 py-2 w-full text-center lg:text-left ">
          <h1 className="font-semibold text-white text-xl">Developed By</h1>
          <div className="flex flex-col lg:flex-row mt-6 text-white w-full gap-6 lg:gap-8">
            <div className="space-y-2 lg:w-[30%]">
              <p className="text-lg">Jeyam Palaniappan</p>
              <a className="hover:text-gray-400 text-sm" href="https://github.com/jeyam03/" target="_blank" rel="noreferrer">https://github.com/jeyam03/</a>
            </div>
            <div className="space-y-2 lg:w-[30%]">
              <p className="text-lg">T G Ashwin Kumar</p>
              <a className="hover:text-gray-400 text-sm" href="https://github.com/tgashwinkumar/" target="_blank" rel="noreferrer">https://github.com/tgashwinkumar/</a>
            </div>
          </div>
        </div>

        <div className="h-[0.1rem] bg-[#4D4D4D] w-full mt-16 mb-8"></div>

        <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 pb-12 lg:pb-0 items-center justify-between">
          <div className="flex flex-row space-x-4 items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/PSG_College_of_Technology_logo.png/220px-PSG_College_of_Technology_logo.png"
              alt="logo"
              className={`h-auto w-8`}
              style={{ filter: "invert(1)" }}
            />
            <h1
              className={`text-2xl font-poppins font-[500] text-gray-300`}
            >
              Students Union
            </h1>
          </div>
          <p className="text-gray-300 font-poppins">
            © NMC {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>

      </section>
    </React.Fragment>
  );
};

const PSGMap = () => {
  return (
    <iframe
      title="map"
      style={{ border: "0", width: "100%", height: "100%", borderRadius: "8px" }}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1857162154975!2d76.99993861416318!3d11.024688692153381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8582f1435fa59%3A0x137d95bfd8909293!2sPSG+College+Of+Technology!5e0!3m2!1sen!2sin!4v1545481997242"
      frameborder="0"
      allowfullscreen=""
    ></iframe>
  );
};

export default ContactUs;
