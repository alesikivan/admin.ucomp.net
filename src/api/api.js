import axios from "axios"

const path = path => process.env.REACT_APP_SERVER_DATA + path

// Auth
const login = data => axios.post( path('/auth/login'), data )


// Blogs
const getBlogs = () => axios.get( path('/blog/get') )

const getBlog = id => axios.get( path('/blog/get/' + id) )

const createBlog = data => axios.post( path('/blog/create'), data )

const updateBlog = data => axios.put( path('/blog/update'), data )

const deleteBlog = id => axios.delete( path('/blog/delete/' + id) )


// Members
const getMembers = () => axios.get( path('/member/get') )

const getMember = id => axios.get( path('/member/get/' + id) )

const createMember = data => axios.post( path('/member/create'), data )

const updateMember = data => axios.put( path('/member/update'), data )

const deleteMember = id => axios.delete( path('/member/delete/' + id) )


// Publications
const getPublications = () => axios.get( path('/publication/get') )

const getPublication = id => axios.get( path('/publication/get/' + id) )

const createPublication = data => axios.post( path('/publication/create'), data )

const updatePublication = data => axios.put( path('/publication/update'), data )

const deletePublication = id => axios.delete( path('/publication/delete/' + id) )


// Collaborations
const getCollaborations = () => axios.get( path('/collaboration/get') )

const getCollaboration = id => axios.get( path('/collaboration/get/' + id) )

const createCollaboration = data => axios.post( path('/collaboration/create'), data )

const updateCollaboration = data => axios.put( path('/collaboration/update'), data )

const deleteCollaboration = id => axios.delete( path('/collaboration/delete/' + id) )


// Feedbacks
const getFeedbacks = () => axios.get( path('/feedback/get') )

const deleteFeedback = id => axios.delete( path('/feedback/delete/' + id) )

const API = {
  login,

  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,

  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,

  getPublications,
  getPublication,
  createPublication,
  updatePublication,
  deletePublication,  
  
  getCollaborations,
  getCollaboration,
  createCollaboration,
  updateCollaboration,
  deleteCollaboration,

  getFeedbacks,
  deleteFeedback,
}

export default API