import { useEffect, useState } from "react";
import { answeredType, codeData } from "../Components/Editor";
import { getData, getFlag, setFlag } from "../Database/functions/addData";
import { FormData } from "../Components/Form";
import { Link } from "react-router-dom";

export interface userDataType{
    key:string
    formData:FormData,
    codeData:codeData
}
const Admin = () =>{
    const [userData,setUserData] = useState<userDataType[]>();
    useEffect(()=>{
        const fetchData = async () =>{
            const temp = await getData();
            const data = Object.entries(temp).map(([_,value])=>({...value as userDataType}))
            setUserData(data);
            console.log(data);
        }
        fetchData();
    },[])
    const getScore = (obj:answeredType):number =>{
        let a:number = 0;
         Object.entries(obj).map(([_,val])=>{
           if(val)
           {
              a++;
           }
         })
         return a;
      }
      const [flag,setflag] = useState<boolean>();
      const handleFlag = async () =>{
        setflag(!flag);
        await setFlag(!flag);
      }
      useEffect(()=>{
        const fetchData = async () =>{
            const flagdata = await getFlag();

            setflag(flagdata);
        }
        fetchData();
      },[])
    return(
        <div className="p-6 bg-[#2c2a4a] h-screen overflow-hidden">
            <div className="w-full flex justify-end p-2">
                <span title="flag" className={`bg-purple-300 w-14 h-6 rounded-full  flex items-center ${flag ? "justify-end" : ""} `}>
                    <span onClick={handleFlag} className="bg-purple-500 border w-5 cursor-pointer h-5 rounded-full"></span>
                </span>
            </div>
        <table className="w-full overflow-auto text-white">
            <tr  className="w-full p-2 bg-[#4f518c] text-left border-2 border-[#dabfff] grid grid-cols-6 rounded-sm ">
                        <th>S.NO</th>
                        <th>Roll NO</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Score</th>
                        <th>Time Left</th>
            </tr>
            {
                userData && userData.map((value,index)=>(
                    <Link to={`/profile/${value.formData.name}`} state={value}>
                    <tr key={index} className="w-full p-2 bg-[#907ad6] border border-[#dabfff] grid grid-cols-6 rounded-sm justify-between">
                        <td>{index+1}.</td>
                        <td>{value.formData.rollNumber}</td>
                        <td>{value.formData.name}</td>
                        <td>{value.formData.email}</td>
                        {
                            value.codeData ? <>
                                <td>{getScore(value.codeData.fullData)}</td>
                                <td>{value.codeData.timeLeft}</td>
                                </> : <>
                                <td>-</td>
                                <td>0m 0s</td>
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

export default Admin;