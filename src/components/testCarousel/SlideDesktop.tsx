import Image from "next/image";

interface SlideDesktopProps {
    url: string;
    page: string;
  }

//Le slide desktop est similaire au mobile mais prend en plus
// le prop page (home/user) pour déterminer la taille des images
export default function SlideDesktop({url, page}: SlideDesktopProps) {
  //En fonction du page, je set la taille des images
  //La page home correspond à 4 images dans le carousel
  if (page === "home") {
    return (
      //Le padding permet de créer un espace entre les images
        <Image className="flex-shrink-0 px-2" 
        alt="image test" 
        width={500} 
        //Cette prop sert à définir la hauteur à occuper dans la page tant que l'image n'est pas chargée
        //Elle doit correspondre à la hauteur de l'image
        height={480} 
        src={url}
          style={{
          //Le carousel desktop fait 84vw de large, donc je divise par 4 pour avoir la largeur d'une image
           width: `${21}vw`,
           height: `${480}px`,
           objectFit: "cover",
          }}
          />)
  //La page user correspond à 3 images dans le carousel
  } else if (page === "user") {
    return (
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
          />)
  }
};
