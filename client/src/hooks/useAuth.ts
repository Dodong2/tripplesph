import { authClient } from "../lib/auth-client";
import type { UserWithRole } from "../types/auth.types";

export const useAuth = () =>{
    const { data: session, isPending } = authClient.useSession()
    const user = session?.user as UserWithRole | undefined

    return { user, isPending, isLoggedIn: !!user }
}