import Image from 'next/image';

export default function Equipe() {
  return (
    <>
      <div className="bg-black text-white">
        <div className="flex flex-col items-center justify-center mt-20 mb-20">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold pt-20 pb-4 mt-20 items-center">
            L'équipe O'GALERIE
          </h1>
        </div>
          <div className="max-w-7xl text-2xl m-auto">
          <div className='border-4 border-white pl-5 pt-5 pb-5'>
          
          <section className="block lg:flex mb-5">
            <Image src="/alienorcadre.jpg" alt="Alienor" width={150} height={200} />
            <div className="flex items-center ml-5">
              <div>
                <h3 className="font-bold mb-4">Aliénor</h3>
                <p>
                  <strong><em>Rôle</em></strong>
                  {' '}
                  : Product Owner
                </p>
                <p>
                  <strong><em>Citation</em></strong>
                  {' '}
                  : "Je dois vous quitter des Yamakasis frappent à la fenêtre du toit ...."
                </p>
              </div>
            </div>
          </section>
          <section className="block lg:flex mb-5">
            <Image src="/arnaudcadre.jpg" alt="Arnaud" width={150} height={200} />
            <div className="flex items-center ml-5">
              <div>
                <h3 className="font-bold mb-4">Arnaud</h3>
                <p>
                  <strong><em>Rôle</em></strong>
                  {' '}
                  : Lead Developer Backend
                </p>
                <p>
                  <strong><em>Citation</em></strong>
                  {' '}
                  : "Comment ça c'est pas clair, promis je mets à jour la doc ..."
                </p>
              </div>
            </div>
          </section>
          <section className="block lg:flex mb-5">
            <Image src="/thumbnail_jeromecadre.jpg" alt="Jerome" width={150} height={200} />
            <div className="flex items-center ml-5">
              <div>
                <h3 className="font-bold mb-4">Jérôme</h3>
                <p>
                  <strong><em>Rôle</em></strong>
                  {' '}
                  : Git Master
                </p>
                <p>
                  <strong><em>Citation</em></strong>
                  {' '}
                  : "Alors non, on ne code pas sur la branche dev directement..."
                </p>
              </div>
            </div>
          </section>
          <section className="block lg:flex mb-5">
            <Image src="/nicocadre.jpg" alt="Sostell" width={150} height={200} />
            <div className="flex items-center ml-5">
              <div>
                <div>
                  <h3 className="font-bold mb-4">Nicolas</h3>
                  <p>
                    <strong><em>Rôle</em></strong>
                    {' '}
                    : Lead Developer Frontend
                  </p>
                  <p>
                    <strong><em>Citation</em></strong>
                    {' '}
                    : "Nan mais vraiment les C majuscules ...."
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="block lg:flex mb-5">
            <Image src="/sostellcadre.jpg" alt="Nico" width={150} height={200} />
            <div className="flex items-center ml-5">
              <div>
                <div>
                  <h3 className="font-bold mb-4">Sostell</h3>
                  <p>
                    <strong><em>Rôle</em></strong>
                    {' '}
                    : Scrum Master
                  </p>
                  <p>
                    <strong><em>Citation</em></strong>
                    {' '}
                    : "Bon si on récapitule, nous en sommes où là ? ...."
                  </p>
                </div>
              </div>
            </div>
          </section>




















          </div>
        </div>
      </div>
    </>
  );
}
