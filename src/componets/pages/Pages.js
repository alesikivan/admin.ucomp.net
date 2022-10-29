import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PrivateRoute from '../particles/PrivateRoute'

import Login from './auth/Login'
import Dashboard from './Dashboard'
import Home from './Home'
import NotFoundPage from './NotFoundPage'
import BlogsView from './cruds/blogs/View'
import BlogCreate from './cruds/blogs/Create'
import BlogUpdate from './cruds/blogs/Update'
import MembersView from './cruds/members/View'
import MemberCreate from './cruds/members/Create'
import MemberUpdate from './cruds/members/Update'
import PublicationsView from './cruds/publications/View'
import PublicationCreate from './cruds/publications/Create'
import PublicationUpdate from './cruds/publications/Update'
import CollaborationsView from './cruds/collaborations/View'
import CollaborationCreate from './cruds/collaborations/Create'
import CollaborationUpdate from './cruds/collaborations/Update'
import FeedbacksView from './cruds/feedbacks/View'

function Pages() {
  const { isAuthenticated: auth } = useSelector(state => state.auth)

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      
      <Route path='login' element={ auth ? <Navigate to='/dashboard' /> : <Login />} />
      
      <Route exact path='/dashboard' element={<PrivateRoute/>}>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
      </Route>
      
      <Route exact path='/blogs' element={<PrivateRoute/>}>
        <Route exact path='/blogs' element={<BlogsView/>}/>
      </Route>
      <Route exact path='/blog/create' element={<PrivateRoute/>}>
        <Route exact path='/blog/create' element={<BlogCreate/>}/>
      </Route>
      <Route exact path='/blog/update/:id' element={<PrivateRoute/>}>
        <Route exact path='/blog/update/:id' element={<BlogUpdate/>}/>
      </Route>

      <Route exact path='/members' element={<PrivateRoute/>}>
        <Route exact path='/members' element={<MembersView/>}/>
      </Route>
      <Route exact path='/member/create' element={<PrivateRoute/>}>
        <Route exact path='/member/create' element={<MemberCreate/>}/>
      </Route>
      <Route exact path='/member/update/:id' element={<PrivateRoute/>}>
        <Route exact path='/member/update/:id' element={<MemberUpdate/>}/>
      </Route>

      <Route exact path='/publications' element={<PrivateRoute/>}>
        <Route exact path='/publications' element={<PublicationsView/>}/>
      </Route>
      <Route exact path='/publication/create' element={<PrivateRoute/>}>
        <Route exact path='/publication/create' element={<PublicationCreate/>}/>
      </Route>
      <Route exact path='/publication/update/:id' element={<PrivateRoute/>}>
        <Route exact path='/publication/update/:id' element={<PublicationUpdate/>}/>
      </Route>

      <Route exact path='/collaborations' element={<PrivateRoute/>}>
        <Route exact path='/collaborations' element={<CollaborationsView/>}/>
      </Route>
      <Route exact path='/collaboration/create' element={<PrivateRoute/>}>
        <Route exact path='/collaboration/create' element={<CollaborationCreate/>}/>
      </Route>
      <Route exact path='/collaboration/update/:id' element={<PrivateRoute/>}>
        <Route exact path='/collaboration/update/:id' element={<CollaborationUpdate/>}/>
      </Route>

      <Route exact path='/feedbacks' element={<PrivateRoute/>}>
        <Route exact path='/feedbacks' element={<FeedbacksView/>}/>
      </Route>
      
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default Pages