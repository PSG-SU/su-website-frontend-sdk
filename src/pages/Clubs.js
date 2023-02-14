import axios from "axios";
import React, { useEffect, useState } from "react";
import { TbExternalLink } from "react-icons/tb";
import { Link } from "react-router-dom";
import Layout from "./Layout.js";
import { fetchAllClubsLogo } from "../API/calls.js";

function ClubListing(props) {
    return (
        <a href={props.clubLink}>
            <div className={'max-w-sm bg-white border border-gray-200 rounded-3xl shadow dark:bg-white dark:border-gray-700 overflow-hidden'}>
                        <img className={"rounded-t-lg"} src={props.clubImage}/>
                    <div className={"p-2"}>
                        <h5 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-900">{props.clubName}</h5>
                        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><i>{props.clubDescription}</i></p>
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
        console.log(res.data);
        setClubs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl uppercase text-center mt-16">
        Our <span className="font-bold">Clubs</span>
      </h1>
        <div className={'grid grid-cols-4 gap-10 py-10'}>

            <ClubListing clubName = "Book Readers Club" clubDescription = "Smells like paper, right outta press" clubImage = "https://images.unsplash.com/photo-1577985051167-0d49eec21977?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2978&q=80" clubLink = "https://www.facebook.com/psgtechbrc" />
            <ClubListing clubName = "Book Readers Club" clubDescription = "Smells like paper, right outta press" clubImage = "https://images.unsplash.com/photo-1577985051167-0d49eec21977?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2978&q=80" clubLink = "https://www.facebook.com/psgtechbrc" />
            <ClubListing clubName = "Book Readers Club" clubDescription = "Smells like paper, right outta press" clubImage = "https://images.unsplash.com/photo-1577985051167-0d49eec21977?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2978&q=80" clubLink = "https://www.facebook.com/psgtechbrc" />
            <ClubListing clubName = "Book Readers Club" clubDescription = "Smells like paper, right outta press" clubImage = "https://images.unsplash.com/photo-1577985051167-0d49eec21977?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2978&q=80" clubLink = "https://www.facebook.com/psgtechbrc" />
            <ClubListing clubName = "Book Readers Club" clubDescription = "Smells like paper, right outta press" clubImage = "https://images.unsplash.com/photo-1577985051167-0d49eec21977?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2978&q=80" clubLink = "https://www.facebook.com/psgtechbrc" />
            <ClubListing clubName = "Book Readers Club" clubDescription = "Smells like paper, right outta press" clubImage = "https://images.unsplash.com/photo-1577985051167-0d49eec21977?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2978&q=80" clubLink = "https://www.facebook.com/psgtechbrc" />

        </div>
    </Layout>
  );
};

export default Clubs;
