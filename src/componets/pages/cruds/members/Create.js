import { useState } from 'react'
import FileBase64 from 'react-file-base64'

import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'

import API from '../../../../api/api'
import { createNotification } from '../../../../redux/actions/notificationsActions'
import { errorFormater } from '../../../../utils/errors'
import TrashCan from '../../../particles/TrashCan'

function MemberCreate() {
  const navigate = useNavigate()
  const [member, setMember] = useState({
    name: '', 
    positions: [],
    description: '',
    image: '', // base64
  })

  function createPosition(event) {
    const text = event.target.value

    // Pressed "Enter" button & text should not ebe empty
    if (event.which === 13 && text.trim()) {
      event.preventDefault()
      
      setMember({ ...member, positions: [...member.positions, text] })

      event.target.value = ''
    }    

    // Pressed "Delete" button & text should be empty
    if (event.which === 8 && !text.trim()) {
      event.preventDefault()
      
      setMember({ ...member, positions: member.positions.slice(0, -1) })
      event.target.value = ''
    }

    if (event.which === 13 && !text.trim()) {
      event.preventDefault()
      return false
    }
  }

  function removePosition(position) {
    const { positions } = member

    setMember({ 
      ...member, 
      positions: positions.filter(text => text !== position)
    })
  }

  function create(event) {
    event.preventDefault()
    
    const keyCode = event.keyCode || event.which
    if (keyCode === 13)  return false

    
    API.createMember(member)
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
    <form onSubmit={create} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div className='form-group'>
        <label htmlFor='name'>Member name</label>
        <input 
          onChange={event => setMember({ ...member, name: event.target.value })}
          type='text' 
          className='form-control' 
          id='name' 
          placeholder='Enter name' />
      </div>

      <div className='form-group'>
        <label htmlFor='description'>Member description</label>
        
        <textarea 
          onChange={event => setMember({ ...member, description: event.target.value })}
          className="form-control" 
          id="description" 
          placeholder='Enter description'
          rows="4">
        </textarea>
      </div>

      <div className='form-group'>
        <label>Member positions</label>

        <ul className='content-list'>
          {
            member.positions.map((position, i) => 
              <li key={i} className="content-list-item">
                { position } 
                <span onClick={() => removePosition(position)} className='remove-content-list-item'>&times;</span>
              </li>)
          }
          <li>
            <input 
              placeholder='Press enter to add'
              onKeyDown={e => createPosition(e)}
              type="text" />
          </li>
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
                })} />
            </>
          ) : (
            <>
              <label htmlFor='file'>Select preloader image for member</label>

              <FileBase64
                id='file'
                className='form-control-file' 
                multiple={false}
                onDone={({ base64 }) => setMember({ 
                  ...member, 
                  image: base64, 
                })}
                type='file'/>
            </>
          )
        }
      </div>
      
      <button type='submit' className='btn btn-primary special'>Create member</button>
    </form>
  )
}

export default MemberCreate