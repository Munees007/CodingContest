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
import { MdDoubleArrow } from "react-icons/md";
import FullQuestion from "../Components/FullQuestion";

type example = {
  input:string,
  output:string
}
type content = {
    problem:string,
    input: string,
    output:string,
    example1:example,
    example2:example
}
export type question = {
  title:string,
  content:content
}
export type questionType = {
  question1: question;
  question2: question;
  question3: question;
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
  const [showQuestion,setShowQuestion] = useState<boolean>(false);
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
  const handleQuestion = (value: number,status:boolean) => {
    setCurrentQuestion(value);
    setShowSlide(status);
    
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

  const getCurrentQuestion = ()=>{
    const questionKey: keyof questionType = `question${currenQuestion}` as keyof questionType;

    return question?.[questionKey];
  }

  return (
    <div>
      { question ? (
      <div className={`ace-${theme} relative w-full`}>
        <VscArrowRight
          title="Click to see Questions"
          size={35}
          onClick={handleShowSlide}
          className={`absolute left-0 z-50 top-5 ace-${theme}   animate-scale cursor-pointer  ${
            showSlide ? "hidden" : ""
          }`}
        />

        <div
          className={`absolute z-50 left-0 h-screen overflow-y-auto transform${
            showSlide ? "translate-x-0" : "hidden -translate-x-full"
          } text-black border-2 w-96 ace-${theme} duration-500`}
        >
          <div className="w-full flex justify-end pr-2">
          <VscArrowLeft
            size={35}
            title="Close SlideBar"
            onClick={handleShowSlide}
            className={` ace-${theme}  z-50 top-3 animate-scale cursor-pointer ${
              showSlide ? "" : "hidden"
            }`}
          />
          </div>
          <div className={`z-50`}>
            {Object.entries(question).map(([key, question], index) => (
              <Question
                key={key}
                question={question}
                questionNo={index + 1}
                setQuestion={handleQuestion}
                theme={theme}
                setShowQuestion={setShowQuestion}
              />
            ))}
          </div>
        </div>
        <Compiler questionNo={currenQuestion} />
       { showQuestion && <FullQuestion theme={theme} getCurrentQuestion={getCurrentQuestion} setShowQuestion={setShowQuestion}/>
      }
        <div className="absolute bottom-0 flex justify-center w-full">
          <span onClick={()=>{setShowQuestion(true)}} className={`-rotate-90 ${showQuestion ? "hidden" : ""}`}>
          <MdDoubleArrow size={45} className=" cursor-pointer opacity-50 animate-scale"/>
          </span>  
        </div>
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
