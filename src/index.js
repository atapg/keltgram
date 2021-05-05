import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reducer, { initialState } from './store/reducer'
import { StateProvider } from './store/StateProvider'

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root')
)
