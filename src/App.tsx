import { useEffect } from 'react'
import './App.css'
import { enterFullScreen } from './Functions/FullScreen'
import Home from './Pages/Home'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import CodeSpace from './Pages/CodeSpace'

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
      <Router>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='codespace' element={<CodeSpace/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
