import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { toast } from "react-hot-toast";
import { fetchClubGeneralDetails, fetchClubTeam } from "../API/calls";
import { useParams } from "react-router-dom";
import { AiOutlineLink } from "react-icons/ai";
import { IoLogoInstagram, IoLogoWhatsapp, IoMail, IoLogoLinkedin, IoLogoYoutube, IoLogoFacebook, IoLogoTwitter } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { Icon } from '@iconify/react';
import Feed from "../components/Feed";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const ClubLanding = () => {
  const { id } = useParams();

  const [photos, setPhotos] = useState([]);
  const [details, setDetails] = useState(null);
  const [faculty, setFaculty] = useState([]);
  const [team, setTeam] = useState([]);

  const [loading, setLoading] = useState(true);
  const [aboutHeight, setAboutHeight] = useState(0);
  const [sticky, setSticky] = useState(false);
  const [teamDivPos, setTeamDivPos] = useState("left")

  useEffect(() => {
    toast.promise(fetchClubGeneralDetails(id), {
      loading: "Loading...",
      success: (res) => {
        setDetails(res.data);
        setAboutHeight(document.getElementById("about")?.clientHeight);
        return "Successfully loaded!";
      },
      error: (err) => {
        console.log(err);
        return "Error loading";
      },
    });
  }, [id]);

  useEffect(() => {
    fetchClubTeam(id).then((res) => {
      setFaculty(res.data.filter((e) => e.position === "Faculty Advisor"));
      setTeam(res.data.filter((e) => e.position === "Student"));
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

  useLayoutEffect(() => {
    function updateSize() {
      const height = document.getElementById("about")?.clientHeight;
      setAboutHeight(height);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useLayoutEffect(() => {
    function updateSize() {
      const y = document.getElementById("feed").getBoundingClientRect().top;

      if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (y <= 85) {
          setSticky(true);
          const feedDiv = document.getElementById("feed");
          if (feedDiv) {
            feedDiv.style.maxHeight = `${aboutHeight}px`;
            feedDiv.style.minHeight = `800px`;
          }
        } else {
          setSticky(false);
          const feedDiv = document.getElementById("feed");
          if (feedDiv) { feedDiv.style.maxHeight = `none`; }
        }
      }
    }
    window.addEventListener("scroll", updateSize);
    updateSize();
    return () => window.removeEventListener("scroll", updateSize);
  }, [aboutHeight]);

  useEffect(() => {
    const teamDiv = document.getElementById("team");
    if (teamDiv) {
      teamDiv.addEventListener('scroll', () => {
        const scrollLeft = teamDiv.scrollLeft;
        const scrollWidth = teamDiv.scrollWidth;
        const clientWidth = teamDiv.clientWidth;
        if (scrollLeft === 0) {
          setTeamDivPos("left");
        } else if (scrollLeft === scrollWidth - clientWidth) {
          setTeamDivPos("right");
        } else {
          setTeamDivPos("middle");
        }
      });
    }
  }, [team, faculty]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  return (
    <Layout>
      <div className="w-full">
        <div
          className="h-[7.5rem] lg:h-[15rem] w-full"
          style={
            details
              ? {
                background: `url(${details.general?.banner_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
              : {
                background: "#797979",
              }
          }
        ></div>
        <div className="flex flex-col lg:flex-row items-center gap-6 -mt-12 lg:-mt-36">
          <img
            className="w-32 h-32 lg:w-64 lg:h-64 aspect-square rounded-full bg-gray-100 border-4 lg:border-8 border-gray-200 lg:ml-16 object-contain"
            src={details?.general?.image_url ? details?.general?.image_url : "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/PSG_College_of_Technology_logo.png/220px-PSG_College_of_Technology_logo.png"}
            alt="club-logo"
          />
          {details?.clubName ? (
            <div className="lg:pt-36 text-center lg:text-left">
              <p className="text-gray-800 font-sans text-2xl lg:text-4xl font-bold">
                {details.clubName}
              </p>
              <p className="text-gray-600 pt-1">
                {details?.general?.tagline && details.general.tagline !== "No tagline provided" && details.general.tagline}
                {details?.general?.website &&
                  <button className="sm:inline-block pl-2 sm:pl-0"
                    onClick={() => { window.open(details.general.website.startsWith("http") ? details.general.website : "https://" + details.general.website) }}
                  >
                    {details?.general?.tagline && details.general.tagline !== "No tagline provided" && <p className="hidden sm:inline-block mx-2">{' | '}</p>}
                    <p className="sm:inline-block font-semibold hover:underline hover:text-blue-600">{details.general.website}</p>
                  </button>
                }</p>
            </div>
          ) : (
            <div className="lg:pt-36 flex flex-col items-center lg:items-start">
              <div className="bg-gray-500 h-10 w-56 rounded-lg" id="skeleton-dark"></div>
              <div className="bg-gray-500 h-8 w-80 mt-2 rounded-md" id="skeleton-dark"></div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row w-full items-center lg:items-start gap-8 my-8">
          {details ? (
            <div className={`flex flex-col gap-8 w-full lg:w-1/4`} id='about'>
              <section className="lg:bg-gray-200 rounded-lg lg:p-8 px-6 flex flex-col items-center lg:items-start">
                <div className="text-gray-700 text-xl font-bold border-t-4 border-t-gray-400 lg:border-0 pt-2 lg:pt-0">About Us</div>
                <p className="text-base text-gray-500 mt-6 text-justify lg:text-left">
                  {details?.general?.description ||
                    "No description provided"}
                </p>
                {
                  details?.general?.website && (
                    <p className="mt-2 text-base flex flex-col items-center lg:items-start">
                      <span className="">For More Information</span>
                      <button className="text-blue-600 hover:underline font-semibold flex items-center space-x-2" onClick={() => {
                        window.open(details.general.website.startsWith("http") ? details.general.website : "https://" + details.general.website)
                      }}
                      >
                        <AiOutlineLink />
                        <p className="">Click Here</p>
                      </button>
                    </p>
                  )}
              </section>

              <div className="hidden lg:block">
                <Contact generalDetails={details} />
              </div>
            </div>
          ) : loading ? (
            <div className="w-full lg:w-1/4">
              <section className="lg:bg-gray-200 rounded-lg lg:p-8 px-6 flex flex-col gap-2 items-center lg:items-start">
                <div className="bg-gray-500 h-6 w-full rounded-md" id="skeleton"></div>
                <div className="bg-gray-500 h-6 w-3/4 rounded-md" id="skeleton"></div>
                <div className="bg-gray-500 h-6 w-1/2 rounded-md" id="skeleton"></div>
              </section>
            </div>
          ) : (
            <div className="flex flex-col w-full lg:w-1/4">
              <section className="lg:bg-gray-200 rounded-lg lg:p-8 px-6">
                <p className="text-base text-gray-500 text-center lg:text-left">Uh oh! Nothing to show here. Please check back later.</p>
              </section>
            </div>
          )}

          <div className={`flex flex-col gap-8 w-full lg:w-1/2 items-center lg:overflow-auto`} id='feed'
          // style={{ maxHeight: aboutHeight, minHeight: "800px" }}
          >
            <div className="lg:hidden text-gray-700 text-xl font-bold pt-2 -mb-2 border-t-4 border-t-gray-400">Posts</div>
            {/* <div className={`w-full ${sticky ? "fixed" : ""}`}> */}
            <Feed id={id} />
            {/* </div> */}
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

            <div className="lg:hidden w-full pt-4">
              <Contact generalDetails={details} />
            </div>
          </div>
        </div>
      </div>

      {(faculty.length > 0 || team.length > 0) && (
        <div className="w-full flex flex-col items-center pt-6 lg:pt-0">
          <div className="lg:hidden text-gray-700 text-xl font-bold pt-2 -mb-8 w-fit border-t-4 border-t-gray-400">Our Team</div>
          <section className="lg:bg-gray-200 rounded-xl py-8 w-full">
            <p className="hidden lg:block text-xl text-gray-700 font-bold text-center">Our Team</p>
            <div className="flex flex-row gap-6 items-center justify-center relative" id="teamBig">
              <button
                className={`${(teamDivPos === "left") ?
                  "hidden" : "hidden lg:block absolute -left-5 bg-gray-400 lg:hover:bg-gray-500 transition-all ease-in-out rounded-full p-0.5 shadow-lg"}`}
                onClick={() => {
                  const teamDiv = document.getElementById("team");
                  if (teamDiv) {
                    teamDiv.scrollBy({
                      left: -200,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                <BiChevronLeft className="text-[2rem] lg:text-[2.5rem] text-white" />
              </button>

              <div className="flex flex-row overflow-auto gap-4 lg:px-8 no-scrollbar" id='team'>
                {faculty.length > 0 && faculty.slice(0).reverse().map((f) => (
                  <Person
                    name={f.name}
                    role1={f.position}
                    image={f.image_url}
                    role2={f.department}
                    year={f.designation}
                  />
                ))}
                {team.length > 0 && team.slice(0).reverse().map((t) => (
                  <Person
                    name={t.name}
                    role1={t.designation}
                    image={t.image_url}
                    role2={t.department}
                    year={t.year}
                    from={new Date(t.from).getFullYear()}
                    to={new Date(t.to).getFullYear()}
                  />
                ))}
              </div>

              <button
                className={`${(teamDivPos === "right" || document.getElementById('team')?.clientWidth < document.getElementById('teamBig')?.clientWidth) ?
                  "hidden" : "hidden lg:block absolute -right-5 bg-gray-400 lg:hover:bg-gray-500 transition-all ease-in-out rounded-full p-0.5 shadow-lg h-fit"}`}
                onClick={() => {
                  const teamDiv = document.getElementById("team");
                  if (teamDiv) {
                    teamDiv.scrollBy({
                      left: 200,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                <BiChevronRight className="text-[2rem] lg:text-[2.5rem] text-white" />
              </button>
            </div>
          </section>
        </div>
      )}
    </Layout>
  );
};

const Contact = ({ generalDetails }) => {

  const content = generalDetails?.general;

  return (
    <div>
      {
        content?.contactName1 && (content?.contactNumber1 || content?.contactEmail1) && (
          <div className="lg:bg-gray-200 flex-1 flex flex-col rounded-lg px-6 lg:p-8 space-y-6 items-center lg:items-start">
            <p className="text-xl font-bold text-gray-700 border-t-4 border-t-gray-400 lg:border-0 pt-2 lg:pt-0">
              Contact Us
            </p>

            <ContactPerson
              name={content?.contactName1}
              phone={content?.contactNumber1}
              email={content?.contactEmail1}
            />

            {content?.contactName2 && (content?.contactNumber2 || content?.contactEmail2) && (
              <ContactPerson
                name={content?.contactName2}
                phone={content?.contactNumber2}
                email={content?.contactEmail2}
              />
            )}

            {(content?.instagram || content?.linkedin || content?.linktree || content?.youtube || content?.facebook || content?.twitter || content?.discord) && (
              <p className="text-xl font-bold text-gray-700 pt-4">
                Socials
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6">
              {content?.instagram && (<Social
                link={content?.instagram.startsWith("http") ? content?.instagram : "https://" + content?.instagram}
                icon={<IoLogoInstagram />}
              />)}
              {content?.linkedin && (<Social
                link={content?.linkedin.startsWith("http") ? content?.linkedin : "https://" + content?.linkedin}
                icon={<IoLogoLinkedin />}
              />)}
              {content?.linktree && (<Social
                link={content?.linktree.startsWith("http") ? content?.linktree : "https://" + content?.linktree}
                icon={<Icon icon="simple-icons:linktree" />}
              />)}
              {content?.youtube && (<Social
                link={content?.youtube.startsWith("http") ? content?.youtube : "https://" + content?.youtube}
                icon={<IoLogoYoutube />}
              />)}
              {content?.facebook && (<Social
                link={content?.facebook.startsWith("http") ? content?.facebook : "https://" + content?.facebook}
                icon={<IoLogoFacebook />}
              />)}
              {content?.twitter && (<Social
                link={content?.twitter.startsWith("http") ? content?.twitter : "https://" + content?.twitter}
                icon={<IoLogoTwitter />}
              />)}
              {content?.discord && (<Social
                link={content?.discord.startsWith("http") ? content?.discord : "https://" + content?.discord}
                icon={<Icon icon="simple-icons:discord" />}
              />)}
            </div>
          </div>
        )}
    </div>
  )
}

const ContactPerson = ({ name, phone, email }) => {

  const toTitleCase = (phrase) => {
    return phrase?.toLowerCase()
      .split(" ")
      .map((word) => { return word.charAt(0).toUpperCase() + word.slice(1); })
      .join(" ");
  };

  return (
    <div className="flex flex-wrap items-center justify-between w-full">
      <div className="w-[59%]">
        <p className="font-semibold text-[#3c4043] whitespace-nowrap">
          {toTitleCase(name)}
        </p>
        <p className="text-base lg:text-sm text-[#3c4043] whitespace-nowrap">
          {phone}
        </p>
        <p className="text-base lg:text-sm text-[#3c4043]">
          {email}
        </p>
      </div>

      <div className={`${name.length > 18 ? "pt-6" : "pt-4"} space-x-4`}>
        {phone && (<Social
          link={`tel:${phone.split(" ").join("")}`}
          icon={<IoMdCall />}
        />)}
        {phone && (<Social
          link={`https://wa.me/${phone.split(" ").join("")}`}
          icon={<IoLogoWhatsapp />}
        />)}
        {email && (<Social
          link={`mailto:${email}`}
          icon={<IoMail />}
        />)}
      </div>
    </div>
  )
}

const Social = ({ link, icon }) => {
  return (
    <button
      className="hover:-translate-y-2 transition-all duration-500 ease-in-out text-gray-700 hover:text-black text-2xl"
      onClick={() => {
        window.open(link);
      }}
    >
      {icon}
    </button>
  )
}

const Person = ({ name, role1 = "", image, role2 = "", nowrap = false, ob = false, year = "", from = "", to = "" }) => {
  return (
    <div className={`flex-auto md:flex flex-col ${ob && "w-full lg:w-44"} px-8 items-center text-center`}>
      {role1.length > 0 && (
        <div className={`mt-12 lg:mt-8 mb-4 uppercase tracking-widest h-14 text-xl ${nowrap && "whitespace-nowrap"}`}>
          {role1}
        </div>
      )}
      <div className={`min-w-max h-52 group flex justify-center`}>
        {image && (
          <img src={image} alt={name} className="h-44 w-44 aspect-square rounded-full mt-2 border-[#b5ecd8] group-hover:border-[#8becc8] transition-all ease-in-out border-8 box-border object-cover" />
        )}
      </div>
      <div className=" w-full mt-4 mb-1 font-bold text-xl">
        {name}
      </div>
      <div className="text-sm text-gray-600">{year}</div>
      <div className="font-semibold text-sm text-indigo-700 my-0.5">{role2}</div>
      <div className="text-xs text-gray-600">{from} - {to}</div>
    </div>
  );
};

export default ClubLanding;
