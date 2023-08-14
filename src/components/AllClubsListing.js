import React from "react";
import Layout from "../pages/Layout";
import "../styles/gradientAnimation.css";

function ClubListing(props) {
  return (
    <React.Fragment>
      <a href={props.clubLink} className="hidden lg:block">
        <div className={'w-[18rem] h-[32rem] bg-white border-2 border-black rounded-3xl overflow-hidden flex flex-col'}>
          <div className="w-full flex justify-center">
            <img className={"rounded-t-lg hover:scale-110 ease-in-out duration-300 h-[17.75rem] object-contain"} src={props.clubImage} alt="club-logo" />
          </div>
          <div className={"p-4 pt-8"}>
            <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">{props.clubName}</h5>
            <p class="mb-3 font-normal text-gray-700"><i>{props.clubTagLine}</i></p>
          </div>
        </div>
      </a>

      <a href={props.clubLink} className="lg:hidden w-full">
        <div className={'w-full bg-white border-2 border-black rounded-2xl overflow-hidden flex flex-row'}>
          <div className="w-1/3 flex justify-center items-center p-2">
            <img className={"object-contain max-h-[6rem] rounded-lg"} src={props.clubImage} alt="club-logo" />
          </div>
          <div className={"w-2/3 p-4 flex flex-col justify-center"}>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 leading-6">{props.clubName}</h5>
            {props.clubTagLine && <p class="mb-3 font-normal text-sm text-gray-700"><i>{props.clubTagLine}</i></p>}
          </div>
        </div>
      </a>
    </React.Fragment>
  )
}

const ClubLoading = () => {
  return (
    <React.Fragment>
      <div className="hidden lg:block w-[18rem] h-[32rem] rounded-3xl overflow-hidden"
        id="skeleton-grid"
      >
        <div className="h-[16rem]"></div>
        <div className="bg-gray-500 h-12 w-3/4 ml-4 rounded-lg" id="skeleton"></div>
        <div className="bg-gray-500 h-12 w-1/2 ml-4 mt-4 rounded-lg" id="skeleton"></div>
        <div className="bg-gray-500 h-6 w-3/4 ml-4 mt-8 rounded-md" id="skeleton"></div>
      </div>

      <div className="lg:hidden w-full rounded-2xl overflow-hidden flex flex-row"
        id="skeleton-grid"
      >
        <div className="w-1/3 p-4">
          <div className="bg-gray-500 w-full h-full rounded-lg" id="skeleton"></div>
        </div>
        <div className="w-2/3 p-4 flex flex-col">
          <div className="bg-gray-500 h-10 w-3/4 ml-2 rounded-lg" id="skeleton"></div>
          <div className="bg-gray-500 h-6 w-1/2 ml-2 mt-2 rounded-md" id="skeleton"></div>
        </div>
      </div>
    </React.Fragment>
  )
}


const AllClubsListing = ({ title, data }) => {

  return (
    <Layout>
      <h1 className="text-4xl uppercase text-center mt-16">
        Our <span className="font-bold">{title}</span>
      </h1>
      <div className={'flex flex-wrap justify-center gap-6 lg:gap-8 px-6 lg:px-0 py-12'}>
        {
          data.length > 0 ? (
            data?.map((club) => {
              return (
                <ClubListing
                  clubName={club.clubName}
                  clubTagLine={(club.data?.tagline && club.data?.tagline !== "No tagline provided") ? club.data?.tagline : ""}
                  clubImage={club.image_url ? club.image_url : "https://upload.wikimedia.org/wikipedia/en/e/eb/PSG_College_of_Technology_logo.png"}
                  clubLink={`/club/${club.clubId}`}
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

export default AllClubsListing;
