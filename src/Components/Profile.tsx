import { useLocation } from "react-router-dom";
import { userDataType } from "../Pages/Admin";
import AceEditor from "react-ace";
import "../Modules/language";
import "../Modules/themes";
import { getScore } from "./DisplayUsers";
import { formatTime } from "./Editor";
import { useEffect } from "react";

export default function Profile() {
  const location = useLocation();
  const state: userDataType = location.state || {};

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="bg-blue-300 w-full h-screen p-3 overflow-auto">
      <div
        className="bg-blue-600 border-2 border-black rounded-md
                    shadow-md shadow-black w-full text-white flex justify-around py-2"
      >
        <p>{state.formData?.rollNumber}</p>
        <p>{state.formData?.name}</p>
        <p>{state.formData?.email}</p>
        {state.codeData ? (
          <>
            <p>{getScore(state)}</p>
            <p>{formatTime(60 * 60 - state.codeData.timeLeft!)}</p>
          </>
        ) : (
          <>
            <p>-</p>
            <p>0m 0s</p>
          </>
        )}
      </div>
      <div className="whitespace-pre grid mt-5 grid-cols-1 gap-3">
        {state.codeData ? (
          state.codeData.finalAnswer.map((level, levelIndex) => (
            <div key={levelIndex} className="bg-blue-600 border-2 w-full h-full border-black rounded-md p-3 text-white font-mono">
              <p>Level:{levelIndex}</p>
              {level.answer.map((answer, answerIndex) => (
                <div key={answerIndex}>
                  <p className="font-bold text-2xl">Language: {answer.language}</p>
                  <div className="flex flex-col">
                    <p className="font-bold text-xl">Code:</p>
                    <AceEditor
                      width="100%"
                      mode={`${answer.language === "cpp" ? "c_cpp" : answer.language}`}
                      fontSize={18}
                      setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                      }}
                      readOnly
                      className="rounded-md border-2 border-gray-200 shadow-md shadow-black"
                      theme="ace-dawn"
                      value={answer.code}
                    />
                  </div>
                  <div className="flex flex-col mt-2">
                    <p className="font-bold text-xl">Output:</p>
                    <p className="mt-2 font-semibold">{answer.output}</p>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="w-full">
            <p className="text-center">No Data Found</p>
          </div>
        )}
      </div>
    </div>
  );
}
