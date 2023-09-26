"use client";

import { useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import Image from "next/image";

import CarouselButton from "../Buttons/CarouselButton";

interface ImageProps {
  id: string;
  url: string;
}

interface SlideProps {
  url: string;
  size: number;
}

interface TestCarouselProps {
  imageList: ImageProps[];
}

//Takes a URL and a height in pixels and returns an image component for the carousel
const Slide = ({url, size}: SlideProps) => {
  if (size > 768) {
    return (
      <Image className="flex-shrink-0 px-2" 
      alt="image test" 
      width={1500} 
      height={400} 
      src={url}
        style={{
          width: `${29}vw`,
          height: `${400}px`,
          objectFit: "cover",
        }}
       />)
  }
  else {
    return (
  <Image className="flex-shrink-0" 
  alt="image test" 
  width={400} 
  height={350} 
  src={url}
    style={{
      width: `${90}vw`,
      height: `${350}px`,
      objectFit: "cover",
    }}
   />)
  }
};



// Takes a list of Slide components as children and returns a carousel component
export default function TestCarousel({imageList}: TestCarouselProps){
  const size = useWindowSize();
  const slides = imageList.map((imageList) => {
    return <Slide key={imageList.id} url={imageList.url} size={size.width || 500}/>;
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  const previousSlide = () => {
    if (currentSlide === 0) {
      return;
    }
    setCurrentSlide(currentSlide - 1);
  }

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      return;
    }
    setCurrentSlide(currentSlide + 1);
    console.log(currentSlide);
  }

  return (
    <div className="relative w-screen mb-24 lg:w-[90%] ">
      <div className="w-[90vw] mx-auto lg:w-[87vw] overflow-hidden">
      <div className="flex transition-transform ease-out duration-500 "
          style={{transform: `translateX(-${currentSlide*100}%)`}}>
        {slides}
      </div>     
    </div>
    {currentSlide > 0 && <CarouselButton direction="left" className="text-4xl absolute top-1/2 -translate-y-1/2" onClick={previousSlide} />}
    {size.width || 500 < 768 ? currentSlide < slides.length - 1 && <CarouselButton direction="right" className="text-4xl absolute right-0 top-1/2 -translate-y-1/2" onClick={nextSlide}/> : 
    currentSlide < (slides.length/3) - 1 && <CarouselButton direction="right" className="text-4xl absolute right-0 top-1/2 -translate-y-1/2" onClick={nextSlide}/> }
    </div>     

  );
}
