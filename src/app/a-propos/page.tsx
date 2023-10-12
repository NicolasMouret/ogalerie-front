export default function InformationPage() {

  return (
    <div
      className="flex flex-col items-center justify-center mt-[-30px] h-[75vh] lg:mt-0 bg-background bg-cover bg-center"
      style={{ backgroundImage: `url('/images/background_image_a_propos.png')` }}
    >
      <h1 className="text-xl lg:text-4xl font-bold pb-4 lg:pb-10 mt-20 sm:mt-0">
        À propos
      </h1>
        <p className="text-justify max-w-xs lg:max-w-2xl mx-4 lg:mx-auto indent-4 lg:indent-8">
            O’Galerie est une plateforme en ligne 100% gratuite, dédiée aux artistes visuels, permettant
            d’offrir à tous, professionnels ou amateurs, un espace pour exposer et partager leurs oeuvres.<br /><br />
            Cette galerie virtuelle permet aux artistes de se créer un profil personnalisé, de télécharger des
            images de leurs créations, de les catégoriser selon divers styles, thèmes et médiums.<br /><br />
            Les visiteurs peuvent parcourir la galerie, filtrer les œuvres par artiste, tags, style et support,
            laisser des commentaires, ajouter des favoris et contacter les artistes pour des demandes
            d'informations, d'éventuels achats ou collaborations.<br /><br />

            <span className="block text-center text-md lg:text-lg mt-4 max-w-xs lg:max-w-lg mx-auto">Bonne visite !</span>
        </p>
    </div>
    );
}