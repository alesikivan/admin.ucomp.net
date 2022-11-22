import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import API from "../../../../api/api"
import Preloader from "../../../particles/Preloader"
import { createNotification } from '../../../../redux/actions/notificationsActions'
import { errorFormater } from '../../../../utils/errors'

function PublicationUpdate() {
  let { id } = useParams()
  const navigate = useNavigate()
  const [preloader, setPreloader] = useState(true)
  const [publication, setPublication] = useState({
    id,
    title: '',
    link: '',
    year: 2022,
    authors: []
  })

  function createAuthor(event) {
    const text = event.target.value

    // Pressed "Enter" button & text should not ebe empty
    if (event.which === 13 && text.trim()) {
      event.preventDefault()
      
      setPublication({ ...publication, authors: [...publication.authors, text] })

      event.target.value = ''
    }    

    // Pressed "Delete" button & text should be empty
    if (event.which === 8 && !text.trim()) {
      event.preventDefault()
      
      setPublication({ ...publication, authors: publication.authors.slice(0, -1) })
      event.target.value = ''
    }

    // Pressed "Enter" button & text should be empty
    if (event.which === 13 && !text.trim()) {
      event.preventDefault()
      return false
    }
  }

  function removeAuthor(position) {
    const { authors } = publication

    setPublication({ 
      ...publication, 
      authors: authors.filter(text => text !== position)
    })
  }

  useEffect(() => {
    API.getPublication(id)
      .then(res => {
        const publication = res.data
        setPublication(prev => ({ ...prev, ...publication  }))
      })
      .catch(err => console.log(err))
      .finally(() => {
        setPreloader(false)
      })
  }, [id])

  function update(e) {
    e.preventDefault()

    API.updatePublication(publication)
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
            <label htmlFor='title'>Publication title</label>
            <input 
              onChange={event => setPublication({ ...publication, title: event.target.value })}
              type='text' 
              className='form-control' 
              id='title' 
              value={publication.title}
              placeholder='Enter title' />
          </div>

          <div className='form-group'>
            <label htmlFor='link'>Publication link</label>
            <input 
              onChange={event => setPublication({ ...publication, link: event.target.value })}
              type='text' 
              value={publication.link}
              className='form-control' 
              id='link' 
              placeholder='Enter link' />
          </div>          
          
          <div className='form-group'>
            <label htmlFor='year'>Publication year</label>
            <input 
              onChange={event => setPublication({ ...publication, year: event.target.value })}
              type='text' 
              value={publication.year}
              className='form-control' 
              id='year' 
              placeholder='Enter year' />
          </div>

          <div className='form-group'>
            <label htmlFor='file'>Publication authors</label>

            <ul className='content-list'>
              {
                publication.authors.map((position, i) => 
                  <li key={i} className="content-list-item">
                    { position } 
                    <span onClick={() => removeAuthor(position)} className='remove-content-list-item'>&times;</span>
                  </li>)
              }
              <li>
                <input 
                  placeholder='Press enter to add'
                  onKeyDown={e => createAuthor(e)}
                  type="text" />
              </li>
            </ul>

          </div>
          
          <button type='submit' className='btn btn-primary special'>Update publication</button>
        </form>
      )
    }
  </>
  )
}

export default PublicationUpdate