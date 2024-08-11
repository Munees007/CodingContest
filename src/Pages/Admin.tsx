import { useEffect, useState } from "react";
import { answeredType, codeData } from "../Components/Editor";
import { getData } from "../Database/functions/addData";
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
    return(
        <div className="w-full bg-blue-300 h-screen p-3 overflow-auto">
            <div  className="bg-blue-600 border-2 border-black rounded-md
                    shadow-md shadow-black w-full text-white flex justify-around mt-2 py-2">
                        <p>S.NO</p>
                        <p>Roll NO</p>
                        <p>Name</p>
                        <p>Email</p>
                        <p>Score</p>
                        <p>Time Left</p>
            </div>
            {
                userData && userData.map((value,index)=>(
                    <Link to={`/profile/${value.formData.name}`} state={value}>
                    <div key={index} className="bg-blue-600 border-2 border-black rounded-md
                    shadow-md cursor-pointer shadow-black w-full text-white flex justify-around mt-2 py-2">
                        <p>{index+1}.</p>
                        <p>{value.formData.rollNumber}</p>
                        <p>{value.formData.name}</p>
                        <p>{value.formData.email}</p>
                        <p>{getScore(value.codeData.fullData)}</p>
                        <p>{value.codeData.timeLeft}</p>
                    </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default Admin;