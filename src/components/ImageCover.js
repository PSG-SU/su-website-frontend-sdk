import React from 'react'
import GLightbox from 'glightbox';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const ImageCover = ({ coverImage, title, report, className, imgClassName, allImages, club = false }) => {
  const imagesJSON = allImages?.map((img) => {
    const formattedReport = report?.replace(/(?:\r\n|\r|\n)/g, '<br>');
    
    return club ? {
      'src': img,
      'type': 'image',
      'title': title,
      'caption': title.toUpperCase() + ": " + formattedReport,
      'descPosition': 'right',
    } : {
      'src': img,
      'type': 'image',
    }
  });

  const myGallery = GLightbox({
    elements: imagesJSON,
    autoplayVideos: true,
  });

  return (
    <button
      className={`${className} w-full h-full rounded-xl overflow-hidden relative group`}
      onClick={() => {
        // myGallery.open();
        new Fancybox(imagesJSON, {
          wheel: false,
          commonCaption: true,
        }).open();
      }}
    >
      <img src={coverImage} alt="img" className={`${imgClassName} w-full h-full object-cover rounded-xl group-hover:scale-105 transition-all ease-in-out`} />
      <div className='absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black opacity-50 rounded-xl'></div>
      <p className={`absolute bottom-2 ${club ? 'lg:bottom-2' : 'lg:bottom-4'} left-4 font-semibold text-gray-200 text-left uppercase z-10`}>{title}</p>
    </button>
  )
}

export default ImageCover