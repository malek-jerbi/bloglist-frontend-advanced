const notificationReducer = (state = '', action) => {

  if (action.type === 'SHOW') return action.data
  if (action.type === 'HIDE') return ''
  return state
}

export const showMessage = (message) => {
  return {
    type: 'SHOW',
    data: message
  }
}

export const removeMessage = () => {
  return {
    type: 'HIDE'
  }
}

export default notificationReducer