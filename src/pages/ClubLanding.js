import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { fetchClubGeneralDetails } from "../API/calls";
import { useParams } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";
import { IoLogoInstagram, IoLogoWhatsapp, IoMail, IoLogoLinkedin, IoLogoYoutube, IoLogoFacebook, IoLogoTwitter } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { Icon } from '@iconify/react';
import Feed from "../components/Feed";

const ClubLanding = () => {
  const { id } = useParams();

  const [photos, setPhotos] = useState([]);
  const [generalDetails, setGeneralDetails] = useState(null);

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
  }, [id]);

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

  return (
    <Layout>
      <div className="w-full">
        <div
          className="h-[7.5rem] lg:h-[15rem] w-full"
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
        <div className="flex flex-col lg:flex-row items-center space-x-6 -mt-16 lg:-mt-48">
          <img
            className="w-32 h-32 lg:w-64 lg:h-64 aspect-square rounded-full bg-gray-100 border-4 lg:border-8 border-gray-200 lg:ml-16 object-contain"
            src={generalDetails?.general?.image_url ? generalDetails?.general?.image_url : "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/PSG_College_of_Technology_logo.png/220px-PSG_College_of_Technology_logo.png"}
            alt="club-logo"
          />
          <div className="pt-4 lg:pt-0 pr-4 lg:pr-0 text-center lg:text-left">
            <p className="lg:text-white font-sans text-2xl lg:text-4xl font-bold">
              {generalDetails ? generalDetails.clubName : "Loading.."}{" "}
            </p>
            <p className="text-gray-600 lg:text-gray-200 pt-1">{generalDetails?.general?.tagline && generalDetails.general.tagline !== "No tagline provided" && generalDetails.general.tagline}
              {generalDetails?.general?.website &&
                <button className="inline-block"
                  onClick={() => { window.open(generalDetails.general.website.startsWith("http") ? generalDetails.general.website : "https://" + generalDetails.general.website) }}
                >
                  {generalDetails?.general?.tagline && generalDetails.general.tagline !== "No tagline provided" && <p className="inline-block mx-2">{' | '}</p>}
                  <p className="inline-block font-semibold hover:underline hover:text-blue-300">{generalDetails.general.website}</p>
                </button>
              }</p>
          </div>
        </div>
        {/* <div className="lg:hidden w-full h-0.5 mt-6 bg-gray-500"></div> */}
        <div className="flex flex-col lg:flex-row w-full items-center lg:items-start gap-8 my-8">
          <div className="flex flex-col gap-8 w-full lg:w-1/4">
            <section className="lg:bg-gray-200 rounded-lg lg:p-8 px-6 flex flex-col items-center lg:items-start">
              <div className="text-gray-700 text-xl font-bold border-t-4 border-t-gray-400 lg:border-0 pt-2 lg:pt-0">About Us</div>
              <p className="text-base text-gray-500 mt-6 text-justify lg:text-left">
                {generalDetails?.general?.description ||
                  "No description provided"}
              </p>
              {
                generalDetails?.general?.website && (
                  <p className="mt-2 text-base flex flex-col items-center lg:items-start">
                    <span className="">For More Information</span>
                    <button className="text-blue-600 hover:underline font-semibold flex items-center space-x-2" onClick={() => {
                      window.open(generalDetails.general.website.startsWith("http") ? generalDetails.general.website : "https://" + generalDetails.general.website)
                    }}
                    >
                      <AiOutlineLink />
                      <p className="">Click Here</p>
                    </button>
                  </p>
                )}
            </section>

            <div className="hidden lg:block">
              <Contact generalDetails={generalDetails} />
            </div>

          </div>
          <div className="flex flex-col gap-8 w-full lg:w-1/2 items-center">
            <div className="lg:hidden text-gray-700 text-xl font-bold pt-2 -mb-2 border-t-4 border-t-gray-400">Posts</div>
            <Feed id={id} />
          </div>
          <div className="flex flex-col gap-8 w-full lg:w-1/4 items-center lg:items-start">
            <p className="lg:hidden text-xl text-gray-700 font-bold pt-2 -mb-4 border-t-4 border-t-gray-400">Photos</p>
            <section className="lg:bg-gray-200 rounded-lg lg:p-8 px-6 w-full">
              <p className="hidden lg:block text-xl text-gray-700 font-bold">Photos</p>
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
            <div className="lg:hidden w-full">
              <Contact generalDetails={generalDetails} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Contact = ({ generalDetails }) => {

  const toTitleCase = (phrase) => {
    return phrase?.toLowerCase()
      .split(" ")
      .map((word) => { return word.charAt(0).toUpperCase() + word.slice(1); })
      .join(" ");
  };

  return (
    <div>
      {
        generalDetails?.general?.contactName1 && generalDetails?.general?.contactNumber1 && generalDetails?.general?.contactEmail1 && (
          <div className="lg:bg-gray-200 flex-1 flex flex-col rounded-lg px-6 lg:p-8 space-y-6 items-center lg:items-start">
            <p className="text-xl font-bold text-gray-700 border-t-4 border-t-gray-400 lg:border-0 pt-2 lg:pt-0">
              Contact Us
            </p>

            <div className="flex flex-row items-center justify-between w-full">
              <div className="w-1/2">
                <p className="font-semibold text-[#3c4043]">
                  {toTitleCase(generalDetails.general.contactName1)}
                </p>
                <p className="text-base lg:text-sm text-[#3c4043]">
                  {generalDetails.general.contactNumber1}
                </p>
                <p className="text-base lg:text-sm text-[#3c4043]">
                  {generalDetails.general.contactEmail1}
                </p>
              </div>

              <div className="space-x-4">
                <button
                  className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                  onClick={() => {
                    window.open(`tel:${generalDetails.general.contactNumber1}`);
                  }}
                >
                  <IoMdCall className="text-gray-700 hover:text-black text-2xl" />
                </button>
                <button
                  className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                  onClick={() => {
                    window.open(
                      `https://wa.me/${generalDetails.general.contactNumber1.split(" ").join("")}`
                    );
                  }}
                >
                  <IoLogoWhatsapp className="text-gray-700 hover:text-black text-2xl" />
                </button>
                <button
                  className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                  onClick={() => {
                    window.open(`mailto:${generalDetails.general.contactEmail1}`);
                  }}
                >
                  <IoMail className="text-gray-700 hover:text-black text-2xl" />
                </button>
              </div>
            </div>

            {
              generalDetails?.general?.contactName2 && generalDetails?.general?.contactNumber2 && generalDetails?.general?.contactEmail2 && (
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="w-1/2">
                    <p className="font-semibold text-[#3c4043]">
                      {toTitleCase(generalDetails.general.contactName2)}
                    </p>
                    <p className="text-base lg:text-sm text-[#3c4043]">
                      {generalDetails.general.contactNumber2}
                    </p>
                    <p className="text-base lg:text-sm text-[#3c4043]">
                      {generalDetails.general.contactEmail2}
                    </p>
                  </div>

                  <div className="space-x-4">
                    <button
                      className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                      onClick={() => {
                        window.open(`tel:${generalDetails.general.contactNumber2}`);
                      }}
                    >
                      <IoMdCall className="text-gray-700 hover:text-black text-2xl" />
                    </button>
                    <button
                      className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                      onClick={() => {
                        window.open(
                          `https://wa.me/${generalDetails.general.contactNumber2.split(" ").join("")}`
                        );
                      }}
                    >
                      <IoLogoWhatsapp className="text-gray-700 hover:text-black text-2xl" />
                    </button>
                    <button
                      className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                      onClick={() => {
                        window.open(`mailto:${generalDetails.general.contactEmail2}`);
                      }}
                    >
                      <IoMail className="text-gray-700 hover:text-black text-2xl" />
                    </button>
                  </div>
                </div>
              )}

            {(generalDetails?.general?.instagram || generalDetails?.general?.linkedin || generalDetails?.general?.linktree || generalDetails?.general?.youtube || generalDetails?.general?.facebook || generalDetails?.general?.twitter) && (
              <p className="text-xl font-bold text-gray-700 pt-4">
                Socials
              </p>
            )}

            <div className="flex flex-row items-center space-x-6">
              {generalDetails?.general?.instagram && (
                <button
                  className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                  onClick={() => {
                    window.open(generalDetails.general.instagram.startsWith("http") ? generalDetails.general.instagram : "https://" + generalDetails.general.instagram)
                  }}
                >
                  <IoLogoInstagram className="text-gray-700 hover:text-black text-2xl" />
                </button>
              )}
              {generalDetails?.general?.linkedin && (
                <button
                  className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                  onClick={() => {
                    window.open(generalDetails.general.linkedin.startsWith("http") ? generalDetails.general.linkedin : "https://" + generalDetails.general.linkedin)
                  }}
                >
                  <IoLogoLinkedin className="text-gray-700 hover:text-black text-2xl" />
                </button>
              )}
              {generalDetails?.general?.linktree && (
                <button
                  className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                  onClick={() => {
                    window.open(generalDetails.general.linktree.startsWith("http") ? generalDetails.general.linktree : "https://" + generalDetails.general.linktree)
                  }}
                >
                  <Icon icon="simple-icons:linktree" className="text-gray-700 hover:text-black text-xl" />
                </button>
              )}
              {generalDetails?.general?.youtube && (
                <button
                  className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                  onClick={() => {
                    window.open(generalDetails.general.youtube.startsWith("http") ? generalDetails.general.youtube : "https://" + generalDetails.general.youtube)
                  }}
                >
                  <IoLogoYoutube className="text-gray-700 hover:text-black text-2xl" />
                </button>
              )}
              {generalDetails?.general?.facebook && (
                <button
                  className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                  onClick={() => {
                    window.open(generalDetails.general.facebook.startsWith("http") ? generalDetails.general.facebook : "https://" + generalDetails.general.facebook)
                  }}
                >
                  <IoLogoFacebook className="text-gray-700 hover:text-black text-2xl" />
                </button>
              )}
              {generalDetails?.general?.twitter && (
                <button
                  className="hover:-translate-y-2 transition-all duration-500 ease-in-out"
                  onClick={() => {
                    window.open(generalDetails.general.twitter.startsWith("http") ? generalDetails.general.twitter : "https://" + generalDetails.general.twitter)
                  }}
                >
                  <IoLogoTwitter className="text-gray-700 hover:text-black text-2xl" />
                </button>
              )}
            </div>
          </div>
        )}
    </div>
  )
}

export default ClubLanding;
