import ArtworkInfos from "@/src/components/ArtworkInfos/Artwork";
import CommentsBlock from "@/src/components/Comments/Comments";
import Image from 'next/image';

export default function ArtworkPage() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 mx-auto mt-4 md:pl-8 md:mt-0 h-[85vh] w-[90vw]">
      <Image
        className="mx-auto md:mx-0"
        src="https://picsum.photos/id/502/500/600"
        alt="image"
        width={600}
        height={600}
       />
       <div className="flex flex-col ">
        <ArtworkInfos
        title="Fée mystique" 
        likes={156} 
        author="King Kong" 
        date="2023" 
        typeTag="aquarelle" 
        support="papier" 
        style="portrait" 
        description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Autem aliquid voluptatum consectetur quaerat tenetur officiis eveniet sint explicabo repellat, 
        eaque aperiam dolor. Eius eveniet sint quia hic adipisci? Accusantium, ipsa."/>
        <CommentsBlock />
       </div>
    </div>
  );
}