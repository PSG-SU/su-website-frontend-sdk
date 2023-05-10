import React, { useContext, useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import Layout from "./Layout.js";
import axios from "axios";
import { setDashPattern } from "pdf-lib";
import { SPOTLIGHT_URL } from "../API/config";
import { Link } from "react-router-dom";
import Feed from "../components/Feed.js";

const Spotlight = ({ title, description, link }) => {
  return (
    <div className="text-ellipsis w-full overflow-hidden m-4 border-b-2 pb-4 border-b-slate-600">
      <div className="flex justify-between">
        <div className="text-gray-600 backdrop font-bold text-lg pl-2 mt-2">{title}</div>
        {/* <div className="flex-1 w-full"></div> */}
        <button className="text-gray-600 mt-2 bg-gray-300 mr-8 px-2 rounded-lg">
          Read More ...
          <Link
            className="text-gray-600  font-bold text-lg"
            to={link}
          />
        </button>
      </div>
      <div className="text-gray-600 mt-4 pl-2">{description}</div>
    </div>
  );
};

const SUFeed = () => {
  const [spotlight, setSpotlight] = useState([]);

  useEffect(() => {
    axios.get(`${SPOTLIGHT_URL}`).then((res) => {
      console.log(res.data);
      setSpotlight(res.data);
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl uppercase text-center mt-16 w-full">
        SU <span className="font-bold">Feed</span>
      </h1>
      <div className="flex flex-col lg:flex-row mt-8 w-full space-y-8 lg:space-y-0 lg:space-x-8 px-6 lg:px-8">
        <div className="w-full lg:w-1/4 font-sans overflow-x-hidden">
          <h2 className="font-sans text-2xl text-center lg:text-left">Alerts</h2>
          <p className="text-gray-400 text-center lg:text-left">No featured posts yet.</p>
        </div>
        <div className="w-full lg:w-1/2 font-sans overflow-x-hidden space-y-6 pt-8 lg:pt-0">
          <section className="bg-gray-200 text-gray-600 border-2 border-dashed border-gray-400 rounded-lg p-8 w-full flex space-x-4 justify-center items-center">
            <FiAlertCircle size={56} className="hidden lg:block" />
            <p className="">
              This is a compilation of all the events, alerts, circulars passed
              within the institute. Students are adviced to check this feed
              frequently for updates on various information.
            </p>
          </section>

          <Feed />
        </div>
        <div className="w-full lg:w-1/4 font-sans overflow-x-hidden pt-8 lg:pt-0">
          <h2 className="font-sans text-2xl text-center lg:text-left">Spotlights</h2>
          <div className="w-full h-screen bg-gray-200 rounded-lg mt-4">
            <div className="w-full h-full bg-gray-200 rounded-lg flex flex-col justify-start items-start">
              {spotlight.map((spotlight, index) => (
                <Spotlight
                  title={spotlight.title}
                  description={spotlight.description}
                  link={spotlight.url}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SUFeed;
