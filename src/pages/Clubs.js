import React, { useEffect, useState } from "react";
import { fetchAllClubsLogo } from "../API/calls.js";
import AllClubsListing from "../components/AllClubsListing.js";

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

  return (
    <AllClubsListing
      title={'Clubs'}
      data={clubs}
    />
  );
};

export default Clubs;
