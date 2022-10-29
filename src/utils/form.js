export default function checkEmail(email = '') {
  // Return true or false
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  
  return reg.test(email)
}