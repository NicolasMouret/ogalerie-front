import Image, { StaticImageData } from "next/image";

interface SlideMobileProps {
    url: StaticImageData;
    onClick: () => void;
  }

export default function SlideMobile({url, onClick}: SlideMobileProps) {
  return (
   <button onClick={onClick}>
    <Image className="flex-shrink-0 px-2" 
        alt="image test" 
        width={800} 
        height={350} 
        src={url}
          style={{
            //Le carousel desktop fait 84vw de large, donc je divise par 3 pour avoir la largeur d'une image
           width: `${28}vw`,
           height: `${350}px`,
           objectFit: "cover",
          }}
          />
   </button>)
};