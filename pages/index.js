import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import Brands from "../components/Brands";
import MoviesCollection from "../components/MoviesCollection";
import ShowCollection from "../components/ShowCollection";
import { useSession, getSession } from "next-auth/client";

export default function Home({
  popularMovies,
  popularShows,
  topRatedMovies,
  topRatedShows,
}) {
  const [session] = useSession();
  return (
    <div className="">
      <Head>
        <title>Disney+</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Header */}
      <Header />
      {/* If session is active, show the main content, otherwise, show a hero section */}
      {!session ? (
        <Hero />
      ) : (
        <main
          className="relative min-h-screen after:bg-home after:bg-center after:bg-cover 
						after:bg-no-repeat after:bg-fixed after:absolute after:inset-0 after:z-[-1]"
        >
          {/* Silder component */}
          <Slider />
          {/* Brands component */}
          <Brands />
          <MoviesCollection
            movies={popularMovies}
            title="Películas populares"
          />
          <ShowCollection shows={popularShows} title="Series populares" />
          <MoviesCollection
            movies={topRatedMovies}
            title="Películas mejor calificadas"
          />
          <ShowCollection
            shows={topRatedShows}
            title="Series mejor calificadas"
          />
        </main>
      )}
    </div>
  );
}

// This function is only used in the index.js file or a page
export async function getServerSideProps(context) {
  // Always send the context
  const session = await getSession(context);
  // Responses from TMDB API
  const [
    popularMoviesRes,
    popularShowsRes,
    topRatedMoviesRes,
    topRatedShowsRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=es-MX&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=es-MX&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=es-MX&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=es-MX&page=1`
    ),
  ]);
  // Convert the responses into a .json file
  const [popularMovies, popularShows, topRatedMovies, topRatedShows] =
    await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      topRatedMoviesRes.json(),
      topRatedShowsRes.json(),
    ]);

  return {
    props: {
      session,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      topRatedMovies: topRatedMovies.results,
      topRatedShows: topRatedShows.results,
    },
  };
}
