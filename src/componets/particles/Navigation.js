import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import '../../assets/styles/css/particles/navigation.css'

function Navigation() {
  const { isAuthenticated } = useSelector(state => state.auth)

  const links = [
    { link: 'publications', path: '/publications' },
    { link: 'blogs', path: '/blogs' },
    { link: 'members', path: '/members' },
    { link: 'feedbacks', path: '/feedbacks' },
    { link: 'collaborations', path: '/collaborations' },
  ]
  return (
    isAuthenticated ? (
      <nav className='app-navigation'>
        <ul className="nav flex-column nav-pills">
          {
            links.map((link, index) => {
              return (
                <li key={index}>
                  <NavLink 
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                    to={link.path}>{link.link}</NavLink>
                </li>  
              )
            })
          }
        </ul>
      </nav>
    ) : ''
  )
}

export default Navigation