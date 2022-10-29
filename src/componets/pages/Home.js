import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function Home() {
  const { isAuthenticated } = useSelector(state => state.auth)

  return (
    <main>
      {
        isAuthenticated ? (
          <h2>Home page</h2>
        ) : (
          <Link 
            className="btn btn-primary"
            to='/login'>Login page</Link>
        )
      }
    </main>
  )
}

export default Home