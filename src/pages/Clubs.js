import axios from "axios";
import React, { useEffect, useState } from "react";
import { TbExternalLink } from "react-icons/tb";
import { Link } from "react-router-dom";
import Layout from "./Layout.js";
import { fetchAllClubsLogo, fetchClubDescription } from "../API/calls.js";
//? import PersonList from "./ClubDescription.js";

function ClubListing(props) {
  return (
    <a href={props.clubLink}>
      <div className={'max-w-sm h-[32rem] bg-white border-2 border-black rounded-3xl overflow-hidden'}>
        <img className={"rounded-t-lg hover:scale-110 ease-in-out duration-300"} src={props.clubImage} alt="club-logo" />
        <div className={"p-5"}>
          <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900">{props.clubName}</h5>
          <p class="mb-3 font-normal text-gray-700"><i>{props.clubTagLine}</i></p>
        </div>
      </div>
    </a>
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
      <div className={'grid grid-cols-1 lg:grid-cols-4 gap-10 px-8 lg:px-0 py-10'}>
        {
          clubs?.map((club) => {
            return <ClubListing
              clubName={club.clubName}
              clubTagLine={club.clubTagLine ? club.clubTagLine : "Smells like paper, right outta press"}
              clubImage={club.image_url ? club.image_url : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Mercado_de_Col%C3%B3n%2C_Valencia%2C_Espa%C3%B1a%2C_2014-06-29%2C_DD_07.JPG/750px-Mercado_de_Col%C3%B3n%2C_Valencia%2C_Espa%C3%B1a%2C_2014-06-29%2C_DD_07.JPG"}
              clubLink={`/club/${club.clubId}`}
            />
          })
        }

      </div>
    </Layout>
  );
};

export default Clubs;
