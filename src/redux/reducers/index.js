import { combineReducers } from 'redux'
import authReducer from './authReducers'
import notificationsReducers from './notificationsReducers'
import errorReducer from './errorReducers'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  notifications: notificationsReducers
})