import { useEffect } from "react";
import "../Modules/themes"
import { useNavigate } from "react-router-dom";
const ThankYou = ()=>{
    const getTheme = () =>{
        return localStorage.getItem("theme") || "dracula";
    }
    const navigate = useNavigate();
    useEffect(()=>{
        const gameOver = localStorage.getItem("gameover");
        if(gameOver === "false")
            {
                navigate('/codespace');
            }
    },[navigate])
    return(
        <div className={`flex-col w-full h-screen ace-${getTheme} flex justify-center items-center`}>
            <p className="text-[8rem] uppercase font-serif">Thank You</p>
        </div>
    )
}

export default ThankYou;