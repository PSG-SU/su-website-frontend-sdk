import React, { useEffect, useState } from "react";
import { fetchAllClubsLogo } from "../API/calls.js";
import AllClubsListing from "../components/AllClubsListing.js";

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
    <AllClubsListing
      title={'Associations'}
      data={assoc}
    />
  );
};

export default Associations;
