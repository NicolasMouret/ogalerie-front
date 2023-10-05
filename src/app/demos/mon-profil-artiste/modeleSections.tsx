"use client";
import { useRef } from "react";
import TestCarousel from "../../components/testCarousel/TestCarousel";
import ScrollButton from "@/src/components/Buttons/ScrollButton";

 
const urlList1 = [
  "https://picsum.photos/id/984/260/200",
  "https://picsum.photos/id/141/320/360",
  "https://picsum.photos/id/541/390/370",
  "https://picsum.photos/id/814/360/340",
  "https://picsum.photos/id/681/370/310",
  "https://picsum.photos/id/252/350/350",
  "https://picsum.photos/id/423/330/350",
  "https://picsum.photos/id/354/350/350",
  "https://picsum.photos/id/356/350/350",
];

const urlList2 = [
  "https://picsum.photos/id/954/350/350",
  "https://picsum.photos/id/541/350/350",
  "https://picsum.photos/id/545/350/350",
  "https://picsum.photos/id/514/350/350",
  "https://picsum.photos/id/651/350/350",
  "https://picsum.photos/id/552/350/350",
  "https://picsum.photos/id/425/350/350",
  "https://picsum.photos/id/654/350/350",
  "https://picsum.photos/id/556/350/350",
];

const urlList3 = [
  "https://picsum.photos/id/454/350/350",
  "https://picsum.photos/id/531/350/350",
  "https://picsum.photos/id/544/350/350",
  "https://picsum.photos/id/415/350/350",
  "https://picsum.photos/id/661/350/350",
  "https://picsum.photos/id/252/350/350",
  "https://picsum.photos/id/525/350/350",
  "https://picsum.photos/id/354/350/350",
  "https://picsum.photos/id/546/350/350",
];

const urlLists = [urlList1, urlList2, urlList3];

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const sections = urlLists.map((urlList, index) => ({
    urlList,
    id: `section-${index}`,
  }));
  
  const scrollToNextViewport = () => {
    if (scrollContainerRef.current) {     
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollTop + window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  const scrollToPreviousViewport = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollTop - window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="overflow-y-auto h-screen snap-y snap-mandatory" ref={scrollContainerRef}>
      {sections.map((section, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-around h-screen snap-start"
          id={section.id}
        >
          {index > 0 && <ScrollButton direction="up" onClick={scrollToPreviousViewport} />}        
          <TestCarousel
            slidesNb={3}
            heightPx={400}
            urlList={section.urlList}
          />
          {index < sections.length - 1 && (<ScrollButton direction="down" onClick={scrollToNextViewport} />)}
        </div>
      ))}
    </main>
  );
}