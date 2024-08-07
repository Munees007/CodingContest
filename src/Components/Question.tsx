import { VscCode } from "react-icons/vsc";

interface QuestionProps{
    questionNo:number,
    question:string,
    setQuestion:(value:number) =>void
}
export default function Question({questionNo,question,setQuestion}:QuestionProps) {
    const handleQuestion = ()=>{
        setQuestion(questionNo);
    }
    return (
    <div className="bg-white/40 m-2  rounded-md p-2 border-2 border-gray-600 font-mono flex flex-col">
        <p>{questionNo}.{question}</p>
        <div className="w-full flex justify-end mr-3 mt-2" title="start code">
            <VscCode size={30} className="cursor-pointer" onClick={handleQuestion}/>
        </div>
    </div>
  )
}
