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
        <div className="mt-4 h-[calc(100vh-6rem)] w-full px-4 lg:px-0 lg:w-3/4">
          {content[0]?.file_url && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
              <Viewer fileUrl={content[0]?.file_url}
                plugins={[defaultLayoutPluginInstance]}></Viewer>
            </Worker>
          )}

          {!content[0]?.file_url && <div className='text-center'>Unable to load file</div>}

        </div>
      </div>
    </Layout>
  )
}

export default ByLaw