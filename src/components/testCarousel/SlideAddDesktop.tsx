import Image from "next/image";
import add from '@/src/assets/images/add.png';

interface SlideMobileProps {
    onClick: () => void;
  }

export default function SlideMobile({onClick}: SlideMobileProps) {
  return (
   <button className="flex-shrink-0" onClick={onClick}>
    <Image className="flex-shrink-0 px-2" 
        alt="image test" 
        width={800} 
        height={350} 
        src='/add.png'
          style={{
            //Le carousel desktop fait 84vw de large, donc je divise par 3 pour avoir la largeur d'une image
           width: `${28}vw`,
           height: `${350}px`,
           objectFit: "cover",
          }}
          />
   </button>)
};