import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FileBase64 from 'react-file-base64'
import ReactQuill from 'react-quill'

import API from "../../../../api/api"
import Preloader from "../../../particles/Preloader"
import TrashCan from "../../../particles/TrashCan"
import { createNotification } from '../../../../redux/actions/notificationsActions'
import { errorFormater } from '../../../../utils/errors'

function BlogUpdate() {
  let { id } = useParams()
  const navigate = useNavigate()
  const [preloader, setPreloader] = useState(true)
  const [blog, setBlog] = useState({
    id,
    title: '',
    image: '',
    content: '',
    isDeleteImage: false,
    isModifiedImage: false
  })

  function setContent(content) {
    setBlog({ ...blog, content })
  }

  useEffect(() => {
    API.getBlog(id)
      .then(res => setBlog(blog => ({ ...blog, ...res.data.blog  })))
      .catch(err => console.log(err))
      .finally(() => {
        setPreloader(false)
      })
  }, [id])

  function update(e) {
    e.preventDefault()

    API.updateBlog(blog)
      .then(res => {
        const { message } = res.data
        createNotification(message, 'success')
        navigate('/blogs')
      })
      .catch(err => {
        const { data } = err.response
        const error = errorFormater(data)

        createNotification(error, 'error')
      })
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
        <form onSubmit={update} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className='form-group'>
            <label htmlFor='title'>Blog title</label>
            <input 
              value={blog.title}
              onChange={event => setBlog({ ...blog, title: event.target.value })}
              type='text' 
              className='form-control' 
              id='title' 
              placeholder='Enter title' />
          </div>

          <div className='form-group special'>
            <label htmlFor='file'>Blog content</label>
            <ReactQuill 
              theme="snow" 
              value={blog.content} 
              onChange={setContent} />
          </div>

          <div className='form-group'>
            {
              blog.image ? (
                <>
                  <img 
                    width={150} 
                    src={blog.image} 
                    alt="preview" />

                  <TrashCan
                    styles={{ marginLeft: '10px' }} 
                    callback={() => setBlog({ 
                      ...blog, 
                      image: '', 
                      isDeleteImage: true, 
                      isModifiedImage: true 
                    })} />
                </>
              ) : (
                <>
                  <label htmlFor='file'>Select preloader image for blog</label>

                  <FileBase64
                    id='file'
                    className='form-control-file' 
                    multiple={false}
                    onDone={({ base64 }) => setBlog({ 
                      ...blog, 
                      image: base64, 
                      isDeleteImage: false, 
                      isModifiedImage: true
                    })}
                    type='file'/>
                </>
              )
            }
          </div>
          
          <button type='submit' className='btn btn-primary special'>Update blog</button>
        </form>
      )
    }
  </>
  )
}

export default BlogUpdate