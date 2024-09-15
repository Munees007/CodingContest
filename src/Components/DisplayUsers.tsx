import { Link } from "react-router-dom"
import { userDataType } from "../Pages/Admin";
import React from "react";
import { answeredType } from "./Editor";

interface DisplayUsersProps{
    userData:userDataType[],
    getScore: (obj: answeredType) => number,
    display:boolean,
    handleFlag: () => Promise<void>,
    flag:boolean
}

const DisplayUsers:React.FC<DisplayUsersProps> = ({userData,getScore,display,handleFlag,flag}) =>{
    return(
        <div className="w-full">
            {
                !display &&
                <div className="w-full flex justify-end p-2">
                        <span title="flag" className={`bg-purple-300 w-14 h-6 rounded-full  flex items-center ${flag ? "justify-end" : ""} `}>
                            <span onClick={handleFlag} className="bg-purple-500 border w-5 cursor-pointer h-5 rounded-full"></span>
                        </span>
                </div>
            }
        <table className="w-full overflow-auto text-white">
            <tr  className={`w-full p-2 bg-[#4f518c] text-left border-2 border-[#dabfff] grid grid-cols-6 rounded-sm `}>
                        <th>S.NO</th>
                        <th>Roll NO</th>
                        <th>Name</th>
                        {
                            display && <>
                                <th>Email</th>
                                <th>Score</th>
                                <th>Time Left</th>
                            </>
                        }
            </tr>
            {
                userData && userData.map((value,index)=>(
                    <Link to={`/profile/${value.formData.name}`}  state={value} className={`${display ? "" :"pointer-events-none"}`} >
                    <tr key={index} className="w-full p-2 bg-[#907ad6] border border-[#dabfff] grid grid-cols-6 rounded-sm justify-between">
                        <td>{index+1}.</td>
                        <td>{value.formData.rollNumber}</td>
                        <td>{value.formData.name}</td>
                        {
                            display &&<><td>{value.formData.email}</td>
                        {
                            value.codeData ? <>
                                <td>{getScore(value.codeData.fullData)}</td>
                                <td>{value.codeData.timeLeft}</td>
                                </> : <>
                                <td>-</td>
                                <td>0m 0s</td>
                                </>
                        }
                        </>
                        }
                    </tr>
                    </Link>
                ))
            }
        </table>
        </div>
    )
}

export default DisplayUsers;