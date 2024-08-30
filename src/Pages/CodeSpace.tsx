import { useEffect, useState } from "react";
import Compiler from "../Components/Compiler";
import "../Modules/themes";
import { VscArrowLeft, VscArrowRight } from "react-icons/vsc";
import "../Modules/questions";
import { questions } from "../Modules/questions";
import Question from "../Components/Question";
import {  ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import Lottie from "lottie-react";
import normalLoading from "../assets/animations/normalLoading.json";
import { useNavigate } from "react-router-dom";

type questionType = {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
};

  const CodeSpace = () =>{
    const navigate = useNavigate();
  useEffect(()=>{
      const temp = localStorage.getItem("formSubmitted");
      if(!temp)
      {
          navigate('/');
      }
  },[])
  const [theme, setTheme] = useState<string>(() => {
    const temp = localStorage.getItem("theme");
    return temp ? temp : "dracula";
  });
  const [question, setQuestion] = useState<questionType | null>(null);
  useEffect(() => {
    const temp = localStorage.getItem("questionNo");

    if (temp) {
      // Use the stored question index
      const b: number = parseInt(temp);
      setQuestion(questions[b]);
    } else {
      // Generate a new random number and store it
      const a: number = Math.floor(Math.random() * questions.length);
      localStorage.setItem("questionNo", a.toString());
      setQuestion(questions[a]);
    }
  }, []);
  const [showSlide, setShowSlide] = useState<boolean>(false);
  const [currenQuestion, setCurrentQuestion] = useState<number>(1);
  const handleQuestion = (value: number) => {
    setCurrentQuestion(value);
    setShowSlide(false);
  };
  const handleShowSlide = () => {
    setShowSlide(!showSlide);
  };
  useEffect(() => {
    const checkTheme = () => {
      const storedTheme = localStorage.getItem("theme") || "dracula";
      if (storedTheme !== theme) {
        setTheme(storedTheme);
      }
    };

    // Check theme on mount
    checkTheme();

    // Poll for changes every second
    const interval = setInterval(checkTheme, 10);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [theme]);

  return (
    <div>
      { question ? (
      <div className={`ace-${theme} relative w-full`}>
        <VscArrowRight
          title="Click to see Questions"
          size={35}
          onClick={handleShowSlide}
          className={`absolute left-0 z-50 top-5   animate-scale cursor-pointer  ${
            showSlide ? "hidden" : ""
          }`}
        />

        <div
          className={`absolute z-50 left-0 h-screen overflow-y-auto transform${
            showSlide ? "translate-x-0" : "hidden -translate-x-full"
          } text-black border-2 w-96 bg-gray-500 duration-500`}
        >
          <VscArrowLeft
            size={35}
            title="Close SlideBar"
            onClick={handleShowSlide}
            className={`fixed left-80 z-50 top-3 animate-scale cursor-pointer ${
              showSlide ? "" : "hidden"
            }`}
          />
          <div className={`z-50`}>
            {Object.entries(question).map(([key, question], index) => (
              <Question
                key={key}
                question={question}
                questionNo={index + 1}
                setQuestion={handleQuestion}
              />
            ))}
          </div>
        </div>
        <Compiler questionNo={currenQuestion} />
        <ToastContainer />
      </div>) :
      (
        <div className={`w-full flex justify-center h-screen items-center bg-black`}>
            <Lottie animationData={normalLoading} loop={true} className="w-44"/>
        </div>)
      }    
    </div>
  );
};
export default CodeSpace;
