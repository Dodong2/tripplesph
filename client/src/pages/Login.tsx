import { signInWithGoogle } from "../services/auth.service"
import { Button } from "../components/ui/Button"

const Login = () => {
    return (
        <div>
            <Button onClick={signInWithGoogle}>
                Sign in with Google
            </Button>
        </div>
    )
}

export default Login