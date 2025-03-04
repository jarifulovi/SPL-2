import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "./components/ui/provider"
import SocketProvider from './components/Context/SocketProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Provider>
  </StrictMode>,
)
