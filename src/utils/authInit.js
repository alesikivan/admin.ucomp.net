import setAuthToken from './setAuthToken'
import jwt_decode from 'jwt-decode'
import store from '../redux/store'
import { logout, setCurrentUser } from '../redux/actions/authActions'


export function authInit() {
  // Check for token to keep user logged in
  if (localStorage.token) {
    // Set auth token header auth
    const token = localStorage.token
    setAuthToken(token)

    // Decode token and get user info and exp
    const decoded = jwt_decode(token)

    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded))

    // Check for expired token
    const currentTime = Date.now() / 1000 // to get in milliseconds

    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logout())

      // Redirect to login
      window.location.href = "./login"
    }
  }
}