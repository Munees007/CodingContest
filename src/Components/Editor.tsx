import AceEditor from "react-ace";
import "../Modules/language";
import "../Modules/themes";
import React, { useEffect, useRef, useState } from "react";
import DropDown from "./DropDown";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/ReactToastify.min.css'
import { VscCheck,VscPlay, } from "react-icons/vsc";
import { VscSave } from "react-icons/vsc";
import Lottie from "lottie-react";
import loading from '../assets/animations/loading.json';
import empty from '../assets/animations/codeStart.json';
import error1 from "../assets/animations/error1.json";
import { ResultType } from "./Compiler";
import { FaTrash } from "react-icons/fa";
import { answers, answersType } from "../Modules/answers";
import successAni from "../assets/animations/sucess1.json";
import timerAni from "../assets/animations/timer1.json";
import { addCodeData } from "../Database/functions/addData";
import { useNavigate } from "react-router-dom";
import { CodeObject, defaultCode } from "../Modules/questions";

interface EditorProps {
  ExecuteCode: (code: string, language: string, file: string) => void;
  Result: ResultType | null;
  questionNo:number;
  clearOutput:() => void;
}
export type answeredType = {
  answered1:boolean;
  answered2:boolean;
  answered3:boolean;
  answered4:boolean;
  answered5:boolean;
}

