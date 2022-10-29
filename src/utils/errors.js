export const errorFormater = data => {
  if (data.message) {
    return data.message
  }

  if (data?.errors) {
    const { errors } = data?.errors
    const [error] = errors
    return error.msg
  } 
}