import { useEffect, useState } from "react"
import API from "../../../../api/api"

import Preloader from '../../../particles/Preloader'
import TrashCan from "../../../particles/TrashCan"
import { createNotification } from "../../../../redux/actions/notificationsActions"

function FeedbacksView() {
  const [feedbacks, setFeedbacks] = useState([])
  const [preloader, setPreloader] = useState(true)

  useEffect(() => { loadFeedbacks() }, [])

  function loadFeedbacks() {
    setPreloader(true)

    API.getFeedbacks()
      .then(res => setFeedbacks(res.data.feedbacks))
      .catch(err => console.log(err))
      .finally(() => {
        setPreloader(false)
      })
  }

  function remove(id) {
    if (window.confirm('Are you sure?')) {
      API.deleteFeedback(id)
        .then((res) => {
          loadFeedbacks()
          createNotification(res.data.message, 'success')
        })
    }
  }

  return (
    <>
      {
        preloader ? (
          <div className="preloaders">
            <Preloader height="50px"/>
            <Preloader height="50px"/>
            <Preloader height="50px"/>
          </div>
        ) : (
          <div className="column">
            <table className="table" >
              <thead>
                <tr>
                  <th scope="col">
                    <b>#</b>
                  </th>
                  <th scope="col">
                    <b>Email</b>
                  </th>
                  <th scope="col">
                    <b>Message</b>
                  </th>
                  <th scope="col">
                    <b>Date Create</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  feedbacks.map((feedback, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">
                          <TrashCan callback={() => remove(feedback._id)} />
                        </th>
                        <td>{ feedback.email }</td>
                        <td>{ feedback.message }</td>
                        <td>{ feedback.dateCreate }</td>
                      </tr>
                    )
                  })
                }
                {
                  feedbacks.length === 0 ? (
                    <tr>
                      <td colSpan={4}>No items</td>
                    </tr>
                  ) : ''
                }
              </tbody>
            </table>
          </div>
        )
      }
    </>
  )
}

export default FeedbacksView
