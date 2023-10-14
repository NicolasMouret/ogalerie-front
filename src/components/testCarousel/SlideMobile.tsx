import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface SlideMobileProps {
    url: string | StaticImageData;
    artworkId: string;
  }

export default function SlideMobile({ url, artworkId }: SlideMobileProps) {
  return (
    <Link className="flex-shrink-0 snap-center w-[91vw]" href={`/artwork/${artworkId}`}>
      <Image
        alt="image test"
        width={400}
        height={350}
        src={url}
        style={{
        // Ici je set la largeur de l'image à 90% de la largeur de l'écran pour coller avec la largeur
        // de la div qui affiche le carousel, puisque une image est affichée à la fois
          width: `${90}vw`,
          height: `${350}px`,
          // Je set objectFit à cover pour que l'image soit redimensionnée pour couvrir toute la div
          // à voir à terme si ça rend bien avec tout
          objectFit: 'cover',
        }}
      />
    </Link>
  );
}
