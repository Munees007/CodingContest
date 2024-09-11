import { VscCode } from "react-icons/vsc";
import '../Modules/themes';
interface QuestionProps{
    questionNo:number,
    question:string,
    theme:string,
    setQuestion:(value:number) =>void
}
export default function Question({questionNo,question,setQuestion,theme}:QuestionProps) {
    const handleQuestion = ()=>{
        setQuestion(questionNo);
    }
    return (
    <div className={`ace-${theme ? theme : "dracula"} m-2  rounded-md p-2 border-2  font-mono flex flex-col`}>
        <p>{questionNo}.{question}</p>
        <div className="w-full flex justify-end mr-3 mt-2" title="start code">
            <VscCode size={30} className="cursor-pointer" onClick={handleQuestion}/>
        </div>
    </div>
  )
}
