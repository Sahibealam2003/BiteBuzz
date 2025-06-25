import { createRoot } from 'react-dom/client'
import './index.css'
import './fonts.css'
import 'leaflet/dist/leaflet.css';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GlobalContext } from './Utils/Contex/ApiContext.jsx'

createRoot(document.getElementById('root')).render(
  <GlobalContext>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </GlobalContext>
  
)
