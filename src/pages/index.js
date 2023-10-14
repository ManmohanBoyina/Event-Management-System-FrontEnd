import { useRef, useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
export default function Home() {
  const { status, data: session } = useSession();
  const [username, setUsername] = useState();
  const router = useRouter();

  const signInWithGoogle = async () => {
    await signIn("google");
  };

  useEffect(() => {
    if (session?.user?.username) setUsername(session.user.username);
  }, [session]);

  return (
    <main 
    style={{
      backgroundImage: "../components/landing.jpg"
    }}
    className="h-screen bg-landing bg-cover bg-no-repeat bg-center relative" >
      <div className="absolute top-4 right-4">
        <p className="text-right">
          {status === "authenticated" ? "Logged In" : ""}
        </p>
        <p className="text-right">
          {username ? `Hello ${username}` : ""}
        </p>
        {status === "authenticated" ? (
          <button onClick={() => signOut()}>Logout</button>
        ) : (
          <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Game On
      </h1>
      <p className="mb-8 leading-relaxed">Game On Venue and Activity Management System is a robust and user-friendly platform designed to simplify the process of discovering, reserving, and organizing venues and activities for users. This system facilitates seamless connections between venue owners and event participants, making it easy for users to find the perfect place for their activities and the like-minded individuals to engage with.</p>
      <div className="flex justify-center">
        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={() => router.push("/auth/sign-in")}>
          Sign in
        </button>
      </div>
    </div>
  </div>
</section>
        )}
      </div>
    </main>
  );
}

Home.Layout = "landing";
Home.auth = false;
