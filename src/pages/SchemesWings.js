import React, { useEffect, useState } from "react";
import Layout from "./Layout.js";
import { NSS_NCC_URL } from "../API/config.js";
import axios from "axios";
import "../styles/gradientAnimation.css";

const SchemesWings = () => {
  const [nss, setNss] = useState({});
  const [ncc, setNcc] = useState({});

  useEffect(() => {
    axios.get(`${NSS_NCC_URL}`).then((res) => {
      setNss(res.data.filter(i => i.scheme === "NSS").sort((a, b) => a.priority - b.priority));
      setNcc(res.data.filter(i => i.scheme === "NCC").sort((a, b) => a.priority - b.priority));
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl uppercase text-center mt-16">
        Schemes & <span className="font-bold">Wings</span>
      </h1>
      <div className={'flex flex-wrap justify-center gap-12 px-6 lg:px-0 py-12'}>
        <div className="w-full bg-gray-200 rounded-2xl flex flex-col lg:flex-row py-12 px-6 items-center shadow-md gap-12 lg:gap-6">

          <div className="w-full lg:w-1/2 flex flex-col items-center gap-12 text-center">
            <img className="w-44 lg:h-44" src="/assets/Schemes/nsslogo.png" alt="nss-logo" />
            <p className="text-3xl uppercase tracking-wider font-poppins font-semibold">National Service Scheme</p>
            <p className="text-2xl tracking-wide font-poppins -mt-8">Programme Officers</p>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-center gap-8">
            {
              nss?.length > 0 ? (
                nss?.map((n) => {
                  return (
                    <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-4 text-center">
                      <p className="text-2xl tracking-wide font-semibold font-poppins">{n.name}</p>
                      <p className="hidden lg:block text-7xl leading-3 -mt-2 text-gray-700">·</p>
                      <p className="text-xl font-poppins text-gray-700">{n.dept}</p>
                    </div>
                  )
                })
              ) : (
                <div className="w-full flex flex-col items-center gap-8">
                  {[...Array(4)].map((i) => (
                    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
                      <div className="w-3/4 lg:w-1/3 h-12 rounded-lg" id="skeleton"></div>
                      <div className="w-1/2 lg:w-1/3 h-8 rounded-md" id="skeleton"></div>
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-2xl flex flex-col lg:flex-row py-12 px-6 items-center shadow-md gap-12 lg:gap-6">

          <div className="w-full lg:w-1/2 flex flex-col items-center gap-12 text-center">
            <img className="h-44" src="/assets/Schemes/ncclogo.png" alt="ncc-logo" />
            <p className="text-3xl uppercase tracking-wider font-poppins font-semibold">National Cadet Corps</p>
            <p className="text-2xl tracking-wide font-poppins -mt-8">NCC Officers</p>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col items-center gap-10">
            {
              ncc?.length > 0 ? (
                ncc?.map((n) => {
                  return (
                    <div className="flex flex-col gap-1 items-center text-center">
                      <div className="flex flex-col lg:flex-row items-center gap-1 lg:gap-4">
                        <p className="text-2xl tracking-wide font-semibold font-poppins">{n.name}</p>
                        <p className="hidden lg:block text-7xl leading-3 -mt-2 text-gray-700">·</p>
                        <p className="text-xl font-poppins text-gray-700">{n.dept}</p>
                      </div>
                      <p className="font-poppins text-gray-700">{n.role}</p>
                    </div>
                  )
                })
              ) : (
                <div className="w-full flex flex-col items-center gap-8">
                  {[...Array(4)].map((i) => (
                    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
                      <div className="w-3/4 lg:w-1/3 h-12 rounded-lg" id="skeleton"></div>
                      <div className="w-1/2 lg:w-1/3 h-8 rounded-md" id="skeleton"></div>
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SchemesWings;
