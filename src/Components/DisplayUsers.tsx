import { Link } from "react-router-dom"
import { userDataType } from "../Pages/Admin";
import React, { useEffect } from "react";
import { formatTime } from "./Editor";
import { Level } from "../types/QuestionType";

interface DisplayUsersProps{
    userData:userDataType[],
    levelData:Level[]
    display:boolean,
    handleFlag: () => Promise<void>,
    flag:boolean
}
export const getScore = (data:userDataType):number =>{
    let score = 0
    for(let i=0;i<data.codeData.finalAnswer.length;i++)
    {
        score = score + data?.codeData?.finalAnswer[i]?.score!
    }
    return score
}
const DisplayUsers:React.FC<DisplayUsersProps> = ({userData,levelData,display,handleFlag,flag}) =>{

    useEffect(()=>{
        if(!display){   
        const handleSort = ()=>{
            userData.sort((a,b)=> getScore(b) - getScore(a))
        }
        handleSort();
        }
    },[userData])
    
    return(
        <div className="w-full">
            <p className="text-center font-Roboto text-2xl font-extrabold">{display ? "Hackathon Score" : "Registered Student Lists"}</p>
            {
                !display &&
                <div className="w-full gap-2 flex justify-end p-2">
                        <p className="font-Roboto font-bold">START:</p>
                        <span title="flag" className={`bg-[#2f81edaf] w-14 h-6 rounded-full  flex items-center ${flag ? "justify-end" : ""} `}>
                            <span onClick={handleFlag} className="bg-gray-600 border w-5 cursor-pointer h-5 rounded-full"></span>
                        </span>
                </div>
            }
        <table className="w-full overflow-auto text-black mt-5">
            <thead>
            <tr  className={`w-full p-2 bg-[#2f81edaf] text-left border-2 border-black grid grid-cols-6 rounded-sm`}>
                        <th>S.NO</th>
                        <th>Roll NO</th>
                        <th>Name</th>
                        {
                            display && <>
                                <th>Email</th>
                                <th>Score</th>
                                <th>Time Taken</th>
                            </>
                        }
            </tr>
            </thead>
            <tbody>
            {
                userData && userData.map((value,index)=>(
                    <tr>
                    <Link to={`/profile/${value.formData.name}`} key={index} state={{value,levelData}} className={`${display ? "" :"pointer-events-none"}`} >
                    <tr key={index} className="w-full p-2 bg-gray-300 hover:bg-gray-400  border border-black grid grid-cols-6 rounded-sm  justify-center">
                        <td>{index+1}.</td>
                        <td>{value.formData.rollNumber}</td>
                        <td>{value.formData.name}</td>
                        {
                            display &&<><td>{value.formData.email}</td>
                        {
                            value.codeData ? <>
                                <td className="ml-6">{getScore(value)}</td>
                                <td>{formatTime(((60*60)-value.codeData.timeLeft!))}</td>
                                </> : <>
                                <td>-</td>
                                <td>0m 0s</td>
                                </>
                        }
                        </>
                        }
                    </tr>
                    </Link>
                    </tr>
                ))
            }
            </tbody>
        </table>
        </div>
    )
}

export default DisplayUsers;