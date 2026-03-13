import { useAuth } from "./hooks/useAuth"
import { signInWithGoogle, signOut } from "./services/auth.service"

function App() {
  const { user, isPending, isLoggedIn } = useAuth()

  if(isPending) return <p>Loading...</p>

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Logged in as {user?.email}</p>
          <p>Role: {user!.role}</p>
          <button onClick={signOut}>
            Sign out
          </button>
        </div>
      ): (
        <button onClick={signInWithGoogle}>
          Sign In
        </button>
      )}
    </div>
  )
}

export default App
