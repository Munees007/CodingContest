import React, { useEffect, useState } from "react"
import { Level } from "../types/QuestionType"
import { deleteQuestionFromLevel, getLevelsData } from "../Database/functions/addData";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css"
interface DisplayLevelProps{
    data:Level,
    index:number,
    onDelete: (questionIndex: number) => void;
}
const DisplayLevel:React.FC<DisplayLevelProps> = ({data,index,onDelete}) =>{
    return (
        <div className="w-full h-fit  p-3  bg-[#dabfff] border-2 border-black shadow-md shadow-white rounded-md">
            <div className="w-full flex justify-between items-center">
                <p className="text-4xl text-black font-mono font-bold uppercase">Level:{index}</p>
                <p className="text-xl text-black font-mono font-bold uppercase">Total Questions: {data.questions.length}</p>
            </div>
            {
                data?.questions?.map((value,index)=>(
                    <div key={index} className="flex flex-col relative gap-5 w-full h-fit p-3 mt-3  overflow-auto bg-[#9f89be] border-2 border-black shadow-md shadow-white rounded-md">
                        <p className="text-3xl text-center text-black font-mono font-bold uppercase">Question {index+1}</p>
                        <RiDeleteBin6Fill size={30} className="cursor-pointer absolute right-2" onClick={()=>onDelete(index)}/>
                        <div>
                    <p className="text-xl font-semibold font-mono">Title:</p>
                    <p className="text-3xl font-mono ml-2 mt-2 font-semibold">{value.title}</p>
                </div>
                <div>
                    <p className="text-xl font-semibold font-mono">Problem Statement:</p>
                    <p className="text-2xl font-mono ml-2 mt-2 font-semibold">{value.content.problem}</p>
                </div>
                <div>
                    <p className="text-xl font-semibold font-mono">Input:</p>
                    <p className="text-2xl font-mono ml-2 mt-2 font-semibold">{value.content.input}</p>
                </div>
                <div>
                    <p className="text-xl font-semibold font-mono">Output:</p>
                    <p className="text-2xl font-mono ml-2 mt-2 font-semibold">{value.content.input}</p>
                </div>
                <div className="flex flex-col gap-5 border-2 border-black rounded-md p-5 bg-[#2c2a4a] text-white">
                    <p className="text-xl font-semibold font-mono">Example1:</p>
                    <div className="bg-[#907ad6] p-5 border border-white shadow-md shadow-[#907ad6] rounded-md flex flex-col gap-5">
                        <div className="ml-5">
                            <p className="text-xl font-semibold font-mono">Input:</p>
                            <p className="text-2xl font-mono ml-2 mt-2 font-semibold">{value.content.example1.input}</p>
                        </div>
                        <div className="ml-5">
                            <p className="text-xl font-semibold font-mono">Output:</p>
                            <p className="text-2xl font-mono ml-2 mt-2 font-semibold">{value.content.example1.output}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 border-2 border-black rounded-md p-5 bg-[#2c2a4a] text-white">
                    <p className="text-xl font-semibold font-mono">Example2:</p>
                    <div className="bg-[#907ad6] p-5 border border-white shadow-md shadow-[#907ad6] rounded-md flex flex-col gap-5">
                        <div className="ml-5">
                            <p className="text-xl font-semibold font-mono">Input:</p>
                            <p className="text-2xl font-mono ml-2 mt-2 font-semibold">{value.content.example2.input}</p>
                        </div>
                        <div className="ml-5">
                            <p className="text-xl font-semibold font-mono">Output:</p>
                            <p className="text-2xl font-mono ml-2 mt-2 font-semibold">{value.content.example2.output}</p>
                        </div>
                    </div>
                </div>
                <div className="">
                        <p className="text-xl font-semibold font-mono">Answer:</p>
                        <p className="text-2xl font-mono ml-2 mt-2 font-semibold">{value.content.answer}</p>
                </div>
                    </div>
                ))
            }
        </div>
    )
}

const ManageQuestions = () =>{
    const [LevelData,setLevelData] = useState<Level[] | null>(()=>{
        const data:Level[] = JSON.parse(localStorage.getItem("levelData")!)
        return data ? data : null
    });
    useEffect(()=>{
        const FetchData = async () =>{
            const data:Level[] = await getLevelsData();
            console.log(data)
            if (data && data.length > 0) {
                setLevelData(data);
                localStorage.setItem("levelData", JSON.stringify(data));
              } else {
                console.log("No levels found.");
              }
        }
        FetchData();
    },[])
      // Delete handler
  const handleDelete = async (levelIndex: number, questionIndex: number) => {
    try {
      // Delete from Firebase
      console.log(levelIndex + " " + questionIndex)
      await deleteQuestionFromLevel(levelIndex, questionIndex);
        
      // Update local state
      if (LevelData) {
        const updatedLevels = [...LevelData];
        updatedLevels[levelIndex].questions = updatedLevels[levelIndex].questions.filter(
          (_, idx) => idx !== questionIndex
        );
        setLevelData(updatedLevels);
        toast.success("Question deleted successfully")
        // Optionally update local storage
        localStorage.setItem("levelData", JSON.stringify(updatedLevels));
      }
    } catch (error) {
      console.error("Error deleting question: ", error);
    }
  };
    return(
        <div className="w-full h-[43rem] overflow-auto flex flex-col gap-4">
            {LevelData === null ? (
        <p>No Data</p>
      ) : (
            <>
                {
                    LevelData.map((value,index)=>(
                        <DisplayLevel data={value} onDelete={(questionIndex)=>handleDelete(index,questionIndex)} index={index} key={index}/>
                    ))
                }
            </>
      )}
      <ToastContainer/>
        </div>
    )
}

export default ManageQuestions