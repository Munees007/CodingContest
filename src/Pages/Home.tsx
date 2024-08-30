import { useEffect, useState } from "react";
import MatrixEffect from "../Components/MatrixEffect";
import {enterFullScreen} from "../Functions/FullScreen"
import { useNavigate } from "react-router-dom";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import Form from "../Components/Form";
import Credits from "../Components/Credit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

const Home = () =>{
    const [currentImg, setCurrentImg] = useState<string>("Bg1");
    const backGround = ["Bg1", "bg3", "bg2"];
    const navigate =  useNavigate();
    useEffect(()=>{
        enterFullScreen();
    },[])
    const handleImageChange = (direction: "next" | "prev") => {
      const currentIndex = backGround.indexOf(currentImg);
      const nextIndex = direction === "next" ? (currentIndex + 1) % backGround.length : (currentIndex - 1 + backGround.length) % backGround.length;
      setCurrentImg(backGround[nextIndex]);
  };
    const handleChangeRoute = () =>{
      const temp = localStorage.getItem("formSubmitted");
      if(!temp)
        {
          navigate('/');
        }
      navigate('/codespace');
    }
    return (
      <div className={`relative w-full h-screen `}>
        <img src={`./src/assets/images/${currentImg}.jpg`} className="w-full h-full"></img>
        {backGround.indexOf(currentImg) === 1 && (
          <div className={`absolute bg-black/60 inset-0 flex items-center justify-center `}>
            <Form/>
          </div>
        )}
        {backGround.indexOf(currentImg) === 2 && (
          <div className="absolute  inset-0 animate-scroll  flex items-center justify-center">
              <Credits/>
          </div>
        )}
        <div className="absolute inset-y-1/2 left-0 right-0 flex justify-between px-4 z-10">
          <button
            className="bg-gray-800 flex items-center animate-scale text-white p-4 rounded-full"
            title="Previous Image"
            onClick={() => handleImageChange("prev")}
          >
            <BiSolidLeftArrow />
          </button>
          <button
            className="bg-gray-800 flex items-center animate-scale  text-white p-4 rounded-full"
            title="Next Image"
            onClick={() => handleImageChange("next")}
          >
            <BiSolidRightArrow />
          </button>
        </div>
        <img src="./src/assets/images/btn.png" title="Start" onClick={handleChangeRoute} className="absolute bottom-5 right-8 w-32 hover:scale-110 cursor-pointer active:scale-90"></img>
        <MatrixEffect/>
        <ToastContainer/>
      </div>
    );
}

export default Home;