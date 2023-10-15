export default function InformationPage() {
  return (
    <div
      className="flex flex-col items-center justify-center mt-[-30px] h-[75vh] lg:mt-0 bg-background bg-cover bg-center border-black border-t-4 border-4"
    >
      <h1 className="text-sm sm:text-md md:text-xl lg:text-2xl xl:text-4xl  font-bold lg:pb-10 mb-5">
        À propos
      </h1>
      <p className="text-justify max-w-6xl indent-4 text-sm sm:text-md md:text-xl lg:text-2xl xl:text-3xl ">
        O’Galerie est une plateforme en ligne 100% gratuite, dédiée aux artistes visuels, permettant
        d’offrir à tous, professionnels ou amateurs, un espace pour exposer et partager leurs oeuvres.
        <br />
        <br />
        Cette galerie virtuelle permet aux artistes de se créer un profil personnalisé, de télécharger des
        images de leurs créations, de les catégoriser selon divers styles, thèmes et médiums.
        <br />
        <br />
        Les visiteurs peuvent parcourir la galerie, filtrer les œuvres par artiste, tags, style et support,
        laisser des commentaires, ajouter des favoris et contacter les artistes pour des demandes
        d'informations, d'éventuels achats ou collaborations.
        <br />
        <br />

        <span className="block text-center text-md max-w-xs mx-auto">Bonne visite !</span>
      </p>
    </div>
  );
}
