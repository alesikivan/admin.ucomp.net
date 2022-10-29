import { useSelector }from 'react-redux'

import '../../assets/styles/css/particles/notifications.css'

function Notifications() {
  const { list } = useSelector(state => state.notifications)

  return (
    <div className="app-notifications">
      {
        list.map((notification, index) => {
          return (
            <div key={index} className={`notification ${notification.status}`}>
              <p>{ notification.content }</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Notifications
