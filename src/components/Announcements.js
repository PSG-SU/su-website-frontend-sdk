import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiLink } from "react-icons/bi";
import { ANNOUNCEMENT_URL } from "../API/config";

const Announcements = ({ feed = false }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const sendrequest = async () => {
    const res = await axios.get(`${ANNOUNCEMENT_URL}`).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    sendrequest().then((data) => setAnnouncements(data));
  }, []);

  useEffect(() => {
    setExpanded(announcements.map(() => false));
  }, [announcements]);

  const titleText = feed ? "text-gray-700" : "text-white";
  const bodyText = feed ? "text-gray-600" : "text-gray-100";
  const detailsText = feed ? "text-gray-500" : "text-gray-300";
  const lineColor = feed ? "border-gray-400" : "border-[#464495]";

  return (
    <div className="w-full flex flex-col items-center">
      {!feed && (
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-2xl font-serif text-white">Announcements</h1>
          <div className="w-[70%] h-[1px] mt-1 bg-white"></div>
        </div>
      )}
      <div className={`flex flex-col space-y-4 w-full py-6 ${!feed && "h-[650px]"} overflow-y-auto no-scrollbar`}>
        {announcements.map((announcement, index) => (
          <div className="px-8">
            <p className={`text-sm ${detailsText} italic`}>{announcement.type}</p>
            <div className="flex w-full justify-between gap-4">
              <h1 className={`${titleText} font-bold font-sans w-1/2`}>
                {announcement.title}
              </h1>
              <p className={`text-xs ${detailsText} text-right`}>
                {announcement.date}
              </p>
            </div>
            <div className={`flex w-full mt-1 justify-between items-center border-b-2 ${lineColor} pb-3`}>
              <div className="">
                <p
                  id={`${index}-body`}
                  className={`text-xs ${bodyText} text-ellipsis ${!expanded[index] && "max-h-8 [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [display:-webkit-box]"} overflow-hidden`}>
                  {announcement.body.split("\n").map((line) => (
                    <span>{line}<br /></span>
                  ))}
                </p>
                {
                  (!expanded[index]) &&
                  (document.getElementById(`${index}-body`)?.scrollHeight > document.getElementById(`${index}-body`)?.clientHeight) &&
                  (
                    <button className={`text-xs ${bodyText} font-semibold hover:underline`}
                      onClick={() => {
                        setExpanded((prev) => {
                          const newExpanded = [...prev];
                          newExpanded[index] = !newExpanded[index];
                          return newExpanded;
                        });
                      }}
                    >
                      Read More
                    </button>
                  )}
              </div>
              {announcement.link ? (
                <a href={announcement.link.startsWith("http") ? announcement.link : "https://" + announcement.link} target="_blank" rel="noopener noreferrer" >
                  <BiLink
                    size={24}
                    className={`ml-4 ${titleText} hover:${detailsText}`}
                  />
                </a>
              ) : (
                <div className="pl-8" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;