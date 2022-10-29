import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../../../../api/api"

import Preloader from '../../../particles/Preloader'
import TrashCan from "../../../particles/TrashCan"
import Pencil from "../../../particles/Pencil"
import { createNotification } from "../../../../redux/actions/notificationsActions"

function CollaborationsView() {
  const [collaborations, setCollaborations] = useState([])
  const [preloader, setPreloader] = useState(true)
  const navigate = useNavigate()

  useEffect(() => { loadCollaborations() }, [])

  function loadCollaborations() {
    setPreloader(true)

    API.getCollaborations()
      .then(res => setCollaborations(res.data.collaborations))
      .catch(err => console.log(err))
      .finally(() => {
        setPreloader(false)
      })
  }

  function remove(id) {
    if (window.confirm('Are you sure?')) {
      API.deleteCollaboration(id)
        .then((res) => {
          loadCollaborations()
          createNotification(res.data.message, 'success')
        })
    }
  }

  function update(id) {
    navigate('/collaboration/update/' + id)
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
            <Link className="btn btn-success" to='/collaboration/create'>Create collaboration</Link>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <b>#</b>
                  </th>
                  <th scope="col">
                    <b>Title</b>
                  </th>
                  <th scope="col">
                    <b>Description</b>
                  </th>
                  <th scope="col">
                    <b>Date Create</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  collaborations.map((collaboration, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">
                          <TrashCan callback={() => remove(collaboration._id)} />
                          <Pencil callback={() => update(collaboration._id)}/>
                        </th>
                        <td>{ collaboration.title }</td>
                        <td>{ collaboration.description }</td>
                        <td>{ collaboration.dateCreate }</td>
                      </tr>
                    )
                  })
                }
                {
                  collaborations.length === 0 ? (
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

export default CollaborationsView
