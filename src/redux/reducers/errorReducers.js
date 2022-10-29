const initialState = {}

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload
    default:
      return state
  }
}

export const GET_ERRORS = 'GET_ERRORS'