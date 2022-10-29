import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../../../../api/api"

import Preloader from '../../../particles/Preloader'
import TrashCan from "../../../particles/TrashCan"
import Pencil from "../../../particles/Pencil"

import { createNotification } from "../../../../redux/actions/notificationsActions"
import images from '../../../../assets/images/imgs'

function MembersView() {
  const [members, setMembers] = useState([])
  const [preloader, setPreloader] = useState(true)
  const navigate = useNavigate()

  useEffect(() => { loadMembers() }, [])

  function loadMembers() {
    setPreloader(true)

    API.getMembers()
      .then(res => setMembers(res.data.members))
      .catch(err => console.log(err))
      .finally(() => {
        setPreloader(false)
      })
  }

  function remove(id) {
    if (window.confirm('Are you sure?')) {
      API.deleteMember(id)
        .then((res) => {
          loadMembers()
          createNotification(res.data.message, 'success')
        })
    }
  }

  function update(id) {
    navigate('/member/update/' + id)
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
            <Link className="btn btn-success" to='/member/create'>Create member</Link>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <b>#</b>
                  </th>
                  <th scope="col">
                    <b>Name</b>
                  </th>
                  <th scope="col">
                    <b>Positions</b>
                  </th>
                  <th scope="col">
                    <b>Description</b>
                  </th>
                  <th scope="col">
                    <b>Image</b>
                  </th>
                  <th scope="col">
                    <b>Date Create</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  members.map((member, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">
                          <TrashCan callback={() => remove(member._id)} />
                          <Pencil callback={() => update(member._id)}/>
                        </th>
                        <td>{member.name}</td>
                        <td>
                          {
                            member.positions.map((item, i) => {
                              return <p key={i} style={{
                                border: '1px solid #ccc',
                                padding: '2px',
                                borderRadius: '3px',
                                marginBottom: '5px'
                              }}>{item}</p>
                            })
                          }
                        </td>
                        <td>{member.description}</td>
                        <td>
                          {
                            <img
                              width={100}
                              src={member.image || images.preview}
                              alt="preview" />
                          }
                        </td>
                        <td>{member.dateCreate}</td>
                      </tr>
                    )
                  })
                }
                {
                  members.length === 0 ? (
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

export default MembersView
