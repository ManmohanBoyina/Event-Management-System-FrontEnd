import react from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter()
  const { status, data: session } = useSession();
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="square"
            strokeLinejoin="square"
            strokeWidth="3"
            className="w-10 h-10 text-white p-2 bg-indigo-600 squared-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Game On</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900"
          onClick={()=> router.push("/")}
          >Home</a>
          <a className="mr-5 hover:text-gray-900">About us</a>
          <a className="mr-5 hover:text-gray-900">Contact</a>
          {status === "authenticated"?
          <a className="mr-5 hover:text-gray-900"
          onClick={()=> signOut()}
          >Logout</a>
          :null
          }
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
