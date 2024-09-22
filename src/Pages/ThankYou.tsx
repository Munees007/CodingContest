import { useEffect } from "react";
import "../Modules/themes"
import { useNavigate } from "react-router-dom";

const ThankYou = ()=>{
    const navigate = useNavigate();
    useEffect(()=>{
        const gameOver = localStorage.getItem("gameover");
        if(gameOver === "false")
            {
                navigate('/codespace');
            }
    },[navigate])
    return(
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
          <h2 className="text-2xl font-semibold mb-4">Welcome and Thank You!</h2>
          <p className="mb-4">Dear Participants,</p>
          <p className="mb-4">A huge thank you to all the amazing participants who took part in the hackathon! Your creativity, teamwork, and dedication truly made this event a success. We were blown away by the innovative solutions you developed in such a short time.</p>
          <h3 className="text-xl font-semibold mb-2">Credits</h3>
          <p className="mb-4">We would like to extend our special thanks to our seniors and the faculty members for their invaluable support and guidance. A heartfelt thank you to our Head of Department for approving and encouraging this event.</p>
          <p>We appreciate your participation and enthusiasm. We hope to see you in future events!</p>
        </div>
      </div>
    )
}

export default ThankYou;