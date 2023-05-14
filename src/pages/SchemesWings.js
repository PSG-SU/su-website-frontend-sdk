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
      <div className={'flex flex-wrap justify-center gap-12 px-12 lg:px-0 py-12'}>
        <div className="w-full bg-gray-200 rounded-2xl flex flex-row py-12 items-center shadow-md">

          <div className="w-1/2 flex flex-col items-center gap-12">
            <img className="h-44 w-44" src="/assets/Schemes/nsslogo.png" alt="nss-logo" />
            <p className="text-3xl text-center uppercase tracking-wider font-poppins font-semibold">National Service Scheme</p>
            <p className="text-2xl tracking-wide font-poppins -mt-6">Programme Officers</p>
          </div>

          <div className="w-1/2 flex flex-col items-center gap-8">
            {
              nss.length > 0 ? (
                nss?.map((n) => {
                  return (
                    <div className="w-full flex justify-center">
                      <div className="flex flex-col gap-2 items-center">
                        <div className="flex flex-row items-center gap-4">
                          <p className="text-2xl tracking-wide font-semibold font-poppins">{n.name}</p>
                          <p className="text-7xl leading-3 -mt-2 text-gray-700">·</p>
                          <p className="text-xl font-poppins text-gray-700">{n.dept}</p>
                        </div>
                        {/* <div className="h-0.5 w-[30%] bg-gray-400"></div> */}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="w-full flex flex-col items-center gap-4">
                  {[...Array(4)].map((i) => (
                    <div className="w-full flex flex-row items-center justify-center gap-8">
                      <div className="w-1/3 h-12 rounded-lg" id="skeleton"></div>
                      <div className="w-1/3 h-8 rounded-md" id="skeleton"></div>
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-2xl flex flex-row py-12 items-center shadow-md">

          <div className="w-1/2 flex flex-col items-center gap-12">
            <img className="h-44" src="/assets/Schemes/ncclogo.png" alt="ncc-logo" />
            <p className="text-3xl text-center uppercase tracking-wider font-poppins font-semibold">National Cadet Corps</p>
            <p className="text-2xl tracking-wide font-poppins -mt-6">NCC Officers</p>
          </div>

          <div className="w-1/2 flex flex-col items-center gap-8">
            {
              ncc.length > 0 ? (
                ncc?.map((n) => {
                  return (
                    <div className="w-full flex justify-center">
                      <div className="flex flex-col gap-2 items-center">
                        <div className="flex flex-row items-center gap-4">
                          <p className="text-2xl tracking-wide font-semibold font-poppins">{n.name}</p>
                          <p className="text-7xl leading-3 -mt-2 text-gray-700">·</p>
                          <p className="text-xl font-poppins text-gray-700">{n.dept}</p>
                        </div>
                        <p className="text-l font-poppins text-gray-700">{n.role}</p>
                        {/* <div className="h-0.5 w-[30%] bg-gray-400"></div> */}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="w-full flex flex-col items-center gap-4">
                  {[...Array(4)].map((i) => (
                    <div className="w-full flex flex-row items-center justify-center gap-8">
                      <div className="w-1/3 h-12 rounded-lg" id="skeleton"></div>
                      <div className="w-1/3 h-8 rounded-md" id="skeleton"></div>
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
