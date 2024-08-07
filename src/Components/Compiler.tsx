
import  React, { useRef, useEffect, useState } from "react";
import Editor from "./Editor";

interface CompilerProps{
  questionNo:number
}
const Compiler:React.FC<CompilerProps> = ({questionNo}) => {
  const iFrameRef = useRef<HTMLIFrameElement>(null);
  const [result,setResult] = useState<string | null>(null);
  const [IsCodeChanged,SetCodeChanged] = useState(false);
  // const [number,setnum] = useState(null);

  const ExecuteCode =  (code:string, language:string, file:string) => {
    const iFrame = iFrameRef.current;
    setResult(null);
    if(!iFrame || !iFrame.contentWindow) return
    iFrame.contentWindow.postMessage(
      {
        eventType: "populateCode",
        language: language,
        files: [
          {
            name: file,
            content: code,
          },
        ],
      },
      "*"
    );
    SetCodeChanged(true);
    console.log('code changed successfully');
    console.log(language);
    console.log(code);
  };
  const TriggerRun = () => {
    const iFrame = iFrameRef.current;
    if(!iFrame || !iFrame.contentWindow) return
    if (iFrame) {
      iFrame.contentWindow.postMessage(
        {
          eventType: "triggerRun",
        },
        "*"
      );
    }
  };
  useEffect(() => {
    TriggerRun();
    const Handle = (e:MessageEvent) => {
      if (e.data && e.data.language) {
        //console.log(e.data.result.output);
        setResult(e.data.result.output);
        console.log(result);
        SetCodeChanged(false);
        //SetCodeChanged(false);
      }
    };
    window.addEventListener("message", Handle);
    return () => {
      window.removeEventListener("message", Handle);
    };
  },[IsCodeChanged]);


  // useEffect(() => {
  //   console.log(result);
  // }, [result,number]);

  // const handleNumber = ()=>{
  //   setnum(no);
  //   return number;
  // }
  return (
    <div className="cmp">
    <iframe
      ref={iFrameRef}
      height="450px"
      src="https://onecompiler.com/embed/python?codeChangeEvent=true&listenToEvents=true&theme=dark"
      width="100%"
      className="iframe hidden"
    ></iframe>
    <Editor  ExecuteCode={ExecuteCode} Result={result} questionNo={questionNo}/>
    </div>
  );
};

export default Compiler;
