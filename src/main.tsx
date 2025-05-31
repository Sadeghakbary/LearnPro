import { direction } from '@/localization'
import { store } from '@/redux/store'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'

document.getElementsByTagName('body')[0].setAttribute('dir', direction)

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
)
