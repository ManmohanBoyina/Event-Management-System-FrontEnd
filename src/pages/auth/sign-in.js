import { useRef, useState, useEffect } from 'react';
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router";
import ErrorToaster from '@/lib/Toasters/ErrorToaster';

const SignIn = () => {

    const userRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('')

    const { status, data: session } = useSession();
    const router = useRouter();


    useEffect(() => {
        userRef.current.focus();
    }, [])

    // sets user role.
    useEffect(() => {
        if (session?.user?.role) setUserRole(session.user.role)
    }, [session]);

    //routes autnenticated user to landing page
    useEffect(() => {
        console.log(userRole)
        if (status === "authenticated" && userRole === "Customer")
            router.push('/')
        if (status === "authenticated" && userRole === "Host")
            router.push("/host")
    }, [userRole])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await signIn("credentials", {
            redirect: false,
            email: email,
            password: password,
        });
        // if login failed
        if (error) {
            ErrorToaster("Login Failed");
        }
        setEmail('');
        setPassword('');
    }

    const sign_in_google = () =>{
        
    }

    return (
        <>
            <section>
                {/* sign-in page below */}
                <h1>Customer Sign In</h1>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="email">Email: </label>
                    <input type="text" id="email" ref={userRef} onChange={(e) => setEmail(e.target.value)} value={email} required />

                    <label htmlFor="password">Password: </label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required />

                    <button>Sign In</button>
                </form>
                <div>
                    <button
                    onClick={()=>{signIn('google',{role:"Customer"})}}
                    >Sign in with google</button>
                </div>
                <p>
                    Don't have an account yet?<br />
                    <span className="line">
                        <a href="sign-up">Sign Up</a>
                    </span>
                </p>
            </section>

            
        </>
    )
}
SignIn.Layout = "auth"
export default SignIn