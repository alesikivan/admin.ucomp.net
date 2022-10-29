import { useState } from 'react'
import FileBase64 from 'react-file-base64'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'

import API from '../../../../api/api'
import { createNotification } from '../../../../redux/actions/notificationsActions'
import { errorFormater } from '../../../../utils/errors'
import TrashCan from '../../../particles/TrashCan'

function BlogCreate() {
  const navigate = useNavigate()
  const [blog, setBlog] = useState({
    title: '',
    image: '',
    content: ''
  })

  function setContent(content) {
    setBlog({ ...blog, content })
  }

  function create(event) {
    event.preventDefault()
    
    API.createBlog(blog)
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
    <form onSubmit={create} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div className='form-group'>
        <label htmlFor='title'>Blog title</label>
        <input 
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
                })}
                type='file'/>
            </>
          )
        }
      </div>
      
      <button type='submit' className='btn btn-primary special'>Create blog</button>
    </form>
  )
}

export default BlogCreate