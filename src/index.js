import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
const store = createStore(notificationReducer)

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>, document.getElementById('root'))