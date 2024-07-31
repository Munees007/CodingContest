import { useEffect } from "react";
import MatrixEffect from "../Components/MatrixEffect";
import {enterFullScreen} from "../Functions/FullScreen"
const Home = () =>{
    useEffect(()=>{
        enterFullScreen();
    },[])
    return (
      <div className="relative w-full h-screen">
        <img src="bg.jpg" className="w-full h-full"></img>
        <MatrixEffect/>
      </div>
    );
}

export default Home;