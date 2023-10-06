"use client";
import { useEffect, useContext, useState } from 'react';
import axiosInstance from '@/src/utils/axios';
import Image from 'next/image';
import ArtworkInfos from "@/src/components/ArtworkInfos/Artwork";
import CommentsBlock from "@/src/components/Comments/Comments";

interface ArtworkPageProps {
  params: {
    id: string;
  }
}

interface tags {
    category: string;
    name: string;
}

interface comment {
    id: number;
    content: string;
    created_at: string;
    owner: string;
    owner_id: number;
}

interface Artwork {
    id: number;
    title: string;
    description: string;
    date: string;
    owner: string;
    uri: string;
    likes: number;
    comment: comment[];
    tags: tags[];
    owner_id: number;
    liked_by: number;
    favorite_by: number;
}


export default function ArtworkPage({params}: ArtworkPageProps) {
    const id = params.id;
    const [artwork, setArtwork] = useState<Artwork>();
  
    const getArtwork = (id: string) => {
        axiosInstance.get(`/artworks/${id}`)
        .then((res) => {
            console.log("res.data", res.data);
            setArtwork(res.data);
            console.log("tags", res.data.tags[0].name);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        getArtwork(id);
    }, []);

  return (
    <>
    {artwork && 
    <div className="flex flex-col md:flex-row items-center gap-6 mx-auto mt-4 md:pl-8 md:mt-0 h-[85vh] w-[90vw]">
    <Image
      className="mx-auto md:mx-0"
      src={artwork.uri}
      alt="image"
      width={600}
      height={600}
     />
     <div className="flex flex-col ">
      <ArtworkInfos
      title={artwork.title} 
      likes={2} 
      author={artwork.owner} 
      date={artwork.date}
      typeTag={''}
      support={''}
      style={''}
      description={artwork.description}/>
      <CommentsBlock />
     </div>
  </div>}
    </>
  );
}

// collection: "Lemonade"
// ​
// collection_id: 1
// ​
// comment: Array [ {…} ]
// ​
// created_at: "2023-10-03T17:00:54.278119+02:00"
// ​
// date: "2016-04-23"
// ​
// description: "photo de l'album Lemonade"
// ​
// favorite_by: 0
// ​
// id: 1
// ​
// liked_by: 0
// ​
// likes: 1
// ​
// mature: null
// ​
// owner: "Beyonce"
// ​
// owner_id: 2
// ​
// tags: Array [ {…} ]
// ​
// title: "cover"
// ​
// updated_at: null
// ​
// uri: "https://upload.wikimedia.org/wikipedia/en/5/53/Beyonce_-_Lemonade_%28Official_Album_Cover%29.png"