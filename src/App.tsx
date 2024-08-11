import { useEffect } from 'react'
import './App.css'
import { enterFullScreen } from './Functions/FullScreen'
import Home from './Pages/Home'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import CodeSpace from './Pages/CodeSpace'
import Admin from './Pages/Admin'
import Profile from './Components/Profile'

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
    <div onClick={enterFullScreen} className='overflow-hidden'>
      <Router>
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/codespace' element={<CodeSpace/>}></Route>
            <Route path="/dw" element={<Admin/>}/>
            <Route path='/profile/:userName' element={<Profile/>}/>
        </Routes>
      </Router>6
    </div>
  )
}

export default App
