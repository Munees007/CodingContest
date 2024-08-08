import { useEffect } from "react";
import MatrixEffect from "../Components/MatrixEffect";
import {enterFullScreen} from "../Functions/FullScreen"
import { useNavigate } from "react-router-dom";
const Home = () =>{
    const navigate =  useNavigate();
    useEffect(()=>{
        enterFullScreen();
    },[])
    const handleChangeRoute = () =>{
      navigate('/codespace');
    }
    return (
      <div className="relative w-full h-screen">
        <img src="./src/assets/images/Bg1.jpg" className="w-full h-full"></img>
        <img src="./src/assets/images/btn.png" title="Start" onClick={handleChangeRoute} className="absolute bottom-5 right-8 w-32 hover:scale-110 cursor-pointer active:scale-90"></img>
        <MatrixEffect/>
      </div>
    );
}

export default Home;