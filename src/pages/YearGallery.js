import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { GALLERY_URL } from "../API/config";
import axios from 'axios';
import ImageCover from '../components/ImageCover';

const YearGallery = () => {
  const [yearWise, setYearWise] = useState(null);

  axios.get(`${GALLERY_URL}`).then((res) => {
    let events = res.data.message;
    let yearWise = {};

    events.forEach((event) => {
      let year = event.year;

      if (year in yearWise) {
        yearWise[year].push(event);
      } else {
        yearWise[year] = [event];
      }
    });
    setYearWise(yearWise);

  });

  return (
    <Layout>
      <div className="p-8 px-6 pt-0 w-full">
        <h1 className="text-4xl uppercase text-center mt-16 w-full">
          Our <span className="font-bold">Gallery</span>
        </h1>

        <div className='font-poppins'>
          {yearWise && Object.keys(yearWise).sort().reverse().map((year) => (
            <React.Fragment>
              <YearTitle className={''} title={year} />
              <YearAccordion yearObj={yearWise[year]} year={year} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </Layout>
  )
}

const YearTitle = ({ className, title }) => {
  return (
    <div className={`${className} w-fit`}>
      <p className='text-3xl lg:text-6xl font-semibold mt-16'>{title}</p>
      <div className='w-[75%] h-1 rounded-full bg-black mt-1 lg:mt-2'></div>
    </div>
  )
}

const YearAccordion = ({ yearObj, year }) => {
  const titles = yearObj.map((e) => { return e.event })
  const coverImages = yearObj.map((e) => { return e.image_url })
  const allImages = yearObj.map((e) => { return e.images })

  return (
    <React.Fragment>
      <div className='hidden lg:flex'>
        {
          yearObj.length > 4 ? (
            <MoreImages
              titles={titles}
              coverImages={coverImages}
              allImages={allImages}
              index={year}
            />
          ) : yearObj.length === 4 ? (
            <FourImage
              titles={titles}
              allImages={allImages}
              coverImages={coverImages}
            />
          ) : yearObj.length === 3 ? (
            <ThreeImage
              titles={titles}
              allImages={allImages}
              coverImages={coverImages}
            />
          ) : yearObj.length < 3 && (
            <TwoImage
              titles={titles}
              allImages={allImages}
              coverImages={coverImages}
              text={'4xl'}
            />
          )
        }
      </div>

      <div className='lg:hidden flex flex-row h-[calc(25vh)] gap-2 overflow-auto rounded-xl text-xl pt-4' id={'slider' + year}>
        {coverImages.map((img, i) => {
          return (<ImageCover coverImage={img} title={titles[i]} className={'min-w-fit w-[calc(70vw)]'} imgClassName={'w-[calc(75vw)]'} allImages={allImages[i]} />)
        })}
      </div>
    </React.Fragment>
  )
}

const TwoImage = ({ titles, coverImages, text, allImages }) => {
  return (
    <div className={`w-full h-[calc(60vh)] flex flex-row mt-8 gap-2 text-${text}`}>
      {coverImages.map((img, i) => {
        return (<ImageCover coverImage={img} title={titles[i]} allImages={allImages[i]} />)
      })}
    </div>
  )
}

const ThreeImage = ({ titles, coverImages, allImages }) => {
  return (
    <div className={`h-[calc(50vh)] flex flex-row mt-8 gap-2`}>
      <div className='w-2/3 text-3xl'>
        <ImageCover coverImage={coverImages[0]} title={titles[0]} allImages={allImages[0]} />
      </div>
      <div className='w-1/3 flex flex-col gap-2 text-2xl'>
        <ImageCover coverImage={coverImages[1]} title={titles[1]} allImages={allImages[1]} />
        <ImageCover coverImage={coverImages[2]} title={titles[2]} allImages={allImages[2]} />
      </div>
    </div>
  )
}

const FourImage = ({ titles, coverImages, allImages }) => {
  return (
    <div className={`h-[calc(50vh)] flex flex-row mt-8 gap-2`}>
      <div className='w-1/3 flex flex-row gap-2 text-3xl'>
        <ImageCover coverImage={coverImages[0]} title={titles[0]} allImages={allImages[0]} />
      </div>
      <div className='w-1/3 flex flex-row gap-2 text-3xl'>
        <ImageCover coverImage={coverImages[1]} title={titles[1]} allImages={allImages[1]} />
      </div>
      <div className='w-1/3 flex flex-col gap-2 text-2xl'>
        <ImageCover coverImage={coverImages[2]} title={titles[2]} allImages={allImages[2]} />
        <ImageCover coverImage={coverImages[3]} title={titles[3]} allImages={allImages[3]} />
      </div>
    </div>
  )
}

const MoreImages = ({ titles, coverImages, index, allImages }) => {
  const [imgPos, setImgPos] = useState("left");
  const [arrowsHidden, setArrowsHidden] = useState(false);

  useEffect(() => {
    const slider = document.getElementById('slider' + index);
    if (slider) {
      slider.addEventListener('scroll', () => {
        const scrollLeft = slider?.scrollLeft;
        const scrollWidth = slider?.scrollWidth;
        const clientWidth = slider?.clientWidth;
        console.log(scrollLeft, scrollWidth, clientWidth);

        if (scrollLeft === 0) {
          setImgPos("left");
        } else if (scrollLeft - 2 <= scrollWidth - clientWidth && scrollLeft + 2 >= scrollWidth - clientWidth) {
          setImgPos("right");
        } else {
          setImgPos("middle");
        }
      });
    }

    if (slider?.scrollWidth === slider?.clientWidth) {
      setArrowsHidden(true);
    }

  }, [coverImages, index]);

  return (
    <div className='flex flex-col gap-2 mt-8'>
      <div className='h-[calc(50vh)] flex flex-row gap-2'>
        <div className='w-2/3 text-3xl'>
          <ImageCover coverImage={coverImages[0]} title={titles[0]} allImages={allImages[0]} />
        </div>
        <div className='w-1/3 flex flex-col gap-2 text-2xl'>
          <ImageCover coverImage={coverImages[1]} title={titles[1]} allImages={allImages[1]} />
          <ImageCover coverImage={coverImages[2]} title={titles[2]} allImages={allImages[2]} />
        </div>
      </div>
      <div className='flex flex-row h-[calc(25vh)] gap-2 overflow-auto rounded-xl text-xl' id={'slider' + index}>
        {coverImages.slice(3).map((img, i) => {
          return (<ImageCover coverImage={img} title={titles[i + 3]} className={'min-w-fit'} imgClassName={''} allImages={allImages[i + 3]} />)
        })}
      </div>

      {!arrowsHidden && (
        <div className='w-full flex justify-end gap-6 pr-4 pt-2 text-4xl'>
          <div className='w-10'>
            <button className={`${imgPos === 'left' ? 'text-gray-300' : 'text-gray-700'}`}
              onClick={() => {
                const slider = document.getElementById('slider' + index);
                slider.scrollBy({
                  left: -slider.clientWidth / 2,
                  behavior: 'smooth'
                })
              }}
            >
              <BsArrowLeftCircle />
            </button>
          </div>
          <div className='w-10'>
            <button className={`${imgPos === 'right' ? 'text-gray-300' : 'text-gray-700'}`}
              onClick={() => {
                const slider = document.getElementById('slider' + index);
                slider.scrollBy({
                  left: slider.clientWidth / 2,
                  behavior: 'smooth'
                })
              }}
            >
              <BsArrowRightCircle />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default YearGallery