import Image from "next/image";
import Link from "next/link";
import {
  HomeIcon,
  PlusSmIcon,
  SearchIcon,
  StarIcon,
} from "@heroicons/react/solid";
// Import signIn function from Next authentication
// For the user's session, import the next package provide by nextauth
import { signIn, useSession, signOut, getSession } from "next-auth/client";
import { useRouter } from "next/router";

const Header = () => {
  const [session] = useSession();
  const router = useRouter();

  return (
    <header
      className="
        sticky 
        bg-[#040714] 
        top-0 
        z-[1000] flex items-center 
        px-10 h-[72px] md:px-12 "
    >
      {/* Logo */}
      <Link href="/">
        <a>
          <Image
            src="/images/logo.svg"
            width={80}
            height={80}
            alt="Disney+"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
        </a>
      </Link>
      {/* If user is logged in, show the links */}
      {session && (
        // Navbar links
        <div className="hidden ml-10 md:flex items-center space-x-6">
          <Link href="/">
            <a className="header-link group">
              <HomeIcon className="h-4" />
              <span className="span">Home</span>
            </a>
          </Link>
          <Link href="/">
            <a className="header-link group">
              <SearchIcon className="h-4" />
              <span className="span">Search</span>
            </a>
          </Link>
          <Link href="/">
            <a className="header-link group">
              <PlusSmIcon className="h-4" />
              <span className="span">Watchlist</span>
            </a>
          </Link>
          <Link href="/">
            <a className="header-link group">
              <StarIcon className="h-4" />
              <span className="span">Originals</span>
            </a>
          </Link>
          <Link href="/">
            <a className="header-link group">
              <img src="/images/movie-icon.svg" alt="" className="h-5" />
              <span className="span">Movies</span>
            </a>
          </Link>
          <Link href="/">
            <a className="header-link group">
              <img src="/images/series-icon.svg" className="h-5" alt="" />
              <span className="span">Series</span>
            </a>
          </Link>
        </div>
      )}

      {/* If there is not session, show the 'LogIn' button, otherwise... */}
      {!session ? (
        // Login button
        <button
          className="ml-auto uppercase border px-4 py-1.5 
        rounded font-medium tracking-wide hover:bg-white hover:text-black
        transition duration-200"
          onClick={signIn}
        >
          Login
        </button>
      ) : (
        <img
          src={session.user.image}
          alt={session.user.name}
          className="ml-auto h-12 w-12 rounded-full object-cover cursor-pointer"
          onClick={signOut}
        />
      )}
    </header>
  );
};

export default Header;

// This function is only used in the index.js file
export async function getServerSidePropertie(context) {
  // Always send the context
  const session = await getSession(context);

  return {
    props: [session],
  };
}
