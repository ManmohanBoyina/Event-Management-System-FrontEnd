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
    console.log(session)
    if (session?.user?.username) setUsername(session.user.username);
  }, [session]);

  useEffect(() => {
    if (status === "authenticated") {
      // router.push("/"); // Redirect to the home page after successful authentication
    }
  }, [status, router]);

  return (
    <main>
      Landing Page
      <br></br>
      <p>{status === "authenticated" ? "Logged In" : ""}</p>
      <p>{username ? `Hello ${username}` : ""}</p>
      {status === "authenticated" ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : (
        <div>
          <button onClick={() => router.push("/auth/sign-in")}>Sign In</button>
          <button onClick={signInWithGoogle}>Sign In with Google</button>
          
        </div>
      )}
    </main>
  );
}

Home.Layout = "landing";
Home.auth = false;
