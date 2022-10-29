import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import API from "../../../../api/api"
import Preloader from "../../../particles/Preloader"
import { createNotification } from '../../../../redux/actions/notificationsActions'
import { errorFormater } from '../../../../utils/errors'

function CollaborationUpdate() {
  let { id } = useParams()
  const navigate = useNavigate()
  const [preloader, setPreloader] = useState(true)
  const [collaboration, setCollaboration] = useState({
    id,
    title: '',
    description: ''
  })

  useEffect(() => {
    API.getCollaboration(id)
      .then(res => setCollaboration(prev => ({ ...prev, ...res.data })))
      .catch(err => console.log(err))
      .finally(() => {
        setPreloader(false)
      })
  }, [id])

  function update(e) {
    e.preventDefault()

    API.updateCollaboration(collaboration)
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
            <label htmlFor='title'>Collaboration title</label>
            <input 
              onChange={event => setCollaboration({ ...collaboration, title: event.target.value })}
              type='text' 
              value={collaboration.title}
              className='form-control' 
              id='title' 
              placeholder='Enter title' />
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Collaboration description</label>
              
              <textarea 
                onChange={event => setCollaboration({ ...collaboration, description: event.target.value })}
                type='text' 
                value={collaboration.description}
                class="form-control" 
                id="description" 
                placeholder='Enter description'
                rows="7">
              </textarea>
          </div>      
          
          <button type='submit' className='btn btn-primary special'>Update collaboration</button>
        </form>
      )
    }
  </>
  )
}

export default CollaborationUpdate