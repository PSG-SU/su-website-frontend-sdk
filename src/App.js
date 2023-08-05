import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClubLanding from "./pages/ClubLanding";
import Clubs from "./pages/Clubs";
import Associations from "./pages/Associations";
import Gallery from "./pages/Gallery";
import Landing from "./pages/Landing";
import OurTeam from "./pages/OurTeam";
import "./styles/tailwind.output.css";
import SUFeed from "./pages/SUFeed";
import ByLaw from "./pages/ByLaw";
import { Toaster } from "react-hot-toast";
import SchemesWings from "./pages/SchemesWings";
import YearGallery from "./pages/YearGallery";

const App = () => {
  return (
    <React.Fragment>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="team" element={<OurTeam />} />
          {/* <Route path="gallery2" element={<Gallery />} /> */}
          <Route path="club/:id" element={<ClubLanding />} />
          <Route path="feed" element={<SUFeed />} />
          <Route path="clubs" element={<Clubs />} />
          <Route path="associations" element={<Associations />} />
          <Route path="schemes-and-wings" element={<SchemesWings />} />
          <Route path="by-law" element={<ByLaw />} />
          <Route path="gallery" element={<YearGallery />} />
          <Route index element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
