const initialState = {
  list: []
}

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return action.payload
    case SET_NOTIFICATION:
      return {
        ...state,
        list: [...state.list, action.payload]
      }
    case DELETE_NOTIFICATION:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload)
      }
    default:
      return state
  }
}

export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS'
export const SET_NOTIFICATION = 'SET_NOTIFICATION'
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'