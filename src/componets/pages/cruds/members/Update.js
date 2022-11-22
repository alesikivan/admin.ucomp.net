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

    // Pressed "Enter" button & text should be empty
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

  useEffect(() => {
    API.getMember(id)
      .then(res => {
        const member = res.data
        setMember(prev => ({ ...prev, ...member  }))
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