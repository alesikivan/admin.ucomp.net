import { useState } from 'react'

import 'react-quill/dist/quill.snow.css'
import { useNavigate } from 'react-router-dom'

import API from '../../../../api/api'
import { createNotification } from '../../../../redux/actions/notificationsActions'
import { errorFormater } from '../../../../utils/errors'

function PublicationCreate() {
  const navigate = useNavigate()
  const [publication, setPublication] = useState({
    title: '',
    link: '',
    year: 2022,
    authors: []
  })

  const [authors, setAuthors] = useState('')

  function changeAuthors(event) {
    const text = event.target.value
    setAuthors(text)

    matchAuthors(text)
  }

  function matchAuthors(text) {
    const authors = text
      .split('/')
      .map(text => text.trim())
      .filter(text => text !== '')

    setPublication({ ...publication, authors })
  }

  function create(event) {
    event.preventDefault()
    
    API.createPublication(publication)
      .then(res => {
        const { message } = res.data
        createNotification(message, 'success')
        navigate('/publications')
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
        <label htmlFor='title'>Publication title</label>
        <input 
          onChange={event => setPublication({ ...publication, title: event.target.value })}
          type='text' 
          className='form-control' 
          id='title' 
          placeholder='Enter title' />
      </div>

      <div className='form-group'>
        <label htmlFor='link'>Publication link</label>
        <input 
          onChange={event => setPublication({ ...publication, link: event.target.value })}
          type='text' 
          className='form-control' 
          id='link' 
          placeholder='Enter link' />
      </div>      
      
      <div className='form-group'>
        <label htmlFor='year'>Publication year</label>
        <input 
          onChange={event => setPublication({ ...publication, year: event.target.value })}
          type='text' 
          className='form-control' 
          id='year' 
          placeholder='Enter year' />
      </div>

      <div className='form-group'>
        <label htmlFor='file'>Publication authors separeted by "/" (slash)</label>

        <input 
          value={authors}
          className='form-control' 
          onChange={e => changeAuthors(e)}
          type="text" 
          placeholder='Set some authors separeted by "/" (slash)' />
          
        <br />

        <ul className="list-group">
          {
            publication.authors.map((position, i) => 
              <li key={i} className="list-group-item">{ position }</li>)
          }
        </ul>
      </div>
      
      <button type='submit' className='btn btn-primary special'>Create publication</button>
    </form>
  )
}

export default PublicationCreate