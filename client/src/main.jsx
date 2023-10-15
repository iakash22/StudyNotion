import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store.js';
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
      <Toaster />
      <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
