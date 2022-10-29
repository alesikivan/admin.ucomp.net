import isEmpty from 'is-empty'

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      }
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}

export const USER_LOADING = 'USER_LOADING'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'