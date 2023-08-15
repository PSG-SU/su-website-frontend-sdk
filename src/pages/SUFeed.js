import React, { useEffect, useState } from "react";
import { FiAlertCircle } from "react-icons/fi";
import Layout from "./Layout.js";
import axios from "axios";
import { SPOTLIGHT_URL, PROPOSAL_URL, CLUB_URL } from "../API/config";
import { Link, useNavigate } from "react-router-dom";
import Feed from "../components/Feed.js";
import Announcements from "../components/Announcements.js";

const Spotlight = ({ title, description, link }) => {
  return (
    <div className="text-ellipsis w-full overflow-hidden p-4 border-b-2 pb-4 border-b-slate-600">
      <div className="flex justify-between">
        <div className="text-gray-600 backdrop font-bold text-lg pl-2 mt-2">{title}</div>
        {/* <div className="flex-1 w-full"></div> */}
        <button className="text-gray-600 mt-2 bg-gray-300 px-2 rounded-lg">
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

const SpotlightEvents = ({ eventsList }) => {

  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    axios.get(`${CLUB_URL}`, {}).then((res) => {
      setClubs(res.data);
    }).catch(err => console.log(err));
  }, []);

  const timeParser = (date) => {
    const d = new Date(date);

    return `${(d.getHours() < 10 ? '0' : '') + (parseInt(d.getHours().toString()) <= 12 ?
      d.getHours() : ((parseInt(d.getHours().toString()) - 12 < 10 ? '0' : '') +
        (parseInt(d.getHours().toString()) - 12)))}:${(d.getMinutes() < 10 && '0') + d.getMinutes()}
    ${d.getHours() < 12 ? " AM" : " PM"}`
  }

  return (
    <div className={`flex flex-col gap-4 ${!(eventsList && eventsList.length > 0) && "hidden lg:block"}`}>
      {eventsList && eventsList.length > 0 ? (
        eventsList.map((ev) => {
          const startTime = new Date(ev.startDate);
          const endTime = new Date(ev.endDate);

          return (
            <button
              className="bg-gray-200 rounded-xl w-full shadow-md py-4 px-6 flex flex-col justify-start"
              onClick={(e) => { navigate(`/club/${ev.user}#${ev.eventName.split(" ").join("-")}`) }}
            >
              <div className="flex justify-between w-full gap-4">
                <p className={`text-xs text-gray-700 italic text-left`}>{clubs.filter((club) => club.clubId === ev.user)[0]?.clubName}</p>
                <p className={`text-xs text-gray-600 text-right`}>
                  {startTime.getDate() === endTime.getDate() ? (
                    startTime.getDate() + " " + startTime.toLocaleString('default', { month: 'long' })
                  ) : (
                    startTime.getDate() + " " + startTime.toLocaleString('default', { month: 'short' }) + ", " + timeParser(ev.startDate)
                  )}
                </p>
              </div>

              <div className="flex w-full justify-between gap-4">
                <h1 className={`text-gray-800 text-left font-semibold text-sm w-1/2`}>
                  {ev.eventName}
                </h1>
                <p className={`text-xs text-gray-600 text-right pt-0.5`}>
                  {startTime.getDate() === endTime.getDate() ? (
                    timeParser(ev.startDate) + " - " + timeParser(ev.endDate)
                  ) : (
                    "to " + endTime.getDate() + " " + endTime.toLocaleString('default', { month: 'short' }) + ", " + timeParser(ev.endDate)
                  )}
                </p>
              </div>
            </button>
          )
        })
      ) : (
        <section className="flex bg-gray-200 text-gray-600 border-2 border-dashed border-gray-400 rounded-lg p-8 lg:w-full space-x-4 justify-center items-center">
          <FiAlertCircle size={36} className="hidden lg:block" />
          <p className="text-sm">
            Uh oh! Looks like there are no events to show here. Please check
            back later.
          </p>
        </section>
      )}
    </div>
  )
}

const SUFeed = () => {
  const [spotlight, setSpotlight] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState(null);

  useEffect(() => {
    axios.get(`${SPOTLIGHT_URL}`).then((res) => {
      setSpotlight(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${PROPOSAL_URL}/current`).then((res) => {
      setOngoingEvents(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${PROPOSAL_URL}/upcoming`).then((res) => {
      setUpcomingEvents(res.data);
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl uppercase text-center mt-16 w-full">
        SU <span className="font-bold">Feed</span>
      </h1>
      <div className="flex flex-col lg:flex-row pt-4 lg:pt-8 w-full space-y-8 lg:space-y-0 lg:space-x-8">

        <div className={`w-full lg:w-1/4 font-sans overflow-x-hidden pt-6 lg:pt-0 px-6 lg:px-0 ${(!(ongoingEvents && ongoingEvents.length > 0) && !(upcomingEvents && upcomingEvents.length > 0)) && "hidden lg:block"}`}>
          <div className={`${!(ongoingEvents && ongoingEvents.length > 0) && "hidden lg:block"}`}>
            <h2 className="font-sans text-2xl text-center lg:text-left">Ongoing Events</h2>
            <div className="w-full mt-6 flex flex-col gap-6">
              <SpotlightEvents eventsList={ongoingEvents} />
            </div>
          </div>

          <div className={`${!(upcomingEvents && upcomingEvents.length > 0) && "hidden lg:block"}`}>
            <h2 className={`font-sans text-2xl text-center lg:text-left ${(ongoingEvents && ongoingEvents.length > 0) ? "pt-10 lg:pt-20" : "pt-4 lg:pt-20"}`}>Upcoming Week's Events</h2>
            <div className="w-full mt-6 flex flex-col gap-6">
              <SpotlightEvents eventsList={upcomingEvents} />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 font-sans overflow-x-hidden space-y-6 pt-2 lg:pt-0 flex flex-col items-center">
          <h2 className="font-sans text-2xl text-center lg:text-left w-full">Posts</h2>
          <section className="bg-gray-200 text-gray-600 border-2 border-dashed border-gray-400 rounded-lg p-8 w-[90%] lg:w-full flex space-x-4 justify-center items-center">
            <FiAlertCircle size={56} className="hidden lg:block" />
            <p className="">
              This is a compilation of all the events and circulars passed
              within the institute. Students are adviced to check this feed
              frequently for updates on various information.
            </p>
          </section>
          <Feed />
        </div>

        <div className="w-full lg:w-1/4 font-sans overflow-x-hidden pt-8 lg:pt-0">
          <h2 className="font-sans text-2xl text-center lg:text-left">Announcements</h2>
          <div className="w-full h-[calc(85vh)] lg:bg-gray-200 lg:rounded-lg mt-6 overflow-auto no-scrollbar">
            <Announcements feed />
            {/* {spotlight.map((spotlight, index) => (
                <Spotlight
                  title={spotlight.title}
                  description={spotlight.description}
                  link={spotlight.url}
                />
              ))} */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SUFeed;
