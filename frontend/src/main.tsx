import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Store from '../../brassbookWithReact/store/store'
import './fonts.css'
import './vars.css'
import './global.css'

interface State{
  store: Store,
}

const store = new Store();

export const Context = createContext<State>({
  store,
})



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Context.Provider value={{store}}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
)
