import { useState } from 'react';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import images from '../../assets/images/imgs'

import '../../assets/styles/css/particles/header.css'

import { logout } from '../../redux/actions/authActions'
import Notifications from './Notifications';

function Header() {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const { isAuthenticated } = useSelector(state => state.auth)
  
  const url = 'https://ucomp.net'

  return (
    <header className='main-header'>
      <div className='cover'>
        <Link to="/" className='logo'>
          <img src={images.logo} alt="logo"/>
        </Link>

        {
          isAuthenticated ? (
            <ul>
              <li onClick={() => setIsMenuActive(!isMenuActive)}>
                <Link to="dashboard">dashboard</Link>
              </li>
            </ul>
          ) : ''
        }

        <section className='navigation-buttons'>
          {
            isAuthenticated ? (
              <button className='special-link logout' onClick={logout}>Logout</button>
            ) : (
              <a target='_blank' rel='noreferrer' href={url} className='special-link'>Client App</a>
            )
          }
        </section>
        <button onClick={() => setIsMenuActive(!isMenuActive)} className='menu-button'>
          <img src={isMenuActive ? images.close : images.menu} alt="menu"/>
        </button>
        <Notifications />
      </div>

      {
        isMenuActive ? (
          <section className='burger-menu'>
            {
              isAuthenticated ? (
                <ul>
                  <li onClick={() => setIsMenuActive(!isMenuActive)}>
                    <Link to="dashboard">dashboard</Link>
                  </li>
                </ul>
              ) : ''
            }
          </section>
        ) : ''
      }
    </header>
  )
}

export default Header
