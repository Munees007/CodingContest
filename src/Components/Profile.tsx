import { useLocation } from 'react-router-dom'
import { userDataType } from '../Pages/Admin';
import { answeredType } from './Editor';
import AceEditor from "react-ace";
import "../Modules/language";
import "../Modules/themes";

interface CodeData {
    code: string;
    language: string;
    output: string;
  }
export default function Profile() {
    const location = useLocation();

    const state:userDataType = location.state || {}
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
  return (
    <div className='bg-blue-300 w-full h-screen p-3 overflow-auto'>
        <div  className="bg-blue-600 border-2 border-black rounded-md
                    shadow-md shadow-black w-full text-white flex justify-around py-2">
            <p>{state.formData.rollNumber}</p>
            <p>{state.formData.name}</p>
            <p>{state.formData.email}</p>
            {
              state.codeData ? <><p>{getScore(state.codeData.fullData)}</p>
            <p>{state.codeData.timeLeft}</p></>:<><p>-</p>
            <p>0m 0s</p></>
            }
            
        </div>
        <div className='whitespace-pre grid mt-5 grid-cols-1 gap-3'>
            {/* {
            <div className='bg-blue-600 border-2 border-black rounded-md p-3 text-white font-mono'>
                <p>Language:{state.codeData.question1.language}</p>
                <div className='flex flex-col'>
                    <p>Code:</p>
                    <p className='mt-2'>{state.codeData.question1.code}</p>
                </div>
                <div className='flex flex-col mt-2'>
                    <p>Output:</p>
                    <p className='mt-2'>{state.codeData.question1.output}</p>
                </div>
            </div>
            } */}
            {
              state.codeData ?
          Object.entries(state.codeData).map(([key, value]) => {
            // Use type guard to check if value is CodeData
            if (isCodeData(value)) {
              return (
                    <div key={key} className='bg-blue-600 border-2 border-black rounded-md p-3 text-white font-mono'>
                        <p className="font-bold text-2xl">Language:{value.language}</p>
                        <div className='flex flex-col'>
                            <p className="font-bold text-xl">Code:</p>
                            {/* <p className='mt-2'>{value.code}</p> */}
                            <AceEditor
                            width="100%"
                            mode={`${value.language === "cpp" ? "c_cpp" : value.language}`}
                            fontSize={18}
                            setOptions={{
                              enableBasicAutocompletion: true,
                              enableLiveAutocompletion: true,
                              enableSnippets: true,
                            }}
                            readOnly
                            className='rounded-md border-2 border-gray-200 shadow-md shadow-black'
                            theme="ace-dawn"
                            value={value.code}
                            />
                        </div>
                        <div className='flex flex-col mt-2'>
                            <p className="font-bold text-xl">Output:</p>
                            <p className='mt-2 font-semibold'>{value.output}</p>
                        </div>
                    </div>
                    
              );
            }
            return null; // Handle cases where value does not match CodeData
          }): <div className='w-full absolute'>
          <p className='text-center'>No Data Found</p></div>
        }
            
            
        </div>
    </div>
  )
}
function isCodeData(value: any): value is CodeData {
    return typeof value === 'object' &&
           value !== null &&
           'code' in value &&
           'language' in value &&
           'output' in value;
  }