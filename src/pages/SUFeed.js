import React, { useContext, useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import Layout from "./Layout.js";
import { BiShareAlt } from "react-icons/bi";
import axios from "axios";
import { setDashPattern } from "pdf-lib";
import { CLUB_URL, FEED_URL, SPOTLIGHT_URL } from "../API/config";
import { Link, useNavigate } from "react-router-dom";
import { GrPrevious, GrNext } from "react-icons/gr";

const Spotlight = ({ title, description, link }) => {
  return (
    <div className="text-ellipsis overflow-hidden m-4 border-b-2 pb-4 border-b-slate-600">
      <div className="flex">
        <div className="text-gray-600 backdrop font-bold text-lg pl-2 mt-2">{title}</div>
        {/* <div className="flex-1 w-full"></div> */}
        <button className="text-gray-600 mt-2 ml-24 bg-gray-300 px-2 rounded-lg">
          Read More..
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
  const [event, setEvent] = useState();
  const [spotlight, setSpotlight] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [imageIndices, setImageIndices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${FEED_URL}`)
      .then((res) => {
        console.log(res.data);
        setEvent(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`${CLUB_URL}`, {}).then((res) => {
      setClubs(res.data);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`${SPOTLIGHT_URL}`).then((res) => {
      console.log(res.data);
      setSpotlight(res.data);
    });
  }, []);

  useEffect(() => {
    setImageIndices(new Array(event?.length).fill(0));
  }, [event]);

  console.log(event);

  return (
    <Layout>
      <h1 className="text-4xl uppercase text-center mt-16 w-full">
        SU <span className="font-bold">Feed</span>
      </h1>
      <div className="flex flex-col lg:flex-row mt-8 w-full lg:space-x-8 px-8">
        <div className="w-full lg:w-1/4 font-sans overflow-x-hidden">
          <h2 className="font-sans text-2xl">Alerts</h2>
          <p className="text-gray-400">No featured posts yet.</p>
        </div>
        <div className="w-full lg:w-1/2 font-sans overflow-x-hidden space-y-6">
          <section className="bg-gray-200 text-gray-600 border-2 border-dashed border-gray-400 rounded-lg p-8 w-full flex space-x-4 justify-start items-start">
            <FiAlertCircle size={48} />
            <p className="">
              This is a compilation of all the events, alerts, circulars passed
              within the institute. Students are adviced to check this feed
              frequently for updates on various information.
            </p>
          </section>
          {event &&
            event.slice(0).reverse().map((ev, index) => {
              return (
                <section className="w-full border-gray-400 border-2 rounded-lg">
                  <div className="p-6 border-b-gray-400 border-b-2">
                    <header className="flex items-center space-x-4">
                      <button className="rounded-full w-10 h-10 aspect-square bg-gray-600" onClick={(e) => { navigate(`/club/${ev.user}`) }}></button>
                      <button className="" onClick={(e) => { navigate(`/club/${ev.user}`) }}>
                        <div className="flex items-center space-x-1">
                          <p className="text-lg font-semibold">{ev.eventName}</p>
                          {/* <p className="">:</p>
                        <p className=" text-gray-500">1d</p> */}
                        </div>
                        <div className="text-base text-gray-500">
                          {clubs.filter((club) => club.clubId === ev.user)[0]?.clubName}
                        </div>
                      </button>
                    </header>
                    <p className="mt-4">{ev.description}</p>
                  </div>
                  {
                    ev.images && ev.images.length > 0 && (
                      <div>
                        <div className="w-full h-[32rem] relative group">
                          <button
                            className="bg-gradient-to-r from-[rgb(0,0,0,0.5)] to-[rgba(0,0,0,0)] opacity-0 group-hover:opacity-90 transition-all ease-in-out duration-500 p-2 pr-12 absolute z-10 h-full group-one"
                            onClick={() => {
                              if (imageIndices[index] > 0) {
                                setImageIndices(imageIndices.map((val, i) => i === index ? val - 1 : val));
                              } else {
                                setImageIndices(imageIndices.map((val, i) => i === index ? ev.images.length - 1 : val));
                              }
                            }}
                          >
                            <GrPrevious className="font-bold invert text-3xl group-one-hover:text-4xl transition-all ease-in-out duration-300" />
                          </button>
                          {
                            ev.images?.map((image, curIndex) => {
                              return (
                                <div
                                  className={`w-full h-[32rem] absolute top-0 left-0 right-0 transition-all duration-100 ease-linear ${curIndex === imageIndices[index] ? "opacity-100" : "opacity-0"
                                    }`}
                                  style={{
                                    background: `url(${ev.images[curIndex]})`,
                                    backgroundPosition: "50% 50%  ",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "contain",
                                  }}
                                ></div>
                              )
                            })
                          }
                          <button
                            className="bg-gradient-to-l from-gray-900 opacity-0 group-hover:opacity-50 hover:opacity-70 transition-all ease-in-out duration-500 p-2 pl-12 absolute right-0 z-10 h-full group-one"
                            onClick={() => {
                              if (imageIndices[index] < ev.images.length - 1) {
                                setImageIndices(imageIndices.map((val, i) => i === index ? val + 1 : val));
                              } else {
                                setImageIndices(imageIndices.map((val, i) => i === index ? 0 : val));
                              }
                            }}
                          >
                            <GrNext className="font-bold invert text-3xl group-one-hover:text-4xl transition-all ease-in-out duration-300" />
                          </button>
                        </div>

                        <div className="w-full py-4 flex items-center justify-between">
                          <button
                            className="group w-10 h-10 pl-4"
                            onClick={() => {
                              if (imageIndices[index] > 0) {
                                setImageIndices(imageIndices.map((val, i) => i === index ? val - 1 : val));
                              } else {
                                setImageIndices(imageIndices.map((val, i) => i === index ? ev.images.length - 1 : val));
                              }
                            }}
                          >
                            <GrPrevious className="font-bold text-3xl group-hover:text-4xl transition-all ease-in-out duration-300" />
                          </button>

                          <div>
                            {
                              ev.images?.map((image, curIndex) => {
                                return (
                                  <button className={`w-3 h-3 rounded-full border-2 border-gray-600 ${curIndex === imageIndices[index] && "bg-gray-600"} inline-block mx-2 cursor-pointer`}
                                    onClick={() => {
                                      setImageIndices(imageIndices.map((val, i) => i === index ? curIndex : val));
                                    }}
                                  ></button>
                                )
                              })
                            }
                          </div>

                          <button
                            className="group w-10 h-10 pr-4"
                            onClick={() => {
                              if (imageIndices[index] < ev.images.length - 1) {
                                setImageIndices(imageIndices.map((val, i) => i === index ? val + 1 : val));
                              } else {
                                setImageIndices(imageIndices.map((val, i) => i === index ? 0 : val));
                              }
                            }}
                          >
                            <GrNext className="font-bold text-3xl group-hover:text-4xl transition-all ease-in-out duration-300" />
                          </button>
                        </div>
                      </div>
                    )}
                  <button className="w-full flex p-6 space-x-4"
                    onClick={() => {
                      window.open("https://" + ev.registrationLink, "_blank");
                    }}
                  >
                    <div className="flex-1 bg-emerald-600 hover:bg-emerald-800 w-full rounded-full px-6 py-2 text-center text-lg text-white font-semibold">
                      Register
                    </div>
                    <BiShareAlt
                      size={36}
                      className="text-gray-600 hover:text-gray-700"
                    />
                  </button>
                </section>
              )
            })}
        </div>
        <div className="w-full lg:w-1/4 font-sans overflow-x-hidden">
          <h2 className="font-sans text-2xl">Spotlights</h2>
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
