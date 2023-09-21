"use client";

import { nanoid } from "nanoid";
import Image from "next/image";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import CarouselButton from "../Buttons/CarouselButton";
import { useRef } from "react";


const items = [
    <Image key={nanoid()} alt="image test" width={300} height={300} src="https://picsum.photos/seed/picsum/200/300" />,
    <Image key={nanoid()} alt="image test" width={300} height={300} src="https://picsum.photos/seed/picsum/200/300" />,
    <Image key={nanoid()} alt="image test" width={300} height={300} src="https://picsum.photos/seed/picsum/200/300" />,
    <Image key={nanoid()} alt="image test" width={300} height={300} src="https://picsum.photos/seed/picsum/200/300" />,
    <Image key={nanoid()} alt="image test" width={300} height={300} src="https://picsum.photos/seed/picsum/200/300" />,
];

export default function TestCarousel() {
    const carousel = useRef<AliceCarousel>(null);
    return (
        <div className="flex relative px-6">
            <button className="absolute my-auto -left-1 top-0 bottom-0 z-10" onClick={(e) => carousel?.current?.slidePrev(e)}>
            <CarouselButton direction="left"/>
            </button>
            <AliceCarousel   
            ref={carousel}        
            items={items}
            disableDotsControls
            disableButtonsControls
            responsive={{ 1024: { items: 4 }}}
        />
            <button className="absolute my-auto right-2 top-0 bottom-0 z-10" onClick={(e) => carousel?.current?.slideNext(e)}>
            <CarouselButton direction="right"/>
            </button>
        </div>
    );
}
