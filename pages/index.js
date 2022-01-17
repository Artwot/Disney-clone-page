import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Slider from "../components/Slider";
import Brands from "../components/Brands";
import { useSession, getSession } from "next-auth/client";

export default function Home() {
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
        <main>
          {/* Silder component */}
          <Slider />
          {/* Brands component */}
          <Brands />
        </main>
      )}
    </div>
  );
}

// This function is only used in the index.js file or a page
export async function getServerSideProps(context) {
  // Always send the context
  const session = await getSession(context);

  return {
    props: { session },
  };
}
