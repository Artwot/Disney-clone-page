import Image from "next/image";

const Brands = () => {
  return (
    <section
      className="flex flex-col md:flex-row justify-center items-center 
    mt-10 gap-6 px-8 max-w-¨[1440px] mx-auto"
    >
      {/* Disney brand */}
      <div className="brand group">
        <Image
          src="/images/disney.png"
          layout="fill"
          alt="brand"
          objectFit="cover"
        />
        <video
          autoPlay
          loop
          playsInline
          className="hidden group-hover:inline rounded-lg object-cover"
        >
          {/* Best practive is have the source inside of video label */}
          <source src="/videos/disney.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="brand group">
        <Image
          src="/images/pixar.png"
          alt="brand"
          layout="fill"
          objectFit="cover"
        />
        <video
          autoPlay
          loop
          playsInline
          className="hidden group-hover:inline rounded-lg object-cover"
        >
          <source src="/videos/pixar.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Pixar brand */}
      <div className="brand group">
        <Image
          src="/images/marvel.png"
          alt="brand"
          layout="fill"
          objectFit="cover"
        />
        <video
          autoPlay
          loop
          playsInline
          className="hidden group-hover:inline rounded-lg object-cover"
        >
          <source src="/videos/marvel.mp4" type="video/mp4" />
        </video>
      </div>
      {/* StarWars brand */}

      <div className="brand group">
        <Image
          src="/images/starwars.png"
          alt="brand"
          layout="fill"
          objectFit="cover"
        />
        <video
          autoPlay
          loop
          playsInline
          className="hidden group-hover:inline rounded-lg object-cover"
        >
          <source src="/videos/star-wars.mp4" type="video/mp4" />
        </video>
      </div>
      {/* NatGeo brand */}
      <div className="brand group">
        <Image
          src="/images/national-geographic.png"
          layout="fill"
          objectFit="cover"
          alt="brand"
        />
        <video
          autoPlay
          loop
          playsInline
          className="hidden group-hover:inline rounded-lg object-cover"
        >
          <source src="/videos/national-geographic.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default Brands;
