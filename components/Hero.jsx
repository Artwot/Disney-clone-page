import Head from "next/head";
import Image from "next/image";

const Hero = () => {
  return (
    <section>
      <Head>
        <title>Iniciar sesión | Disney+</title>
        <link rel="icon" href="../public/favicon.ico" />
      </Head>
      <div className="relative min-h-[calc(100vh-72px)]">
        <Image
          src="/images/hero-background.jpg"
          layout="fill"
          objectFit="cover"
          alt="Hero"
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="absolute flex flex-col space-y-3 top-1/4 w-full justify-center items-center max-w-screen-sm mx-auto p-8 -mt-16">
          <Image
            src="/images/cta-logo-one.svg"
            width="600"
            height="150"
            objectFit="contain"
            alt="Servicios de Disney+"
          />
          <button className="bg-blue-600 uppercase text-xl tracking-wide font-extrabold py-4 px-6 w-full rounded hover:bg-[#0485ee]">
            Accede a todo el contenido
          </button>
          <p className="text-xs text-center ">
            Obtenga acceso Premier a Raya y el último dragón por una tarifa
            adicional con una suscripción a Disney+. A partir del 26/03/21, el
            precio de Disney+ y The Disney Bundle aumentará en $149.99
          </p>
          <Image
            src="/images/cta-logo-two.png"
            width="600"
            height="70"
            objectFit="contain"
            alt="Marcas de Disney"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
