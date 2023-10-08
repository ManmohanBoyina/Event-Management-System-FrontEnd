import { useRef, useState, useEffect } from 'react';
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router";

const SignIn = () => {

    const userRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('')

    const [errorMsg, setErrorMsg] = useState('');

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


    // removes error message when email/password is updated
    useEffect(() => {
        setErrorMsg('');
    }, [email, password])


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const request = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
            });
            console.log(request);
            setEmail('');
            setPassword('');
        }
        // if error when login, error message will be set.
        catch (error) {
            if (!error?.response) {
                setErrorMsg('No Response from Server');
            }
            else if (error.response?.status === 400) {
                setErrorMsg('Missing Email or Password');
            }
            else if (error.response?.status === 401) {
                setErrorMsg('Unauthorized');
            }
            else {
                setErrorMsg('Login Failed');
            }  
            errorRef.current.focus();
        }
    }

    return (
        <>
            <section>
                {/* error message will display here */}
                <p ref={errorRef} className={errorMsg ? "errormsg" : "offscreen"} aria-live="assertive">{errorMsg}</p>

                {/* sign-in page below */}
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="email">Email:</label>
                    <input type="text" id="email" ref={userRef} onChange={(e) => setEmail(e.target.value)} value={email} required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required />

                    <button>Sign In</button>
                </form>
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