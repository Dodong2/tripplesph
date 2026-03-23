import { signInWithGoogle } from "../services/auth.service"

const Login = () => {
    return (
        <div>
            <h1>TripplesPH</h1>
            <p>Staff access only</p>
            <button onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    )
}

export default Login