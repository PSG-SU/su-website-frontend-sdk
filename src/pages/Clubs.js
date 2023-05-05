import axios from "axios";
import React, { useEffect, useState } from "react";
import { TbExternalLink } from "react-icons/tb";
import { Link } from "react-router-dom";
import Layout from "./Layout.js";
import { fetchAllClubsLogo, fetchClubDescription } from "../API/calls.js";
import "../styles/gradientAnimation.css";
//? import PersonList from "./ClubDescription.js";

function ClubListing(props) {
  return (
    <a href={props.clubLink}>
      <div className={'max-w-sm h-[32rem] bg-white border-2 border-black rounded-3xl overflow-hidden flex flex-col items-center'}>
        <img className={"rounded-t-lg hover:scale-110 ease-in-out duration-300 h-[16rem] object-contain"} src={props.clubImage} alt="club-logo" />
        <div className={"p-4 pt-8"}>
          <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">{props.clubName}</h5>
          <p class="mb-3 font-normal text-gray-700"><i>{props.clubTagLine}</i></p>
        </div>
      </div>
    </a>
  )
}

const ClubLoading = () => {
  return (
    <div className="max-w-sm h-[32rem] rounded-3xl overflow-hidden"
      id="skeleton-grid"
    >
      <div className="h-[16rem]"></div>
      <div className="bg-gray-500 h-12 w-3/4 ml-4 rounded-lg" id="skeleton"></div>
      <div className="bg-gray-500 h-12 w-1/2 ml-4 mt-4 rounded-lg" id="skeleton"></div>
      <div className="bg-gray-500 h-6 w-3/4 ml-4 mt-8 rounded-md" id="skeleton"></div>
    </div>
  )
}


const Clubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetchAllClubsLogo()
      .then((res) => {
        console.log(res.data.filter(i => i.category === "Clubs").sort((a, b) => a.clubName.localeCompare(b.clubName)));
        setClubs(res.data.filter(i => i.category === "Clubs").sort((a, b) => a.clubName.localeCompare(b.clubName)));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // * console.log(clubs)
  // * ⬆️ works

  // todo Render Card component directly from API Fetch
  // todo Exclude ADMIN at 0 index while rendering 

  // ? API call does not have image link or clubDescription/clubTagLine
  // ? All clubImages (if present) would not be in same dimensions and would cause misproportionate  
  // ? Considering adding "category" field inside the card, with or without replacing TagLine

  return (
    <Layout>
      <h1 className="text-4xl uppercase text-center mt-16">
        Our <span className="font-bold">Clubs</span>
      </h1>
      <div className={'grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10 px-8 lg:px-0 py-12'}>
        {
          clubs.length > 0 ? (
            clubs?.map((club) => {
              return (
                <ClubListing
                  clubName={club.clubName}
                  clubTagLine={club.clubTagLine ? club.clubTagLine : "Smells like paper, right outta press"}
                  // clubImage={club.image_url ? club.image_url : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Mercado_de_Col%C3%B3n%2C_Valencia%2C_Espa%C3%B1a%2C_2014-06-29%2C_DD_07.JPG/750px-Mercado_de_Col%C3%B3n%2C_Valencia%2C_Espa%C3%B1a%2C_2014-06-29%2C_DD_07.JPG"}
                  clubImage={club.image_url ? club.image_url : "https://upload.wikimedia.org/wikipedia/en/e/eb/PSG_College_of_Technology_logo.png"}
                  clubLink={`/club/${club.clubId}`}
                />
              )
            })
          ) : (
            [...Array(8)].map((e, i) =>
              <ClubLoading />
            )
          )
        }

      </div>
    </Layout>
  );
};

export default Clubs;
