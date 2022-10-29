import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import API from "../../../../api/api"

import Preloader from '../../../particles/Preloader'
import TrashCan from "../../../particles/TrashCan"
import Pencil from "../../../particles/Pencil"

import images from '../../../../assets/images/imgs'
import { createNotification } from "../../../../redux/actions/notificationsActions"

function BlogsView() {
  const [blogs, setBlogs] = useState([])
  const [preloader, setPreloader] = useState(true)
  const navigate = useNavigate()

  useEffect(() => { loadBlogs() }, [])

  function loadBlogs() {
    setPreloader(true)

    API.getBlogs()
      .then(res => setBlogs(res.data.blogs))
      .catch(err => console.log(err))
      .finally(() => {
        setPreloader(false)
      })
  }

  function remove(id) {
    if (window.confirm('Are you sure?')) {
      API.deleteBlog(id)
        .then((res) => {
          loadBlogs()
          createNotification(res.data.message, 'success')
        })
    }
  }

  function update(id) {
    navigate('/blog/update/' + id)
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
            <Link className="btn btn-success" to='/blog/create'>Create blog</Link>
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
                    <b>Content</b>
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
                  blogs.map((blog, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">
                          <TrashCan callback={() => remove(blog._id)} />
                          <Pencil callback={() => update(blog._id)}/>
                        </th>
                        <td>{blog.title}</td>
                        <td>{blog.content}</td>
                        <td>
                          {
                            <img
                              width={100}
                              src={blog.image || images.preview}
                              alt="preview" />
                          }
                        </td>
                        <td>{blog.dateCreate}</td>
                      </tr>
                    )
                  })
                }
                {
                  blogs.length === 0 ? (
                    <tr>
                      <td colSpan={5}>No items</td>
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

export default BlogsView
