import { useState, useEffect } from 'react'

import checkEmail from '../../../utils/form'
import Title from '../../particles/Title'

import '../../../assets/styles/css/pages/auth/login.css'
import { login } from '../../../redux/actions/authActions'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [pending, setPending] = useState(false)

  const navigate = useNavigate()

  function validate(email, password) {
    // Form validation
    const emailValidated = checkEmail(email.trim())
    const passwordValidated = password.trim()

    return Boolean(emailValidated && passwordValidated)
  }

  function signIn(event) {
    event.preventDefault()

    if (validate(email, password) && !pending) {
      sendData()
    }
  }

  function clearForm() {
    setEmail('')
    setPassword('')
  }

  function sendData() {
    setPending(true)

    const data = { email, password }

    login(data)
      .finally(() => {
        navigate('/dashboard')

        clearForm()
        setPending(false)
      })
  }

  useEffect(() => {
    const result = validate(email, password)
    setIsActive(result)
  }, [email, password])

  return (
    <main className='login-page'>
      <Title text='Sign in' />
      
      <span className='preview'>
        Enter your login information in the system
      </span>

      <form className='login-form'>
        <input
          onChange={event => setEmail(event.target.value)} 
          value={email} 
          name='email' 
          type='email' 
          autoComplete="off"
          placeholder='Email' />

        <input
          onChange={event => setPassword(event.target.value)} 
          value={password} 
          name='password' 
          autoComplete="off"
          type='password' 
          placeholder='Password' />
        
        <button 
          onClick={signIn}
          className={isActive && !pending ? 'active' : ''}>
            Send your message
          </button>
      </form>
    </main>
  )
}

export default Login
