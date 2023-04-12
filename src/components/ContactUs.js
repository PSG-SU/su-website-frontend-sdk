import React from "react";

import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { BsTelephone } from "react-icons/bs";

const ContactUs = () => {
  return (
    <footer className="bg-black w-full p-8 pb-[2.25rem] mt-4">
      <h1 className="text-white font-sans tracking-wider text-4xl uppercase font-semibold">
        Contact Us
      </h1>
      <div className="flex gap-y-6 lg:gap-y-0 lg:justify-between lg:pr-20 flex-col lg:flex-row mt-4">
        <div className="w-1/2">
          <PSGMap />
        </div>
        <div className="flex flex-col gap-y-8">
          <div className="flex gap-x-8 items-center">
            <HiOutlineMail className="text-white text-3xl" />
            <div className="flex flex-col">
              <h1 className="text-gray-400 font-sans tracking-wider text-lg font-semibold">
                Email
              </h1>
              <a
                href="mailto:studentsunion@psgtech.ac.in"
                className="text-white font-sans tracking-wider text-lg font-semibold"
              >
                studentsunion@psgtech.ac.in
              </a>
            </div>
          </div>

          <div className="flex gap-x-8 items-center">
            <BsTelephone className="text-white text-3xl" />
            <div className="flex flex-col">
              <h1 className="text-gray-400 font-sans tracking-wider text-lg font-semibold">
                Phone
              </h1>
              <a
                href="tel:+91 422 257 5000"
                className="text-white font-sans tracking-wider text-lg font-semibold"
              >
                +91 422 257 5000
              </a>
            </div>
          </div>

          <div className="flex gap-x-8 items-center">
            <IoLocationOutline className="text-white text-3xl" />
            <div className="flex flex-col">
              <h1 className="text-gray-400 font-sans tracking-wider text-lg font-semibold">
                Address
              </h1>
              <a
                href="https://goo.gl/maps/vC8ETQHr43EvvZmz6"
                className="text-white font-sans tracking-wider text-lg font-semibold"
              >
                F Block 2nd Floor, PSG College of Technology, Peelamedu, <br />
                Coimbatore, Tamil Nadu, 641004
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

const PSGMap = () => {
  return (
    <iframe
      title="map"
      style={{ border: "0", width: "100%", height: "270px" }}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1857162154975!2d76.99993861416318!3d11.024688692153381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8582f1435fa59%3A0x137d95bfd8909293!2sPSG+College+Of+Technology!5e0!3m2!1sen!2sin!4v1545481997242"
      frameborder="0"
      allowfullscreen=""
    ></iframe>
  );
};

export default ContactUs;
