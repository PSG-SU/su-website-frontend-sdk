import React, { useEffect, useState } from "react";
import Layout from "./Layout.js";
import { fetchAllClubsLogo } from "../API/calls.js";
import "../styles/gradientAnimation.css";

function ClubListing(props) {
  return (
    <a href={props.clubLink}>
      <div className={'w-[18rem] h-[32rem] bg-white border-2 border-black rounded-3xl overflow-hidden flex flex-col'}>
        <div className="w-full flex justify-center bg-blac">
          <img className={"rounded-t-lg hover:scale-110 ease-in-out duration-300 h-[17.75rem] object-contain"} src={props.clubImage} alt="club-logo" />
        </div>
        <div className={"p-4 pt-8"}>
          <h5 className={`mb-2 text-[1.6rem] font-bold tracking-tight text-gray-900`}>{props.clubName}</h5>
          <p class="mb-3 font-normal text-gray-700"><i>{props.clubTagLine}</i></p>
        </div>
      </div>
    </a>
  )
}

const ClubLoading = () => {
  return (
    <div className="w-[18rem] h-[32rem] rounded-3xl overflow-hidden"
      id="skeleton-grid"
    >
      <div className="h-[16rem]"></div>
      <div className="bg-gray-500 h-12 w-3/4 ml-4 rounded-lg" id="skeleton"></div>
      <div className="bg-gray-500 h-12 w-1/2 ml-4 mt-4 rounded-lg" id="skeleton"></div>
      <div className="bg-gray-500 h-6 w-3/4 ml-4 mt-8 rounded-md" id="skeleton"></div>
    </div>
  )
}


const Associations = () => {
  const [assoc, setAssoc] = useState([]);

  useEffect(() => {
    fetchAllClubsLogo()
      .then((res) => {
        console.log(res.data.filter(i => i.category === "Associations").sort((a, b) => a.clubName.localeCompare(b.clubName)));
        setAssoc(res.data.filter(i => i.category === "Associations").sort((a, b) => a.clubName.localeCompare(b.clubName)));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl uppercase text-center mt-16">
        Our <span className="font-bold">Associations</span>
      </h1>
      <div className={'flex flex-wrap justify-center gap-8 px-12 lg:px-0 py-12'}>
        {
          assoc.length > 0 ? (
            assoc?.map((ass) => {
              return (
                <ClubListing
                  clubName={ass.clubName}
                  clubTagLine={ass.data?.tagline ? ass.data?.tagline : "Smells like paper, right outta press"}
                  clubImage={ass.image_url ? ass.image_url : "https://upload.wikimedia.org/wikipedia/en/e/eb/PSG_College_of_Technology_logo.png"}
                  clubLink={`/club/${ass.clubId}`}
                />
              )
            })
          ) : (
            [...Array(12)].map((e, i) =>
              <ClubLoading />
            )
          )
        }

      </div>
    </Layout>
  );
};

export default Associations;
