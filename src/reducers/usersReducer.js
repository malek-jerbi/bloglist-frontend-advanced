import usersService from '../services/users'

const usersReducer = (state = [], action) => {
  if (action.type==='INIT_USERS') return action.data
  return state
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getUsers()
    dispatch ({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default usersReducer