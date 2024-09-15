import { useEffect, useRef, useState } from "react";
import { answeredType, codeData } from "../Components/Editor";
import { getData, getFlag, setFlag } from "../Database/functions/addData";
import { FormData } from "../Components/Form";
import { toast, ToastContainer } from "react-toastify";
import DisplayUsers from "../Components/DisplayUsers";
import { Level, questionType } from "../types/QuestionType";
import CreateQuestions from "../Components/CreateQuestions";
import ManageQuestions from "../Components/ManageQuestions";

export interface userDataType{
    key:string
    formData:FormData,
    codeData:codeData
}
const Admin = () =>{
    const [userData,setUserData] = useState<userDataType[]>();
    const userName = useRef<HTMLInputElement | null>(null);
    const passWord = useRef<HTMLInputElement | null>(null);
    const [verified,setverified] = useState<boolean>(()=>{
        return  Boolean(sessionStorage.getItem("adminVerified")) || false
    })
    const [showPanels,setShowPanels] = useState<boolean[]>([false,false,false,false]);
    const [temp,setTemp] = useState<Level | null>(null);
    const DefaultValue:Level = {
        questions:[],
        answeredData:[]
    }
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
      const handleVerified = () =>{
        const user = userName.current?.value;
        const pass = passWord.current?.value;
        if(user==="MW"&&pass==="12345678")
        {
            setverified(!verified);
            sessionStorage.setItem("adminVerified","true");
        }
        else
        {
            toast.error("Invalid Credentials")
        }
        
      }
      const handleShowPanels = (i:number) =>{
        setShowPanels((e)=>{
            const temp = [...e]
            temp[i] = true
            for(let j=0;j<temp.length;j++)
            {
                if(j!=i)
                {
                    temp[j] = false;
                }
            }
            return temp
        })
      }
    return(
        <div className="flex flex-col gap-2 bg-[#2c2a4a]">
            <div className="w-full h-fit text-[#2c2a4a] font-mono font-extrabold bg-[#7fdeff] text-2xl p-2 uppercase"><p>Admin Panel</p></div>
            {
                !verified ? <div className="font-mono  h-screen text-black flex justify-center items-center">
                    <div className="bg-purple-500 gap-3 flex flex-col w-60  p-3 border border-white rounded-md shadow-md shadow-black">
                        <div className="">
                            <p className="text-xl font-semibold">userName:</p>
                            <input type="text" ref={userName} className="w-full pl-2 border-2 border-black rounded-md"/>
                        </div>
                        <div className="">
                            <p className="text-xl font-semibold">passWord:</p>
                            <input type="password" ref={passWord} className="w-full pl-2 border-2 border-black rounded-md"/>
                        </div>
                        <button type="button" 
                        className="text-xl border-2 border-black rounded-md cursor-pointer hover:bg-white  font-semibold bg-purple-400" onClick={handleVerified}>LogiN</button>
                    </div>
                </div>: 
        <div className=" bg-[#2c2a4a] h-screen flex overflow-hidden">
            {/* SideBar Section */}
            <div className="h-screen w-60 p-3 bg-[#907ad6]  shadow-md shadow-white border-2 border-black rounded-md">
                <button type="button" 
                className="uppercase bg-[#2c2a4a] w-52 h-16 my-2 
                border-2 border-white rounded-md text-white 
                font-mono font-semibold shadow-md shadow-black
                cursor-pointer hover:bg-[#dabfff] hover:text-black"
                onClick={()=>{handleShowPanels(0)}}>View Regiestered Student</button>
                <button type="button" 
                className="uppercase bg-[#2c2a4a] w-52 h-16 my-2 
                border-2 border-white rounded-md text-white 
                font-mono font-semibold shadow-md shadow-black
                cursor-pointer hover:bg-[#dabfff] hover:text-black"
                onClick={()=>{handleShowPanels(1)}}>View DashBoard</button>
                <button type="button" 
                className="uppercase bg-[#2c2a4a] w-52 h-16 my-2 
                border-2 border-white rounded-md text-white 
                font-mono font-semibold shadow-md shadow-black
                cursor-pointer hover:bg-[#dabfff] hover:text-black"
                onClick={()=>{handleShowPanels(2)}}>Create Questions</button>
                <button type="button" 
                className="uppercase bg-[#2c2a4a] w-52 h-16 my-2 
                border-2 border-white rounded-md text-white 
                font-mono font-semibold shadow-md shadow-black
                cursor-pointer hover:bg-[#dabfff] hover:text-black"
                onClick={()=>{handleShowPanels(3)}}>Manage Questions</button>
            </div>
            {/* DisplaySection */}
            <div className="p-3 w-full">
                {/* Registered Students Section */}
                {
                    showPanels[0] && 
                    <div className="w-full">
                        <DisplayUsers flag={flag!} getScore={getScore} userData={userData!} display={false} handleFlag={handleFlag}/>
                    </div>
                }
                {
                    showPanels[1] &&
                    <div className="w-full">
                        <DisplayUsers flag={flag!} getScore={getScore} userData={userData!} display={true} handleFlag={handleFlag}/>
                    </div>
                }
                {
                    showPanels[2] &&
                    <div>
                        <CreateQuestions/>
                    </div>
                }
                {
                    showPanels[3] &&
                    <div>
                        <ManageQuestions/>
                    </div>
                }
            </div>
        </div>
        }
        <ToastContainer position="top-center"/>
        </div>
    )
}

export default Admin;