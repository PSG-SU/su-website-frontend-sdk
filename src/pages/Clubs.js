import axios from "axios";
import React, { useEffect, useState } from "react";
import { TbExternalLink } from "react-icons/tb";
import { Link } from "react-router-dom";
import Layout from "./Layout.js";
import { fetchAllClubsLogo } from "../API/calls.js";

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
        <div className={'grid grid-cols-4 gap-10 '}>
            <div className={'w-130 h-80 border-2 rounded-2xl font-bold bg-[#ABCDEF]'}>Column1</div>
            <div className={'w-130 h-80 border-2 rounded-2xl font-bold bg-[#ABCDEF]'}>Column2</div>
            <div className={'w-130 h-80 border-2 rounded-2xl font-bold bg-[#ABCDEF]'}>Column3</div>
            <div className={'w-130 h-80 border-2 rounded-2xl font-bold bg-[#ABCDEF]'}>Column4</div>
            <div className={'w-130 h-80 border-2 rounded-2xl font-bold bg-[#ABCDEF]'}>Column5</div>
            <div className={'w-130 h-80 border-2 rounded-2xl font-bold bg-[#ABCDEF]'}>Column6</div>

        </div>
    </Layout>
  );
};

export default Clubs;
