
import { v4 as uuid } from 'uuid';
import { DELETE_NOTIFICATION, SET_NOTIFICATION } from '../reducers/notificationsReducers';

import store from '../store'

export const createNotification = (content, status) => {
  const id = uuid()
  
  const notification = {
    type: SET_NOTIFICATION,
    payload: {
      content,
      status,
      id,
      date: new Date(),
    }
  }

  store.dispatch(notification)
  
  setTimeout(() => {
    deleteNotification(id)
  }, 2000)
}

export const deleteNotification = id => {
  
  const notification = {
    type: DELETE_NOTIFICATION,
    payload: id
  }

  store.dispatch(notification)
}