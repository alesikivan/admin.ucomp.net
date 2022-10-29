import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../../../../api/api"

import Preloader from '../../../particles/Preloader'
import TrashCan from "../../../particles/TrashCan"
import Pencil from "../../../particles/Pencil"

import { createNotification } from "../../../../redux/actions/notificationsActions"

function PublicationsView() {
  const [publications, setPublications] = useState([])
  const [preloader, setPreloader] = useState(true)
  const navigate = useNavigate()

  useEffect(() => { loadPublications() }, [])

  function loadPublications() {
    setPreloader(true)

    API.getPublications()
      .then(res => setPublications(res.data.publications))
      .catch(err => console.log(err))
      .finally(() => {
        setPreloader(false)
      })
  }

  function remove(id) {
    if (window.confirm('Are you sure?')) {
      API.deletePublication(id)
        .then((res) => {
          loadPublications()
          createNotification(res.data.message, 'success')
        })
    }
  }

  function update(id) {
    navigate('/publication/update/' + id)
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
            <Link className="btn btn-success" to='/publication/create'>Create publication</Link>
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
                    <b>Link</b>
                  </th>
                  <th scope="col">
                    <b>Year</b>
                  </th>
                  <th scope="col">
                    <b>Authors</b>
                  </th>
                  <th scope="col">
                    <b>Date Create</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  publications.map((publication, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">
                          <TrashCan callback={() => remove(publication._id)} />
                          <Pencil callback={() => update(publication._id)}/>
                        </th>
                        <td>{ publication.title }</td>
                        <td>
                          {
                            publication.link.length > 30 ?
                              publication.link.slice(0, 30) + '..' :
                              publication.link
                          }
                        </td>
                        <td>{ publication.year }</td>
                        <td>
                          {
                            publication.authors.map((item, i) => {
                              return <p key={i} style={{
                                border: '1px solid #ccc',
                                padding: '2px',
                                borderRadius: '3px',
                                marginBottom: '5px'
                              }}>{item}</p>
                            })
                          }
                        </td>
                        <td>{publication.dateCreate}</td>
                      </tr>
                    )
                  })
                }
                {
                  publications.length === 0 ? (
                    <tr>
                      <td colSpan={6}>No items</td>
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

export default PublicationsView
