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

    const sign_in_google = () => {

    }

    return (
        <>
            <section>
                {/* sign-in page below */}
                <title>Customer Sign In</title>
                <h1 class="text-4xl p-2">GameOn</h1>
                <div class="pt-12 flex items-center justify-start h-screen flex-col">
                    <div class="flex flex-col">
                        <h2 class="text-4xl font-bold mb-12 text-left">Sign In!</h2>
                    </div>
                    <form class="flex flex-col" onSubmit={handleSubmit}>

                        <label class="font-bold" htmlFor="email">Email: </label>
                        <input class="border border-black rounded-md m-1 p-1 w-80" type="text" id="email" placeholder="Enter email" ref={userRef} onChange={(e) => setEmail(e.target.value)} value={email} required />
                        <label class="font-bold" htmlFor="password">Password: </label>
                        <input class="border border-black rounded-md m-1 p-1 w-80" type="password" id="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                        <a class="font-bold text-blue-700 hover:text-blue-800 hover:underline active:text-blue-900 text-right" href="#">Forgot Password?</a>


                        <button class="text-white w-80 m-1 mt-10 p-1 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Sign In</button>
                    </form>

                    <div class="flex items-center justify-center m-.5">
                        <div class="text-gray-500 font-semibold mb-1">OR</div>
                    </div>

                    <div class="border border-black rounded-md m-1 p-1 w-80 font-bold flex flex-row justify-center hover:bg-gray-200 active:bg-gray-300">
                        <img class src="/icons/google-icon.svg" height="20" width="20" />
                        <button class="pl-3"
                            onClick={() => { signIn('google', { role: "Customer" }) }}
                        >Sign in with google</button>
                    </div>

                    <p class="mt-10 m-1 p-1 font-bold">Don't have an account yet? <a class="text-blue-700 hover:text-blue-800 hover:underline active:text-blue-900" href="sign-up">Sign Up</a></p>
                </div>
            </section>


        </>
    )
}
SignIn.Layout = "auth"
export default SignIn