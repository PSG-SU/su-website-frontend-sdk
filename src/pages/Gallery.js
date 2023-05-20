import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdClose,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
  MdMotionPhotosPaused,
  MdOutlinePlayCircleOutline
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

  const GalleryAccordion = ({ title = "", index }) => {
    // const photos = [];
    console.log(title);
    console.log(eventMap[title]);

    const [isHidden, setIsHidden] = useState(index >= 2);
    const [fullScreen, setFullScreen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slideShow, setSlideShow] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      if (slideShow) {
        const interval = setInterval(() => {
          if (currentIndex < eventMap[title].length - 1) {
            setCurrentIndex(currentIndex + 1);
          } else {
            setFullScreen(false);
            setSlideShow(false);
            setProgress(0);
          }
        }, 4000);
        return () => clearInterval(interval);
      }
    }, [slideShow, currentIndex]);

    useEffect(() => {
      if (slideShow) {
        const interval = setInterval(() => {
          if (progress < 100) {
            setProgress(progress + 1);
          } else {
            setProgress(0);
          }
        }, 27.5);
        return () => clearInterval(interval);
      }
    }, [slideShow, progress, currentIndex]);

    return (
      <div className={`w-full lg:p-4 ${isHidden ? "lg:pb-0" : "lg:pb-8"}`}>
        <button onClick={(e) => setIsHidden(!isHidden)} className="flex items-center space-x-4 mb-4">
          {isHidden ? (
            <MdOutlineKeyboardArrowRight size={36} />
          ) : (
            <MdOutlineKeyboardArrowDown size={36} />
          )}
          <h1 className={`text-3xl font-semibold uppercase tracking-wide px-4 py-2 ${!isHidden && "bg-gray-200 rounded-xl"}`}>{title}</h1>
        </button>
        {!isHidden && (
          <div className="flex flex-wrap gap-2">
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
                    } else if (e.key === "Escape" || e.key === "Esc") {
                      setFullScreen(false);
                      setSlideShow(false);
                      setProgress(0);
                    }
                  }}
                >
                  <button
                    onClick={(e) => {
                      setFullScreen(!fullScreen);
                      setCurrentIndex(index);
                    }}
                    className="w-48 h-36"
                  >
                    <img
                      // loading="lazy"
                      src={photo}
                      alt={photo.title}
                      className="w-full h-full block object-cover rounded-lg transition-all ease-in-out duration-200 hover:scale-105"
                    />
                  </button>

                  {fullScreen && (
                    <div className={`fixed top-12 left-0 w-full h-full bg-black flex flex-col items-center justify-center`}
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
                      <button
                        className="absolute top-0 left-0 w-full h-full"
                        onClick={(e) => { setFullScreen(false); setSlideShow(false); setProgress(0); }}
                      ></button>

                      <p className="z-10 absolute top-0 left-4 text-gray-300 pt-12 p-4">{currentIndex + 1}/{eventMap[title].length}</p>
                      <h1 className="z-10 absolute top-0 text-3xl font-semibold uppercase text-white tracking-wide pt-12 p-4">{title}</h1>

                      <div className="z-10 max-w-[calc(80vw)] max-h-[calc(70vh)] rounded-lg">
                        <img src={eventMap[title][currentIndex]} alt={photo.title} className={`w-full h-full object-contain rounded-lg`}
                        />
                      </div>

                      <button
                        className="absolute z-20 top-0 right-16 text-white p-4 pt-12"
                        onClick={(e) => {
                          setSlideShow(!slideShow);
                          setProgress(0);
                        }}>
                        {slideShow ? <MdMotionPhotosPaused size={28} /> : <MdOutlinePlayCircleOutline size={28} />}
                      </button>

                      {slideShow && (
                        <div className="absolute top-0 left-0 mt-4 h-0.5 z-20 bg-gray-600" style={{ width: `${progress}%`, }}></div>
                      )}

                      <button
                        className="absolute z-20 top-0 right-4 text-white p-4 pt-12"
                        onClick={(e) => {
                          setFullScreen(false);
                          setSlideShow(false);
                          setProgress(0);
                        }}>
                        <MdClose size={28} />
                      </button>

                      <button className="absolute z-20 left-0 h-3/4 p-8 group"
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

                      <button className="absolute z-20 right-0 h-3/4 p-8 group"
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
          events.map((event, index) => <GalleryAccordion title={event} index={index} />)}
        <div className="[column-width:33vw] md:[column-width:25vw] lg:[column-width:20vw] [column-gap:1rem] w-full mt-8 pr-8"></div>
      </div>
    </Layout>
  );
};

export default Gallery;
