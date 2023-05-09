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

  const toTitleCase = (phrase) => {
    return phrase?.toLowerCase()
      .split(" ")
      .map((word) => { return word.charAt(0).toUpperCase() + word.slice(1); })
      .join(" ");
  };

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
            className="w-64 h-64 aspect-square rounded-full border-8 border-gray-200 ml-16"
            style={
              generalDetails?.general?.image_url
                ? {
                  background: `url(${generalDetails.general.image_url})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
                : {
                  background: "#C0BBBB",
                  backgroundImage: "url(https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/PSG_College_of_Technology_logo.png/220px-PSG_College_of_Technology_logo.png)",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }
            }
          ></div>
          <div className="">
            <p className="text-white font-sans text-4xl font-bold">
              {generalDetails ? generalDetails.clubName : "Loading.."}{" "}
            </p>
            <p className="text-gray-200 pt-1">{generalDetails?.general?.tagline && generalDetails.general.tagline !== "No tagline provided" && generalDetails.general.tagline}
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
        <div className="flex w-full items-start gap-8 my-8 ">
          <div className="flex flex-col gap-8 w-1/4">
            <section className="bg-gray-200 rounded-lg p-8">
              <div className="text-gray-700 text-xl font-bold">About Us</div>
              <p className="text-base text-gray-500 mt-6">
                {generalDetails?.general?.description ||
                  "No description provided"}
              </p>
              {
                generalDetails?.general?.website && (
                  <p className="mt-2 text-base">
                    <span className="">For More Information: &nbsp;</span>
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

            {
              generalDetails?.general?.contactName1 && generalDetails?.general?.contactNumber1 && generalDetails?.general?.contactEmail1 && (
                <div className="bg-gray-200 flex-1 flex flex-col rounded-lg p-8 space-y-6">
                  <p className="text-xl font-bold text-gray-700">
                    Contact Us
                  </p>

                  <div className="flex flex-row items-center justify-between">
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
                      <div className="flex flex-row items-center justify-between">
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
          <div className="flex flex-col gap-8 w-1/2">
            <Feed id={id} />
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
