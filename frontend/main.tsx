

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './app'
import './index.css'
import { direction } from './localization'
import { store } from './redux/store'

document.getElementsByTagName('body')[0].setAttribute('dir', direction)

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
)   