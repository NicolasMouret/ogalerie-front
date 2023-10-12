export default function InformationPage() {

    return (
      <div
        className="flex flex-col items-center justify-center mt-[-30px] h-[75vh] lg:mt-0 bg-background bg-cover bg-center"
        style={{ backgroundImage: `url('/images/background_image_a_propos.png')` }}
      >
        <h1 className="text-xl lg:text-4xl font-bold pb-4 lg:pb-10 mt-20 sm:mt-0">
          L'équipe O'GALERIE
        </h1>
          <p className="text-justify max-w-xs lg:max-w-2xl mx-4 lg:mx-auto indent-4 lg:indent-8">
<section>
    <img src="/var/www/html/APO/dev/dev2/projet-06-o-galerie-front/public/images/alienorcadre.jpg"/>
    <h3>Rôle : Prodcut Owner</h3>
    <p>Citation : "Je dois vous quitter des Yamakasis frappent à la fenêtre du toit ...."</p>
</section>
<section>
    <img src="/var/www/html/APO/dev/dev2/projet-06-o-galerie-front/public/images/arnaudcadre.jpg"/>
    <h3>Rôle : Lead Developer Backend</h3>
    <p>Citation : "Comment ça c'est pas clair, promis je mets à jour la doc ..."</p>
</section>
<section>
    <img src="/var/www/html/APO/dev/dev2/projet-06-o-galerie-front/public/images/nicocadre.jpg"/>
    <h3>Rôle : Lead Developer Frontend</h3>
    <p>Citation : "Qui a codé directement sur la branche dev au lieu de s'en créer une nouvelle ...."</p>
</section>
<section>
    <img src="/var/www/html/APO/dev/dev2/projet-06-o-galerie-front/public/images/sostell cadre.jpg"/>
    <h3>Rôle : Scrum Master</h3>
    <p>Citation : "Bon nous en sommes où là ... "</p>
</section>
<section>
    <img src="/var/www/html/APO/dev/dev2/projet-06-o-galerie-front/public/images/thumbnail_jeromecadre.jpg"/>
    <h3>Rôle : Git Master</h3>
    <p>Citation : "J'ai développé cette fonctionnalité je garantis pas qu'elle passe...</p>
</section>
  
              <span className="block text-center text-md lg:text-lg mt-4 max-w-xs lg:max-w-lg mx-auto">Bonne visite !</span>
          </p>
      </div>
      );
  }