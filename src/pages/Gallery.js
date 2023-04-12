import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Layout from "./Layout";
import { GALLERY_URL } from "../API/config";

const Gallery = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`${GALLERY_URL}`).then((res) => {
      console.log("Gallery");
      console.log(res.data.message);
      setEvents(res.data.message);
    });
  }, []);

  return (
    <Layout>
      <div className="p-8 w-full">
        <h1 className="text-black tracking-wider text-4xl uppercase mb-4 text-center">
          Our <span className="font-bold">Gallery</span>
        </h1>
        {events.map((event) => (
          <GalleryAccordion title={event.event} images={event.image_url} />
        ))}
        <div className="[column-width:33vw] md:[column-width:25vw] lg:[column-width:20vw] [column-gap:1rem] w-full mt-8 pr-8">
          {/* <div className="grid  [grid-template-columns:repeat(auto-fill,250px)] [grid-auto-rows:10px] [justify-content:center]"> */}
        </div>
      </div>
    </Layout>
  );
};

export const GalleryAccordion = ({ title = "", images }) => {
  const photos = [];
  photos.push(images);
  console.log(photos);

  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className="w-full lg:p-4">
      <div className="flex items-center space-x-4 mb-4">
        <button onClick={(e) => setIsHidden(!isHidden)}>
          {isHidden ? (
            <MdOutlineKeyboardArrowRight size={36} />
          ) : (
            <MdOutlineKeyboardArrowDown size={36} />
          )}
        </button>
        <h1 className="text-3xl font-semibold">{title}</h1>
      </div>
      {!isHidden && (
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-2">
          {photos.map((photo) => (
            <img
              // loading="lazy" 
              src={images[0].image_url}
              alt={photo.title}
              className="h-36 block"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
