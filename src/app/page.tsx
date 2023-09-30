"use client";

import Carousel from "@/src/components/testCarousel/Carousel";
import SearchBar from "../components/SearchBar/SearchBar";

const imageList = [
  { 
    id: "1",
    url: "https://picsum.photos/id/184/310/320"
},
  {
  id: "2",
  url: "https://picsum.photos/id/122/360/350",
},
  {
    id: "3",
  url: "https://picsum.photos/id/123/330/330"
},

  {
    id: "4",
  url: "https://picsum.photos/id/124/380/360"
},

  {
    id: "5",
  url: "https://picsum.photos/id/125/320/330"
},

  {
    id: "6",
  url: "https://picsum.photos/id/126/350/350"
},

  {
    id: "7",
  url: "https://picsum.photos/id/135/350/350"
},

  {
    id: "8",
  url: "https://picsum.photos/id/129/350/350"
},
  
  {
    id: "9",
  url: "https://picsum.photos/id/154/350/350"
},
  { 
    id: "10",
    url: "https://picsum.photos/id/121/310/320"
},
  {
  id: "11",
  url: "https://picsum.photos/id/122/360/350",
},
  {
    id: "12",
  url: "https://picsum.photos/id/123/330/330"
},

  {
    id: "13",
  url: "https://picsum.photos/id/124/380/360"
},

  {
    id: "14",
  url: "https://picsum.photos/id/125/320/330"
},
    { 
    id: "15",
    url: "https://picsum.photos/id/121/310/320"
},
  {
  id: "16",
  url: "https://picsum.photos/id/122/360/350",
},
  {
    id: "17",
  url: "https://picsum.photos/id/123/330/330"
},

  {
    id: "18",
  url: "https://picsum.photos/id/124/380/360"
},

  {
    id: "19",
  url: "https://picsum.photos/id/125/320/330"
},

];

export default function Home() {
  return (
    <>
      <section className="h-[75vh] flex flex-col items-center justify-center space-y-4">
        <div className="pb-8"> 
          <SearchBar />
        </div>
        <Carousel imageList={imageList} page="home" />        
      </section>
      <section className="h-screen flex flex-col">
        <Carousel imageList={imageList} page="user" />        
      </section> 
    </>
  );
}