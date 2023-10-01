import { useRef, useState, useEffect } from 'react';
import axios from '../../lib/axios';

const signIn = () => {

    const userRef = useRef();
    const errorRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("#", JSON.stringify({ email, password }));
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            // user role (customer/host)
            const role = response?.data?.role;
            //send to global context, how?({ email, password, role, accessToken });
            setEmail('');
            setPassword('');
            setSuccess(true);
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
            {/* if sign-in successful, then this page is displayed and a link to landing page is given. */}
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="../index">Go to Home</a>
                    </p>
                </section>
            ) : (
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
            )}
        </>
    )
}
signIn.Layout = "auth"
export default signIn