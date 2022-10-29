import axios from 'axios'
import jwt_decode from 'jwt-decode'
import API from '../../api/api'
import setAuthToken from '../../utils/setAuthToken'
import { SET_CURRENT_USER, USER_LOADING } from '../reducers/authReducers'
import { createNotification } from '../actions/notificationsActions'
import { GET_ERRORS } from '../reducers/errorReducers'

import store from '../store'

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post('/api/users/register', userData)
    .then((res) => history.push('/login')) // re-direct to login on successful register
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    )
}

// Login - get user token
export const login = (userData) => {
  return API.login(userData)
    .then((res) => {
      // Set token to localStorage
      const { token } = res.data
      localStorage.setItem('token', token)

      // Set token to Auth header
      setAuthToken(token)

      // Decode token to get user data
      const decoded = jwt_decode(token)

      // Set current user
      store.dispatch(setCurrentUser(decoded))

      createNotification('You successfully loged in the system!', 'success')
    })
    .catch((err) => {
        const { message } = err?.response?.data
        createNotification(message, 'error')
      }
    )
}

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  }
}

// Log user out
export const logout = () => {
  // Remove token from local storage
  localStorage.removeItem('token')

  // Remove auth header for future requests
  setAuthToken(false)

  // Set current user to empty object {} which will set isAuthenticated to false
  store.dispatch(setCurrentUser({}))
}