export type codeData = {
  question1:{
    code:string,
    language:string,
    output:string,
  },
  question2:{
    code:string,
    language:string,
    output:string,
  }
  question3:{
    code:string,
    language:string,
    output:string,
  }
  question4:{
    code:string,
    language:string,
    output:string,
  }
  question5:{
    code:string,
    language:string,
    output:string,
  }
  fullData:answeredType,
  timeLeft: string
}
const Editor: React.FC<EditorProps> = ({ ExecuteCode, Result,questionNo,clearOutput }) => {


  const getCurrentDefaultCode = ():string =>{
    const currentLot:number = parseInt(localStorage.getItem("questionNo")!)
    const CurrentQuestion = defaultCode[currentLot];
    const questionKey: keyof CodeObject = `question${questionNo}` as keyof CodeObject;
    const defaultQuestionCode = CurrentQuestion?.[questionKey];

    return defaultQuestionCode || "";
  }
  const [code, setCode] = useState<string>(()=>{
    
    return localStorage.getItem(questionNo.toString()) || getCurrentDefaultCode();
  });
  const editorRef = useRef<AceEditor|null>(null);
  const navigate = useNavigate();
  const [timerRunning,setTimerRunning] = useState<boolean>(true);
  const [gameOver,setGameOver] = useState<boolean>(false);

  useEffect(()=>{
      const temp = localStorage.getItem("gameOver") || "false";
      const timer = localStorage.getItem("timer") || "60";
      if(temp !== "false" || timer === "0")
      {
        navigate('/thankYou')
      }
  },[])
  
  const [timer,setTimer] = useState<number>(()=>{
    const temp = localStorage.getItem("timer")
    if(temp){
      return parseInt(temp)
    } 
    else{
      localStorage.setItem("timer",(60*60).toString());
      return 60*60; // time in seconds 
    }
  })
  const [answeredQuestion,setAnsweredQuestions] = useState<answeredType>(()=>{
    const storedData = localStorage.getItem("answeredData");
    return  storedData ? JSON.parse(storedData) : {answered1:false,
    answered2:false,
    answered3:false,
    answered4:false,
    answered5:false
  }});
  //const [canSubmit,setCanSubmit] = useState<boolean>(false);
  const [theme, SetTheme] = useState<string>(()=>{
    return localStorage.getItem("theme") || "dracula";
  });
  const [language, SetLanguage] = useState<string>(()=>{
    return localStorage.getItem("Question"+questionNo.toString() +"language") || "java";
  });
  const [lot,_] = useState<number>(()=>{
    return parseInt(localStorage.getItem('questionNo')!)
  })
  const runCode = () => {
    if (code !== "") {
      ExecuteCode(code, language, "main." + language);
    } else {
      toast.error("Type something");
    }
  };
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getScore = ():number =>{
    let a:number = 0;
     Object.entries(answeredQuestion).map(([_,val])=>{
       if(val)
       {
          a++;
       }
     })
     return a;
  }
  useEffect(()=>{
    if(!timerRunning && gameOver) return
      const handleTimer = setInterval(()=>{
          setTimer((preValue)=> preValue -1);
          localStorage.setItem("timer",timer.toString())
          
      },1000)

      if(timer ===0)
      {
        setTimer(0);
        setTimerRunning(false);
        setGameOver(true);
        localStorage.setItem("timer","0");
        localStorage.setItem("gameOver","true");
        navigate('/thankYou')
      }

      if(getScore() === 5)
      {
          setTimerRunning(false);
          setGameOver(true);
          localStorage.setItem("gameOver","true");
          navigate('/thankYou')
      }
      
      return() => clearInterval(handleTimer)      
  },[timer,timerRunning])
  

  // useEffect(()=>{
  //     if(Result?.output)
  //     {
  //       setCanSubmit(true);
  //     }
  //     else
  //     {
  //       setCanSubmit(false);
  //     }
  // },[Result?.output])
  const themes = [
    { label: "Twilight", value: "twilight" },
    { label: "Clouds", value: "clouds" },
    { label: "Dawn", value: "dawn" },
    { label: "Dracula", value: "dracula" },
    { label: "Ambiance", value: "ambiance" },
    { label: "DreamWeaver", value: "dreamweaver" },
    { label: "Chaos", value: "chaos" },
    { label: "Cobalt", value: "cobalt" },
    { label: "Eclipse", value: "eclipse" },
    { label: "GruvBox", value: "gruvbox" },
    { label: "Gob", value: "gob" },
    { label: "Monokai", value: "monokai" },
  ];
  const languages = [
    { label: "C++", value: "cpp" },
    { label: "Java", value: "java" },
  ];

  const handleTheme = (value: string) => {
    SetTheme(value);
    localStorage.setItem('theme',value);
  };
  const handleLanguage = (value: string) => {
    SetLanguage(value);
  };
  const handleSubmit = () =>{
    if (!Result) return toast.error("Run the Code First")
    if(Result?.success){
      let answerKey = "answer"+questionNo as keyof answersType;
      if(Result?.output === answers[lot][answerKey])
      {
        const updatedData:answeredType = {
          ...answeredQuestion,
          [`answered${questionNo}`]:true
        }
        save();
        setAnsweredQuestions(updatedData);
        const temp:codeData = {
          question1:{
            code: localStorage.getItem("1") || "",
            language:localStorage.getItem("Question1language")|| "java",
            output:localStorage.getItem("Question1output") || ""
          },
          question2:{
            code: localStorage.getItem("2") || "",
            language:localStorage.getItem("Question2language")|| "java",
            output:localStorage.getItem("Question2output") || ""
          },
          question3:{
            code: localStorage.getItem("3") || "",
            language:localStorage.getItem("Question3language")|| "java",
            output:localStorage.getItem("Question3output") || ""
          },
          question4:{
            code: localStorage.getItem("4") || "",
            language:localStorage.getItem("Question4language")|| "java",
            output:localStorage.getItem("Question4output") || ""
          },
          question5:{
            code: localStorage.getItem("5") || "",
            language:localStorage.getItem("Question5language")|| "java",
            output:localStorage.getItem("Question5output") || ""
          },
          fullData:updatedData,
          timeLeft:formatTime(timer)
        }

        addCodeData(temp);
        toast.success("submitted successfully")
      }
      else
      {
        toast.error("output not matched")
      }
    }
    else
    {
      toast.warning("Please correct the errors before submitting")
    }
  };

  useEffect(()=>{
    localStorage.setItem("answeredData",JSON.stringify(answeredQuestion));
  },[answeredQuestion])
  useEffect(()=>{
    const temp = localStorage.getItem("Question"+questionNo.toString() +"language") || "java";

    SetLanguage(temp);
  },[questionNo])
  useEffect(()=>{
      localStorage.setItem("Question"+questionNo+"output",Result?.output!);
  },[Result])
  const save = ()=>{
    if(code === "") {toast.error("Please Type Program Before Saving"); return} 
    localStorage.setItem(questionNo.toString(),code);
    localStorage.setItem("Question"+questionNo.toString() +"language",language);
  }
  const handleSave = ()=>{
    save();
    toast.success("Saved Successfully");
  }
  useEffect(()=>{
    const storedCode = localStorage.getItem(questionNo.toString()) || getCurrentDefaultCode();
    setCode(storedCode);
  },[questionNo])
  const messages = [
    "Well done! You've successfully conquered another coding question!",
    "Nice work! One more coding puzzle down, keep the momentum going!",
    "Fantastic! You've completed another step towards victory!",
    "You're on fire! Another coding challenge solved, just a few more to go!"
  ];
  const generateRandom = (val:number):number =>{
    const temp = Math.floor(Math.random() * val);
    return temp;
  }  
  const handleChange = ( e:string) =>{

    if(editorRef.current === null) return
    const editor = editorRef.current.editor;
    const cursorPosition = editor.getCursorPosition();

    // Prevent modifying the first 10 lines
    if (cursorPosition.row >= 6 ) {
      
      setCode(e); // Update the code normally if editing is after the first 10 lines
    } else {
      // Prevent editing the custom lines
      editor.setValue(code, -1); // Reset to the previous code to revert changes in protected lines
    }
    //setCode(e)
  }
  
  
  return (
    <div className={`ace-${theme ? theme : "dracula"} relative h-screen p-5 overflow-hidden`}>
      <p className="text-4xl font-bold text-center">CODING CONTEST</p>
      {
        answeredQuestion[`answered${questionNo}` as keyof answeredType] && (
          <div className="z-40 absolute inset-0 flex-col flex justify-center items-center bg-black bg-opacity-50 text-white text-3xl font-semibold">
            <Lottie animationData={successAni} loop={true} className="w-96"/>
            <p>{messages[generateRandom(messages.length)]}</p>
          </div>
        )
      }
      <div className="flex gap-4 mt-6">
        <DropDown
          options={themes}
          onSelect={handleTheme}
          theme={theme}
          value={theme}
          condition={"Theme"}
        />
        <DropDown
          options={languages}
          onSelect={handleLanguage}
          theme={theme}
          value={language}
          condition={"Language"}
        />
        <p className="text-center  text-xl font-bold  ">QUESTION: {questionNo}</p>
        <div style={{border:"2px solid",borderRadius:"8px"}} 
        className="flex absolute bg-blue-500 h-12 shadow-md shadow-gray-500  w-fit p-2 right-52 mr-10 top-20 justify-center items-center">
          <Lottie animationData={timerAni} loop={timerRunning} className="w-20 -ml-6"/>
          <p className="text-xl font-mono font-bold">{formatTime(timer)}</p>
        </div>
        <div className="absolute right-10 top-22 flex">
          <button > 
            <VscCheck size={30} onClick={handleSubmit}  className={`mr-4 hover:scale-105 active:scale-90`}/>
          </button>
          <VscSave onClick={handleSave} title="Save" size={30} className="mr-4 cursor-pointer hover:scale-105 active:scale-90" />
          <VscPlay onClick={runCode} title="Run" size={30} className="cursor-pointer hover:scale-105 active:scale-90" />
        </div>
      </div>
      <div className="flex w-full gap-4 mt-7">
        <div className="w-fit mt-2   rounded-sm resize-x">
          <AceEditor
            mode={`${language === "cpp" ? "c_cpp" : language}`}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
            theme={`${theme ? theme : "dracula"}`}
            width="45rem"
            height="30rem"
            style={{border:"2px solid",borderRadius:"8px"}}
            showPrintMargin={false}
            className="shadow-md shadow-gray-500"
            fontSize={20}
            value={code}
            onChange={(e) => {
              language ?
                handleChange(e) : toast.warning("Please Choose the language")
            }}
            ref={editorRef}
          />
        </div>
        <div style={{border:"2px solid",borderRadius:"8px"}} className={` w-full mt-2 h-[30rem] p-2 overflow-y-auto shadow-md shadow-gray-500`}>
          <div className="flex justify-between">
            <p className="text-2xl font-serif font-bold">Output:</p>
            <FaTrash size={22} onClick={clearOutput} className="m-1 cursor-pointer" title="clear output window"/>
          </div>
          <div className="w-full">
            {
              !Result ? 
                <div className="w-full flex justify-center">
                    <Lottie animationData={empty} className="w-96" loop={true}/>
                </div> 
              :
                Result.output === "Compiling" ?
                  <div className="w-full flex justify-center">
                       <Lottie animationData={loading} className="w-96" loop={true}/>
                  </div>
                :
                  Result.success ?
                  <div className="whitespace-pre mt-4 ml-4 font-mono text-xl">
                    <p>{Result.output}</p>
                  </div>
                  :
                  <div className="w-full flex flex-col">
                      <div className="w-full flex justify-center">
                       <Lottie animationData={error1} className="w-44 -mt-10" loop={true}/>
                      </div>
                       <p>{Result.output}</p>
                  </div>
                  
            }
          </div>
        </div>
      </div>
      <div className="flex w-full">
      <div className="flex w-full mt-6">
        <div className="flex  items-center w-fit z-30  px-5 gap-5" style={{border:"2px solid",borderRadius:"8px"}}>
          <img src="./src/assets/images/3.jpg" className="w-14 rounded-full shadow-sm shadow-black border-2 border-black"></img>
          <div className="flex flex-col items-center">
            <p className="">Organised by</p>
            <p>R. Karthik Balan,</p>
            <p>III BCA B.</p>
            {/* <p>Chairman of the Softech Association.</p> */}
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end mt-6">
        <div className="flex  items-center w-fit z-30  px-5 gap-5" style={{border:"2px solid",borderRadius:"8px"}}>
          <img src="./src/assets/images/MwLogo.png" className="w-14"></img>
          <div className="flex flex-col items-center">
            <p className="">Developed by</p>
            <p>P. Muneeswaran,</p>
            <p>III BCA B.</p>
            {/* <p>Chairman of the Softech Association.</p> */}
          </div>
        </div>
      </div>
      </div>

      <ToastContainer position="top-right" stacked />
    </div>
  );
};

export default Editor;
