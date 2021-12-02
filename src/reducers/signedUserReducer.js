
const signedUserReducer = (state = null, action) => {
  if (action.type === 'LOG_IN') return action.data
  if (action.type === 'LOG_OUT') return null
  return state
}

export const signUser = (user) => {
  return {
    type: 'LOG_IN',
    data: user
  }
}

export const unSignUser = () => {
  return {
    type: 'LOG_OUT',
  }
}

export default signedUserReducer