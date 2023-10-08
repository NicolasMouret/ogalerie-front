"use client";
import { useEffect, useContext, useState } from 'react';
import axiosInstance from '@/src/utils/axios';
import Image from 'next/image';
import ArtworkInfos from "@/src/components/ArtworkInfos/Artwork";
import CommentsBlock from "@/src/components/Comments/Comments";
import { Artwork } from '@/src/@types';


interface ArtworkPageProps {
  params: {
    id: string;
  }
}


export default function ArtworkPage({params}: ArtworkPageProps) {
    const artworkId = params.id;
    const [userId, setUserId] = useState('');
    const [artwork, setArtwork] = useState<Artwork>();
    const [isFaves, setIsFaves] = useState<boolean>();
    const [isLiked, setIsLiked] = useState<boolean>();
    
    useEffect(() => {
        setUserId(localStorage.getItem('id')!);
    }, []);
    
    useEffect(() => {
        const getArtwork = (id: string) => {
            axiosInstance.get(`/artworks/${id}`)
            .then((res) => {
                console.log("res.data", res.data);
                setArtwork(res.data);
                setIsFaves(res.data.favorite_by === 0 ? false : true);
                setIsLiked(res.data.liked_by === 0 ? false : true);
                console.log("tags", res.data.tags[0].name);
            })
            .catch((err) => {
                console.log(err);
            })
        }
        getArtwork(artworkId);
    }, []);

  return (
    <>
    {artwork && userId && 
    <div className="flex flex-col md:flex-row items-center gap-6 mx-auto mt-4 md:pl-8 md:mt-0 h-[85vh] w-[90vw]">
        <Image
        className="mx-auto md:mx-0"
        src={artwork.uri}
        alt="image"
        width={600}
        height={600}
        />
     <div className="flex flex-col">
        <ArtworkInfos
            setIsFaves={setIsFaves}
            setIsLiked={setIsLiked}
            isFaves={isFaves!}
            isLiked={isLiked!}
            userId={userId}
            artworkId={artworkId}
            title={artwork.title} 
            likes={artwork.likes} 
            author={artwork.owner} 
            date={artwork.date}
            typeTag={artwork.tags[0] === undefined ? '' : `#${artwork.tags[0].name}`}
            support={artwork.tags[1] === undefined ? '' : `#${artwork.tags[1].name}`}
            style={artwork.tags[2] === undefined ? '' : `#${artwork.tags[2].name}`}
            description={artwork.description}/>
        <CommentsBlock comments={artwork.comment} />
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