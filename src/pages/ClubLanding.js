import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";
import axios from "axios";
import { BiShareAlt } from "react-icons/bi";
import { FEED_URL } from "../API/config";
import { toast } from "react-hot-toast";
import { fetchClubGeneralDetails } from "../API/calls";
import { useParams } from "react-router-dom";
import { GrPrevious, GrNext } from "react-icons/gr";

const ClubLanding = () => {
  const { id } = useParams();

  const BANNER_IMG =
    "https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
  const LOGO_IMG =
    "https://images.unsplash.com/photo-1617727553252-65863c156eb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";

  const [photos, setPhotos] = useState([]);
  const [generalDetails, setGeneralDetails] = useState(null);
  const [event, setEvent] = useState([]);
  const [imageIndices, setImageIndices] = useState([]);

  useEffect(() => {
    toast.promise(fetchClubGeneralDetails(id), {
      loading: "Loading...",
      success: (res) => {
        setGeneralDetails(res.data);
        console.log(res.data);
        return "Successfully loaded!";
      },
      error: (err) => {
        console.log(err);
        return "Error loading";
      },
    });
  }, []);

  useEffect(() => {
    axios
      .get("https://picsum.photos/v2/list?page=2&limit=10")
      .then((res) => {
        setPhotos(res.data.map((d) => d.download_url));
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${FEED_URL}`)
      .then((res) => {
        console.log("event", res.data);
        setEvent(res.data.filter((e) => e.user === id));
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setImageIndices(new Array(event?.length).fill(0));
  }, [event]);

  return (
    <Layout>
      <div className="w-full">
        <div
          className="h-[15rem] w-full"
          style={
            generalDetails
              ? {
                background: `url(${generalDetails.general.banner_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
              : {
                background: "#797979",
              }
          }
        ></div>
        <div className="flex items-center space-x-6 -mt-48">
          <div
            className="w-64 h-64 aspect-square rounded-full border-8 border-white ml-16"
            style={
              generalDetails
                ? {
                  background: `url(${generalDetails.general.image_url})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
                : {
                  background: "#C0BBBB",
                }
            }
          ></div>
          <div className="">
            <p className="text-white font-sans text-4xl font-bold">
              {generalDetails ? generalDetails.clubName : "Loading.."}{" "}
            </p>
            <p className="text-gray-200">Club ID: @{id}</p>
          </div>
        </div>
        <div className="flex w-full items-start gap-8 my-8 ">
          <div className="flex flex-col gap-8 w-1/4">
            <section className="bg-gray-200 rounded-lg p-8">
              <div className="text-gray-700 text-xl font-bold">About Us</div>
              <p className="text-base text-gray-500 mt-6">
                {generalDetails?.general.description ||
                  "No description provided"}
              </p>
              <p className="mt-2 text-base">
                <span className="">For More Information: &nbsp;</span>
                <Link className="text-blue-600 hover:underline font-semibold flex items-center space-x-2">
                  <AiOutlineLink />
                  <p className="">Click Here</p>
                </Link>
              </p>
            </section>

            <section className="bg-gray-200 rounded-lg p-8">
              <div className="text-gray-700 text-xl font-bold">Contact Us</div>
              <div className="mt-6">
                <p className="text-lg font-semibold">John Doe</p>
                <p className="">Phone Number: +91 96000 50000</p>
                <p className="">Email: johndoe@example.com</p>
              </div>
              <div className="mt-2">
                <p className="text-lg font-semibold">John Doe</p>
                <p className="">Phone Number: +91 96000 50000</p>
                <p className="">Email: johndoe@example.com</p>
              </div>
            </section>
          </div>
          <div className="flex flex-col gap-8 w-1/2">
            {event &&
              event.slice(0).reverse().map((ev, index) => {
                return (
                  <section className="w-full border-gray-400 border-2 rounded-lg">
                    <div className="p-6 border-b-gray-400 border-b-2">
                      <header className="flex items-center space-x-4">
                        <div className="rounded-full w-10 h-10 aspect-square bg-gray-600"></div>
                        <div className="">
                          <div className="flex items-center space-x-1">
                            <p className="text-lg font-semibold">{ev.eventName}</p>
                            {/* <p className="">:</p>
                        <p className=" text-gray-500">1d</p> */}
                          </div>
                          <div className="text-base text-gray-500">
                            {generalDetails ? generalDetails.clubName : "Loading.."}
                          </div>
                        </div>
                      </header>
                      <p className="mt-4">{ev.description}</p>
                    </div>
                    {
                      ev.images && ev.images.length > 0 && (
                        <div>
                          <div className="w-full h-[32rem] relative group">
                            <button
                              className="bg-gradient-to-r from-gray-900 opacity-0 group-hover:opacity-50 hover:opacity-70 transition-all ease-in-out duration-500 p-2 pr-12 absolute z-10 h-full group-one"
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
          <div className="flex flex-col gap-8 w-1/4">
            <section className="bg-gray-200 rounded-lg p-8">
              <p className="text-lg text-gray-700 font-semibold">Photos</p>
              <div className="grid grid-cols-3 gap-1 mt-6">
                {photos.map((p, idx) => (
                  <div
                    style={{
                      background: `url(${p})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="aspect-square"
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// onst Top

export default ClubLanding;
