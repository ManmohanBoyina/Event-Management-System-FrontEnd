import { useRef, useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import {useRouter} from "next/router";
export default function Home() {
  const { status, data: session } = useSession();
  const [username, setUsername] = useState();
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.username) setUsername(session.user.username);
  }, [session]);
  return (
    <main>
      Landing Page
      <br></br>
      <p>{status === "authenticated" ? "Logged In" : ""}</p>
      <p>{username?`Hello ${username}`:""}</p>
      {status === "authenticated" ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : 
      <button onClick={()=>router.push("/auth/sign-in")}>
        
        Sign In
      </button>
      }
    </main>
  );
}

Home.Layout = "landing";
Home.auth = false;
