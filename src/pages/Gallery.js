import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdClose,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Layout from "./Layout";
import { GALLERY_URL } from "../API/config";
import { GrNext, GrPrevious } from "react-icons/gr";

const Gallery = () => {
  const [eventMap, setEventmap] = useState({});
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios.get(`${GALLERY_URL}`).then((res) => {
      console.log("Gallery");
      let images = res.data.message;
      // console.log(images)
      let eventList = [];
      let map = {};
      // console.log(res.data.message);
      for (var i = 0; i < images.length; i++) {
        let element = images[i];
        // console.log(element)
        if (map[element.event]) {
          map[element.event].push(element.image_url);
        } else {
          map[element.event] = [element.image_url];
        }
      }

      for (let x in map) {
        eventList.push(x);
        console.log(eventMap[x]);
      }
      // console.log(eventList);
      setEvents(eventList);
      setEventmap(map);
    });
  }, []);

  const GalleryAccordion = ({ title = "" }) => {
    // const photos = [];
    console.log(title);
    console.log(eventMap[title]);

    const [isHidden, setIsHidden] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
      <div className="w-full lg:p-4 lg:pt-8">
        <div className="flex items-center space-x-4 mb-4">
          <button onClick={(e) => setIsHidden(!isHidden)}>
            {isHidden ? (
              <MdOutlineKeyboardArrowRight size={36} />
            ) : (
              <MdOutlineKeyboardArrowDown size={36} />
            )}
          </button>
          <h1 className="text-3xl font-semibold uppercase tracking-wide">{title}</h1>
        </div>
        {!isHidden && (
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
            {eventMap &&
              eventMap[title] &&
              eventMap[title].length > 0 &&
              eventMap[title].map((photo, index) => (
                <div
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                      if (currentIndex < eventMap[title].length - 1) {
                        setCurrentIndex(currentIndex + 1);
                      } else {
                        setCurrentIndex(0);
                      }
                    } else if (e.key === "ArrowLeft") {
                      if (currentIndex > 0) {
                        setCurrentIndex(currentIndex - 1);
                      } else {
                        setCurrentIndex(eventMap[title].length - 1);
                      }
                    }
                  }}
                >
                  <button
                    onClick={(e) => {
                      setFullScreen(!fullScreen);
                      setCurrentIndex(index);
                    }}
                  >
                    <img
                      // loading="lazy"
                      src={photo}
                      alt={photo.title}
                      className="h-36 block object-cover rounded-lg hover:scale-125 transition-all ease-in-out duration-200"
                    />
                  </button>

                  {fullScreen && (
                    <div className={`fixed top-12 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center`}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowRight") {
                          console.log("right");
                          if (currentIndex < eventMap[title].length - 1) {
                            setCurrentIndex(currentIndex + 1);
                          } else {
                            setCurrentIndex(0);
                          }
                        } else if (e.key === "ArrowLeft") {
                          if (currentIndex > 0) {
                            setCurrentIndex(currentIndex - 1);
                          } else {
                            setCurrentIndex(eventMap[title].length - 1);
                          }
                        }
                      }}
                    >
                      <h1 className="text-3xl font-semibold uppercase text-white tracking-wide pt-12 p-4">{title}</h1>

                      <div className="w-3/4 h-3/4 rounded-lg">
                        <img src={eventMap[title][currentIndex]} alt={photo.title} className="w-full h-full object-contain rounded-lg" />
                      </div>

                      <button
                        className="absolute z-20 right-0 text-white p-4 pt-12"
                        onClick={(e) => {
                          setFullScreen(false);
                        }}>
                        <MdClose size={36} />
                      </button>

                      <button className="absolute z-20 mt-24 left-0 h-3/4 p-8 group"
                        onClick={(e) => {
                          if (currentIndex > 0) {
                            setCurrentIndex(currentIndex - 1);
                          } else {
                            setCurrentIndex(eventMap[title].length - 1);
                          }
                        }}

                      >
                        <GrPrevious className="font-bold invert text-4xl group-hover:text-5xl transition-all ease-in-out duration-300" />
                      </button>

                      <button className="absolute z-20 mt-24 right-0 h-3/4 p-8 group"
                        onClick={(e) => {
                          if (currentIndex < eventMap[title].length - 1) {
                            setCurrentIndex(currentIndex + 1);
                          } else {
                            setCurrentIndex(0);
                          }
                        }}
                      >
                        <GrNext className="font-bold invert text-4xl group-hover:text-5xl transition-all ease-in-out duration-300" />
                      </button>

                      <div className="z-20 flex flex-row justify-center gap-4 absolute bottom-12 pb-2 w-full">
                        {
                          eventMap[title].map((image, curIndex) => {
                            return (
                              <button className={`h-12 rounded-md ${curIndex === currentIndex && "border-2 border-gray-300"} inline-block mx-2 cursor-pointer`}
                                onClick={() => {
                                  console.log("cur", curIndex);
                                  setCurrentIndex(curIndex);
                                }}
                              >
                                <img src={image} alt={photo.title} className="w-full h-full object-contain rounded-md" />
                              </button>
                            )
                          })
                        }
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <div className="p-8 pt-0 w-full">
        <h1 className="text-4xl uppercase text-center mt-16 w-full">
          Our <span className="font-bold">Gallery</span>
        </h1>
        {events.length > 0 &&
          events.map((event) => <GalleryAccordion title={event} />)}
        <div className="[column-width:33vw] md:[column-width:25vw] lg:[column-width:20vw] [column-gap:1rem] w-full mt-8 pr-8"></div>
      </div>
    </Layout>
  );
};

export default Gallery;
