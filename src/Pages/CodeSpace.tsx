import { useEffect, useState } from "react";
import Compiler from "../Components/Compiler";
import "../Modules/themes";
import { VscArrowLeft, VscArrowRight } from "react-icons/vsc";
import "../Modules/questions";
import Question from "../Components/Question";
import {  ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import Lottie from "lottie-react";
import normalLoading from "../assets/animations/normalLoading.json";
import { useNavigate } from "react-router-dom";
import { MdDoubleArrow } from "react-icons/md";
import FullQuestion from "../Components/FullQuestion";
import { Level } from "../types/QuestionType";
import { getLevelsData } from "../Database/functions/addData";

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
  const [levelData, setLevelData] = useState<Level[] | null>(null);
  const [currentLevel,setCurrentLevel] = useState<Level | null>(null);
  useEffect(()=>{
    const FectchData = async () =>{
      // const temp:Level[] = JSON.parse(localStorage.getItem("UselevelData")!);
      // if(temp){
      //     setLevelData(temp)
      // } 
      // else
      // {
        const getdata:Level[] = await getLevelsData();
        setLevelData(getdata);
        localStorage.setItem("UselevelData",JSON.stringify(getdata));
      // }
    }
    FectchData();
  },[])
  useEffect(() => {
    const temp:number = parseInt(localStorage.getItem("LevelIndicator")!);
    if (temp) {
      // Use the stored question index
      levelData && setCurrentLevel(levelData[temp])
      
    } else {
      // Generate a new random number and store it
      localStorage.setItem("LevelIndicator","0");
      levelData && setCurrentLevel(levelData[0]);
    }
  }, [levelData]);
  const [showSlide, setShowSlide] = useState<boolean>(false);
  const [currenQuestionIndex, setCurrentQuestionIndex] = useState<number>(1);
  const handleQuestion = (value: number,status:boolean) => {
    setCurrentQuestionIndex(value);
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
    console.log(currenQuestionIndex)
    return currentLevel?.questions[currenQuestionIndex-1]
  }

  return (
    <div>
      { currentLevel ? (
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
            {currentLevel.questions.map((question, index) => (
              <Question
                key={index}
                question={question}
                questionNo={index + 1}
                setQuestion={handleQuestion}
                theme={theme}
                setShowQuestion={setShowQuestion}
              />
            ))}
          </div>
        </div>
        <Compiler questionNo={currenQuestionIndex} />
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
