import Head from "next/head";
import Image from "next/image";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import ReactPlayer from "react-player";

const Movie = ({ movie }) => {
  const [session] = useSession();
  const [showPlayer, setShowPlayer] = useState(false);
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  });

  const index = movie.videos.results.findIndex(
    (element) => element.type === "Trailer"
  );

  return (
    <div>
      <Head>
        <title>{movie.title || movie.original_name}</title>
      </Head>
      <Header />
      {!session ? (
        <Hero />
      ) : (
        <section className="relative z-50">
          <div className="relative min-h-[calc(100vh-72px)]">
            <Image
              src={
                `${BASE_URL}${movie.backdrop_path || movie.poster_path}` ||
                `${BASE_URL}${movie.poster_path}`
              }
              alt={movie.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div
            className="absolute inset-y-28 md:inset-y-auto md:bottom-10
            inset-x-4 md:inset-x-12 space-y-6
          "
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              {movie.title || movie.original_name}
            </h1>
            {/* Media buttons & icons group */}
            <div className="flex items-center space-x-3 md:space-x-5">
              {/* Play button  */}
              <button
                className="text-xs md:text-base bg-[#f9f9f9] text-black flex items-center
                justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]
              "
              >
                <img
                  src="/images/play-icon-black.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                  Play
                </span>
              </button>
              {/* Trailer button  */}
              <button
                className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9]
                flex items-center justify-center py-2.5 px-6 rounded hover:bg-[#c6c6c6]
              "
                onClick={() => setShowPlayer(true)}
              >
                <img
                  src="/images/play-icon-white.svg"
                  alt=""
                  className="h-6 md:h-8"
                />
                <span className="uppercase font-medium tracking-wide">
                  Trailer
                </span>
              </button>
              {/* Icons container */}
              <div
                className="rounded-full border-2 border-white flex items-center justify-center
              w-11 h-11 cursor-pointer bg-black/60
              "
              >
                <PlusIcon className="h-6" />
              </div>
              <div
                className="rounded-full border-2 border-white flex items-center justify-center
              w-11 h-11 cursor-pointer bg-black/60
              "
              >
                <img src="/images/group-icon.svg" alt="group" />
              </div>
            </div>
            {/* Movie Info */}
            <p className="text-xs md:text-sm font-semibold">
              {/* Release date */}
              {movie.release_date || movie.first_air_date}{" "}
              {/* Calculate the movie duration */}
              {Math.floor(movie.runtime / 60)}h {movie.runtime % 60} min{" "}
              {/* Mapping the movie genres */}
              {movie.genres.map((genre) => genre.name + " ")}
            </p>
            {/* Movie description */}
            <h4 className="text-sm md:text-lg max-w-4xl">{movie.overview}</h4>
          </div>
          {/* Backgroun overlay */}
          {showPlayer && (
            <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50 " />
          )}
          {/* Reproductor */}
          <div
            className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden
            transition duration-100 ${
              showPlayer ? "opacity-100 z-50" : "opacity-0"
            }
          `}
          >
            <div
              className="flex items-center justify-between bg-black text-color[#f9f9f9]
              p-3.5
            "
            >
              <span className="font-semibold">Reproduciendo Tráiler</span>
              <div
                className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg
              opacity-50 hover:opacity-75 hover:bg[#0f0f0f]
              "
                onClick={() => setShowPlayer(false)}
              >
                <XIcon className="h-5" />
              </div>
            </div>
            <div className="relative pt-[56.25%]">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${movie.videos?.results[index]?.key}`}
                width="100%"
                height="100%"
                style={{ position: "absolute", top: "0", left: "0" }}
                controls={true}
                playing={showPlayer}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
// 4:10
export default Movie;

// Fetch the data movie
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const { id } = context.query;

  const request = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=es-MX&append_to_response=videos`
  ).then((response) => response.json());

  return {
    props: { movie: request, session },
  };
};
