import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiShareAlt } from 'react-icons/bi';
import { BsCalendar, BsCalendarWeek, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { CLUB_URL, FEED_URL, CLUB_GENERAL_URL } from '../API/config';
import { toast } from 'react-hot-toast';
import { FiAlertCircle, FiUserPlus } from 'react-icons/fi';
import { IoLocationSharp } from 'react-icons/io5';
import { MdAccessTime } from 'react-icons/md';

const Feed = ({ id = "all" }) => {
  const navigate = useNavigate();
  const [event, setEvent] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [generals, setGenerals] = useState([]);
  const [imageIndices, setImageIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextCircle, setNextCircle] = useState(0);

  useEffect(() => {
    axios
      .get(`${FEED_URL}`)
      .then((res) => {
        console.log(res.data);
        if (id !== "all") {
          setEvent(res.data.filter((e) => e.user === id));
        } else {
          setEvent(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios.get(`${CLUB_URL}`, {}).then((res) => {
      setClubs(res.data);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get(`${CLUB_GENERAL_URL}`, {}).then((res) => {
      setGenerals(res.data);
    }).catch(err => console.log(err));
  }, []);

  useEffect(() => {
    setImageIndices(new Array(event?.length).fill(0));
  }, [event]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (nextCircle === 4) {
        setNextCircle(0);
      } else {
        setNextCircle(nextCircle + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [nextCircle]);

  const DateFormat = ({ date }) => {
    return date.split("T")[0].split("-").join("") + "T" + date.split("T")[1].split(".")[0].split(":").join("") + "Z";
  }

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className='font-sans overflow-x-hidden space-y-6'>
      {event && event.length > 0 ?
        event.slice(0).reverse().map((ev, index) => {
          const dateTime = new Date(ev.startDate);

          return (
            <section className="w-full border-gray-400 border-2 rounded-lg"
              id={ev.eventName}
              key={ev.eventName}
            >
              <div className="p-6 border-b-gray-400 border-b-2">
                <header className="flex items-center space-x-4">
                  <button className="rounded-full w-10 h-10 aspect-square" onClick={(e) => { navigate(`/club/${ev.user}`) }}
                    style={{
                      backgroundImage: `url(${generals.filter((general) => general.user === ev.user)[0]?.image_url ? generals.filter((general) => general.user === ev.user)[0]?.image_url : "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/PSG_College_of_Technology_logo.png/220px-PSG_College_of_Technology_logo.png"})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat"
                    }}
                  ></button>
                  <button className="" onClick={(e) => { navigate(`/club/${ev.user}`) }}>
                    <div className="flex items-center space-x-1">
                      <p className="text-lg font-semibold">{ev.eventName}</p>
                      {/* <p className="">:</p>
                  <p className=" text-gray-500">1d</p> */}
                    </div>
                    <div className="text-base text-gray-500 text-left">
                      {clubs.filter((club) => club.clubId === ev.user)[0]?.clubName}
                    </div>
                  </button>
                </header>
                <div className='flex flex-col-reverse lg:flex-row items-center space-y-2 lg:space-y-0 justify-around my-6 font-poppins text-lg text-gray-700 font-semibold'>
                  <div className="flex items-center space-x-2 lg:space-x-4 pt-4 lg:pt-0">
                    <IoLocationSharp size={24} />
                    <p className="">{ev.venue}</p>
                  </div>
                  <div className="hidden lg:flex items-center space-x-4">
                    <BsCalendar size={24} />
                    <p className="">{dateTime.getDate()} {monthNames[dateTime.getMonth()]} {"'" + dateTime.getFullYear().toString().slice(-2)}</p>
                  </div>
                  <div className="hidden lg:flex items-center space-x-4">
                    <MdAccessTime size={24} />
                    <p className="">
                      {(dateTime.getHours() < 10 ? '0' : '') + (parseInt(dateTime.getHours().toString()) <= 12 ?
                        dateTime.getHours() :
                        ((parseInt(dateTime.getHours().toString()) - 12 < 10 ? '0' : '') + (parseInt(dateTime.getHours().toString()) - 12)))}
                      {' '}: {(dateTime.getMinutes() < 10 && '0') + dateTime.getMinutes()}
                      {dateTime.getHours() < 12 ? " AM" : " PM"}
                    </p>
                  </div>
                  <div className='lg:hidden flex flex-row justify-between px-1 w-full'>
                    <div className="flex items-center space-x-2">
                      <BsCalendar size={24} />
                      <p className="">{dateTime.getDate()} {monthNames[dateTime.getMonth()]} {"'" + dateTime.getFullYear().toString().slice(-2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MdAccessTime size={24} />
                      <p className="">
                        {(dateTime.getHours() < 10 ? '0' : '') + (parseInt(dateTime.getHours().toString()) <= 12 ?
                          dateTime.getHours() :
                          ((parseInt(dateTime.getHours().toString()) - 12 < 10 ? '0' : '') + (parseInt(dateTime.getHours().toString()) - 12)))}
                        {' '}: {(dateTime.getMinutes() < 10 && '0') + dateTime.getMinutes()}
                        {dateTime.getHours() < 12 ? " AM" : " PM"}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-4">{ev.description}</p>
              </div>
              {
                ev.images && ev.images.length > 0 && (
                  <div>
                    <div className="w-full h-auto max-h-[40rem] relative group">
                      <button
                        className="hidden lg:block bg-gradient-to-r from-gray-600 opacity-0 group-hover:opacity-60 transition-all ease-in-out duration-500 p-2 pr-12 absolute top-0 z-10 h-full group-one"
                        onClick={() => {
                          if (imageIndices[index] > 0) {
                            setImageIndices(imageIndices.map((val, i) => i === index ? val - 1 : val));
                          } else {
                            setImageIndices(imageIndices.map((val, i) => i === index ? ev.images.length - 1 : val));
                          }
                        }}
                      >
                        <BsChevronLeft className="font-bold text-white text-3xl group-one-hover:text-4xl transition-all ease-in-out duration-300" />
                      </button>
                      <img src={ev.images[imageIndices[index]]} alt={ev.eventName} className="w-full h-auto max-h-[40rem] object-contain" />
                      <button
                        className="hidden lg:block bg-gradient-to-l from-gray-600 opacity-0 group-hover:opacity-60 transition-all ease-in-out duration-500 p-2 pl-12 absolute top-0 right-0 z-10 h-full group-one"
                        onClick={() => {
                          if (imageIndices[index] < ev.images.length - 1) {
                            setImageIndices(imageIndices.map((val, i) => i === index ? val + 1 : val));
                          } else {
                            setImageIndices(imageIndices.map((val, i) => i === index ? 0 : val));
                          }
                        }}
                      >
                        <BsChevronRight className="font-bold text-white text-3xl group-one-hover:text-4xl transition-all ease-in-out duration-300" />
                      </button>
                    </div>
                    <div className="w-full py-4 flex items-center justify-between lg:justify-center">
                      <button
                        className="lg:hidden group w-10 h-10 pl-4"
                        onClick={() => {
                          if (imageIndices[index] > 0) {
                            setImageIndices(imageIndices.map((val, i) => i === index ? val - 1 : val));
                          } else {
                            setImageIndices(imageIndices.map((val, i) => i === index ? ev.images.length - 1 : val));
                          }
                        }}
                      >
                        <BsChevronLeft className="font-bold text-3xl group-hover:text-4xl transition-all ease-in-out duration-300" />
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
                        className="lg:hidden group w-10 h-10 pr-4"
                        onClick={() => {
                          if (imageIndices[index] < ev.images.length - 1) {
                            setImageIndices(imageIndices.map((val, i) => i === index ? val + 1 : val));
                          } else {
                            setImageIndices(imageIndices.map((val, i) => i === index ? 0 : val));
                          }
                        }}
                      >
                        <BsChevronRight className="font-bold text-3xl group-hover:text-4xl transition-all ease-in-out duration-300" />
                      </button>
                    </div>
                  </div>
                )}
              <div className="w-full flex flex-col lg:flex-row p-6 space-x-0 lg:space-x-4 space-y-2 lg:space-y-0">
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-800 transition-all ease-in-out duration-500 w-full rounded-xl px-6 py-2 text-center text-lg text-white font-semibold"
                  onClick={() => {
                    window.open(ev.registrationLink.startsWith("http") ? ev.registrationLink : "https://" + ev.registrationLink, "_blank");
                  }}
                >
                  <FiUserPlus className="inline-block mr-3 mb-1 text-xl" />
                  Register
                </button>

                <button className="flex-1 border-2 border-emerald-600 hover:border-emerald-800 transition-all ease-in-out duration-500 w-full rounded-xl px-6 py-2 text-center text-lg text-emerald-600 hover:text-emerald-800 font-semibold"
                  onClick={() => {
                    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${DateFormat({ date: ev.startDate })}%2F${DateFormat({ date: ev.endDate })}&details=${ev.description}&location=${ev.venue}&text=${ev.eventName} - ${clubs.filter((club) => club.clubId === ev.user)[0]?.clubName}`, "_blank");
                  }}
                >
                  <BsCalendarWeek className="inline-block mr-3 mb-1 text-xl" />
                  Add to Calendar
                </button>

                <button
                  className="hidden lg:block text-gray-600 hover:text-gray-700"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href + "#" + ev.eventName);
                    toast.success("Link copied to clipboard!");
                  }}
                >
                  <BiShareAlt size={30} />
                </button>

              </div>
            </section>
          )
        })
        : (
          loading ? (
            <section className="w-full border-gray-200 border-2 rounded-lg">
              <div className="p-6 border-b-gray-200 border-b-2 bg-gray-200">
                <header className="flex items-center space-x-4">
                  <div className="rounded-full w-10 h-10 aspect-square" id="skeleton"></div>
                  <div>
                    <div className='h-4 w-32 rounded-md' id="skeleton"></div>
                    <div className="h-4 w-24 rounded-md mt-1" id="skeleton"></div>
                  </div>
                </header>
                <div className='flex flex-row justify-around space-x-8 my-8'>
                  <div className="h-10 w-1/3 rounded-lg" id="skeleton"></div>
                  <div className="h-10 w-1/3 rounded-lg" id="skeleton"></div>
                  <div className="h-10 w-1/3 rounded-lg" id="skeleton"></div>
                </div>
                <div className='h-4 w-3/4 rounded-md mt-8' id="skeleton"></div>
                <div className='h-4 w-1/2 rounded-md mt-1' id="skeleton"></div>
              </div>
              <div>
                <div className="w-full h-[20rem]"></div>
                <div className='w-full flex justify-center pt-8 pb-4 border-gray-200 border-t-2 bg-gray-200'>
                  {
                    [...Array(5)].map((val, index) => {
                      return (
                        <div className={`w-3 h-3 rounded-full border-2 border-gray-400 ${nextCircle === index && "bg-gray-400"} inline-block mx-2`}></div>
                      )
                    })
                  }
                </div>
              </div>
              <div className="w-full flex p-6 space-x-4 bg-gray-200">
                <div className='w-1/2 h-12 rounded-lg' id="skeleton"></div>
                <div className='w-1/2 h-12 rounded-lg' id="skeleton"></div>
              </div>
            </section>
          ) : (
            <section className="hidden lg:flex bg-gray-200 text-gray-600 border-2 border-dashed border-gray-400 rounded-lg p-8 w-full space-x-4 justify-center items-center">
              <FiAlertCircle size={26} />
              <p className="">
                Uh oh! Looks like there are no events to show here. Please check
                back later.
              </p>
            </section>
          )
        )
      }
    </div>
  )
}

export default Feed