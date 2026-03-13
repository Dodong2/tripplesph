import { authClient } from "../lib/auth-client";

export const signInWithGoogle= () => {
    authClient.signIn.social({
        provider: 'google',
        callbackURL: import.meta.env.VITE_CLIENT_URL
    })
}

export const signOut = () => authClient.signOut()