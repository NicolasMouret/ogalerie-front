import axiosInstance from '@/src/utils/axios';
import Image from 'next/image';
import ArtworkInfos from "@/src/components/ArtworkInfos/Artwork";
import CommentsBlock from "@/src/components/Comments/Comments";

interface ArtworkPageProps {
  params: {
    id: string;
    userId: string;
  }
}

const getArtworks = async (userId: string) => {
  const res = await axiosInstance.get(`/users/${userId}/artworks`);
  console.log(res.data);
  return res.data;
}



export default async function ArtworkPage({params}: ArtworkPageProps) {
  const artworks = await getArtworks(params.userId);
  const { title, uri, description, date } = artworks[0];
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 mx-auto mt-4 md:pl-8 md:mt-0 h-[85vh] w-[90vw]">
      <Image
        className="mx-auto md:mx-0"
        src={uri}
        alt="image"
        width={600}
        height={600}
       />
       <div className="flex flex-col ">
        <ArtworkInfos
        title={title} 
        likes={2} 
        author="King Kong" 
        date={date}
        typeTag="aquarelle" 
        support="papier" 
        style="portrait" 
        description={description}/>
        <CommentsBlock />
       </div>
    </div>
  );
}