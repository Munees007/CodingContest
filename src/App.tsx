import { useEffect } from 'react'
import './App.css'
import { enterFullScreen } from './Functions/FullScreen'
import Home from './Pages/Home'

function App() {
  useEffect(()=>{
    document.addEventListener('keydown', event => {
      if (event.key === 'F11') {
        event.preventDefault();
        return false;
      }
    });
    document.addEventListener('contextmenu', event => {
        event.preventDefault();
        return false;
    });
  })
  return (
    <div onClick={enterFullScreen}>
      <Home/>
    </div>
  )
}

export default App
