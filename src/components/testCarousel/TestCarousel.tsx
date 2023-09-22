"use client";

import { nanoid } from "nanoid";
import Image from "next/image";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import CarouselButton from "../Buttons/CarouselButton";
import { useRef } from "react";

interface SlideProps {
  url: string;
  heightPx: number;
}

interface TestCarouselProps {
  slidesNb: number;
  heightPx: number;
}

//Ideally, the images we use for the carousel would all be 350x350 
const urlList = [
  "https://picsum.photos/id/121/350/350",
  "https://picsum.photos/id/122/350/350",
  "https://picsum.photos/id/123/350/350",
  "https://picsum.photos/id/124/350/350",
  "https://picsum.photos/id/125/350/350",
  "https://picsum.photos/id/126/350/350",
  "https://picsum.photos/id/135/350/350",
  "https://picsum.photos/id/129/350/350",
  "https://picsum.photos/id/154/350/350",
];

//Takes a URL and a height in pixels and returns an image component for the carousel
const Slide = ({url, heightPx}: SlideProps) => {
  return (
    <Image className="mx-auto" 
    key={nanoid()} 
    alt="image test" 
    width={350} 
    height={350} 
    src={url}
      style={{
        width: "90%",
        height: `${heightPx}px`,
        objectFit: "fill"
      }}
     />
  )
}



//Takes a number of slides and a height in pixels and returns a carousel component
export default function TestCarousel({slidesNb, heightPx}: TestCarouselProps) {
    const carousel = useRef<AliceCarousel>(null);
    return (
        <div className="flex relative  ">
            <button className="absolute my-auto -left-2 top-0 bottom-0 z-10" onClick={(e) => carousel?.current?.slidePrev(e)}>
            <CarouselButton direction="left"/>
            </button>
            <AliceCarousel  
            ref={carousel}        
            items={urlList.map((url) => (
              <Slide url={url} heightPx={heightPx} />
            ))}
            disableDotsControls
            disableButtonsControls
            responsive={{ 1024: { items: slidesNb }}}
        />
            <button className="absolute my-auto -right-2 top-0 bottom-0 z-10" onClick={(e) => carousel?.current?.slideNext(e)}>
            <CarouselButton direction="right"/>
            </button>
        </div>
    );
}
