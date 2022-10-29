import { useState } from 'react'

import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'

import API from '../../../../api/api'
import { createNotification } from '../../../../redux/actions/notificationsActions'
import { errorFormater } from '../../../../utils/errors'

function CollaborationCreate() {
  const navigate = useNavigate()
  const [collaboration, setCollaboration] = useState({
    title: '',
    description: ''
  })

  function create(event) {
    event.preventDefault()

    API.createCollaboration(collaboration)
      .then(res => {
        const { message } = res.data
        createNotification(message, 'success')
        navigate('/collaborations')
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
        <label htmlFor='title'>Collaboration title</label>
        <input 
          onChange={event => setCollaboration({ ...collaboration, title: event.target.value })}
          type='text' 
          className='form-control' 
          id='title' 
          placeholder='Enter title' />
      </div>

      <div className='form-group'>
        <label htmlFor='description'>Collaboration description</label>
        <textarea 
          onChange={event => setCollaboration({ ...collaboration, description: event.target.value })}
          value={collaboration.description}
          class="form-control" 
          id="description" 
          placeholder='Enter description'
          rows="7">
        </textarea>
      </div>      
      
      <button type='submit' className='btn btn-primary special'>Create collaboration</button>
    </form>
  )
}

export default CollaborationCreate