import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import FileBase64 from 'react-file-base64'

import API from "../../../../api/api"
import Preloader from "../../../particles/Preloader"
import TrashCan from "../../../particles/TrashCan"
import { createNotification } from '../../../../redux/actions/notificationsActions'
import { errorFormater } from '../../../../utils/errors'

function MemberUpdate() {
  let { id } = useParams()
  const navigate = useNavigate()
  const [preloader, setPreloader] = useState(true)
  const [member, setMember] = useState({
    id, 
    name: '', 
    positions: [],
    description: '',
    image: '', // base64
    isDeleteImage: false,
    isModifiedImage: false
  })

  const [positions, setPositions] = useState('')

  function changePositions(event) {
    const text = event.target.value
    setPositions(text)

    matchPositions(text)
  }

  function matchPositions(text) {
    const positions = text
      .split('/')
      .map(text => text.trim())
      .filter(text => text !== '')

    setMember({ ...member, positions })
  }

  useEffect(() => {
    API.getMember(id)
      .then(res => {
        const member = res.data
        setMember(prev => ({ ...prev, ...member  }))

        setPositions(member.positions.join(' / '))

      })
      .catch(err => console.log(err))
      .finally(() => {
        setPreloader(false)
      })
  }, [id])

  function update(e) {
    e.preventDefault()

    API.updateMember(member)
      .then(res => {
        const { message } = res.data
        createNotification(message, 'success')
        navigate('/members')
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
            <label htmlFor='name'>Member name</label>
            
            <input 
              onChange={event => setMember({ ...member, name: event.target.value })}
              type='text' 
              className='form-control' 
              id='name' 
              value={member.name}
              placeholder='Enter name' />
          </div>

          <div className='form-group'>
            <label htmlFor='description'>Member description</label>
            
              <textarea 
                onChange={event => setMember({ ...member, description: event.target.value })}
                value={member.description}
                class="form-control" 
                id="description" 
                placeholder='Enter description'
                rows="4">
              </textarea>
          </div>

          <div className='form-group'>
            <label>Member positions separeted by "/" (slash)</label>

            <textarea 
              onChange={e => changePositions(e)}
              value={positions}
              class="form-control" 
              placeholder='Set some positions separeted by "/" (slash)'
              rows="4">
            </textarea>
            <br />

            <ul className="list-group">
              {
                member.positions.map((position, i) => 
                  <li key={i} className="list-group-item">{ position }</li>)
              }
            </ul>

          </div>
          
          <div className='form-group'>
            {
              member.image ? (
                <>
                  <img 
                    width={150} 
                    src={member.image} 
                    alt="preview" />

                  <TrashCan
                    styles={{ marginLeft: '10px' }} 
                    callback={() => setMember({ 
                      ...member, 
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
                    onDone={({ base64 }) => setMember({ 
                      ...member, 
                      image: base64, 
                      isDeleteImage: false, 
                      isModifiedImage: true
                    })}
                    type='file'/>
                </>
              )
            }
          </div>
          
          <button type='submit' className='btn btn-primary special'>Update member</button>
        </form>
      )
    }
  </>
  )
}

export default MemberUpdate