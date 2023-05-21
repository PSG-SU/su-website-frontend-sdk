import React, { useEffect, useState } from 'react'
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { ABOUT_URL } from '../API/config';
import axios from 'axios';
import Layout from "./Layout.js";

const ByLaw = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(ABOUT_URL)
      .then((res) => {
        setContent(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    document.title = "SU By Law | PSG College of Technology"
  }, [])

  return (
    <Layout>
      <h1 className="text-4xl uppercase text-center mt-16 w-full">
        SU <span className="font-bold">By Law</span>
      </h1>
      <div className='w-full flex justify-center'>
        <div className="mt-8 h-[calc(100vh-6rem)] w-full px-4 lg:px-0 lg:w-3/4 bg-gray-50">
          {content?.file_url && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
              <Viewer fileUrl={content?.file_url}
                plugins={[defaultLayoutPluginInstance]}></Viewer>
            </Worker>
          )}

          {!content?.file_url && <div className='w-full flex justify-center bg-gray-50'>
            <img src="https://i.ibb.co/PZLc3WF/wired-outline-334-loader-5.gif" width={"100px"} alt="Loading..." border="0" />
          </div>}

        </div>
      </div>
    </Layout>
  )
}

export default ByLaw