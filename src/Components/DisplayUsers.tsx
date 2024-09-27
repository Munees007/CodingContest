// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Link } from "react-router-dom";
import { userDataType } from "../Pages/Admin";
import React, { useEffect, useState } from "react";
import { Level } from "../types/QuestionType";

interface DisplayUsersProps {
    userData: userDataType[],
    levelData: Level[],
    display: boolean,
    handleFlag: () => Promise<void>,
    flag: boolean
}

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
};

export const getScore = (data: userDataType): number => {
    let score = 0;
    for (let i = 0; i < data?.codeData?.finalAnswer?.length; i++) {
        score += data?.codeData?.finalAnswer[i]?.score!;
    }
    return score;
};

const getCodeLength = (code: string): number => {
    return code ? code.split('\n').length : 0;
};

const getTotalLine = (value: userDataType): number => {
    let lines = 0;
    value?.codeData?.finalAnswer?.forEach((val) => {
        val.answer.forEach((answer) => {
            lines += getCodeLength(answer.code);
        });
    });
    return lines;
};

const questionCount = (value: Level[]): number => {
    if (!value) return 14;
    return value.reduce((acc, level) => acc + level.questions.length, 5);
};

const gridTemplateColumns = (count:number,display:boolean):React.CSSProperties => ({
    gridTemplateColumns: `repeat(${display ?count : 4}, minmax(0, 1fr))`,
});




const DisplayUsers: React.FC<DisplayUsersProps> = ({ userData, levelData, display, handleFlag, flag }) => {
    const [sortMethod, setSortMethod] = useState<string>("Score");
    const [sortedData, setSortedData] = useState<userDataType[]>(userData);

    const sortByScore = () => {
        return [...userData].sort((a, b) => getScore(b) - getScore(a)); // Highest score first
    };

    const sortByTotalLines = () => {
        return [...userData].sort((a, b) => getTotalLine(a) - getTotalLine(b)); // Smallest first
    };

    const sortByTimeTaken = () => {
        return [...userData].sort((a, b) => {
            const timeA = (60 * 150) - a.codeData?.timeLeft!;
            const timeB = (60 * 150) - b.codeData?.timeLeft!;
            return timeA - timeB; // Smallest first
        });
    };
                            

    useEffect(() => {
        if (display) {
            let sortedData;
            if (sortMethod === "Score") {
                sortedData = sortByScore();
            } else if (sortMethod === "TotalLine") {
                sortedData = sortByTotalLines();
            } else if (sortMethod === "TimeTaken") {
                sortedData = sortByTimeTaken();
            }
            setSortedData(sortedData!);
        }
    }, [userData, sortMethod, display]);


    return (
        <div className="w-full overflow-auto">
            {/* <PDFDownloadLink
        document={<PdfDocument sortedData={sortedData} levelData={levelData} />}
        fileName="data.pdf"
        style={{ textDecoration: 'none', padding: '10px', backgroundColor: 'blue', color: 'white', borderRadius: '5px' }}
      >
        Downloding PDF
      </PDFDownloadLink> */}
            <p className="text-center font-Roboto text-2xl font-exdivabold">{display ? "Hackathon Score" : "Registered Student Lists"}</p>
            {!display && (
                <div className="w-full gap-2 flex justify-end p-2">
                    <p className="font-Roboto font-bold">START:</p>
                    <span title="flag" className={`bg-[#2f81edaf] w-14 h-6 rounded-full flex items-center ${flag ? "justify-end" : ""}`}>
                        <span onClick={handleFlag} className="bg-gray-600 border w-5 cursor-pointer h-5 rounded-full"></span>
                    </span>
                </div>
            )}
            {display && (
                <div className="w-full flex justify-end">
                    <p className="mr-2">Sorting Method:</p>
                    <select className="border-2 rounded-md" value={sortMethod} onChange={(e) => setSortMethod(e.target.value)}>
                        <option value="TotalLine">Total Line</option>
                        <option value="Score">Score</option>
                        <option value="TimeTaken">Time Taken</option>
                    </select>
                </div>
            )}
            <div className="w-full  p-5">
                <div style={gridTemplateColumns(questionCount(levelData),display)} className={`w-full overflow-auto font-bold p-2 bg-[#2f81edaf] border-2 border-black grid  rounded-sm`}>
                    <p className="">S.NO</p>
                    <p className="">Roll NO</p>
                    {
                        !display && <p>Name</p>
                    }
                    {
                        !display && <p>Email</p>
                    }
                    {display && (
                        <>
                            {levelData.map((value, index) => (
                                value?.questions?.map((_, inex) => (
                                    <p key={`L${index}Q${inex + 1}`}>L{index}Q{inex + 1}</p>
                                ))
                            ))}
                            <p className="">Total</p>
                            <p className="">Score</p>
                            <p className="">Time Taken</p>
                        </>
                    )}
                </div>
                {sortedData && sortedData.map((value, index) => (
                    <div key={index} style={gridTemplateColumns(questionCount(levelData),display)} className={`w-full overflow-auto   gap-5 p-2 bg-gray-300 hover:bg-gray-400 border border-black grid  rounded-sm`}>
                        <p className="">{index + 1}.</p>
                        <p className="">
                            <Link to={`/profile/${value.formData.name}`} key={index} state={{ value, levelData }} className={`${display ? "" : "pointer-events-none"}`}>
                                {value.formData.rollNumber}
                            </Link>
                        </p>
                        {
                        !display && <p>{value.formData.name}</p>
                    }
                    {
                        !display && <p>{value.formData.email}</p>
                    }
                        {display && (
                            <>
                                {value.codeData ? (
                                    <>
                                        {levelData.map((q, index) => (
                                            q?.questions?.map((_, inedx) => (
                                                <p key={`codeLength_${index}_${inedx}`}>{getCodeLength(value?.codeData?.finalAnswer[index]?.answer[inedx]?.code || "")}</p>
                                            ))
                                        ))}
                                        <p className="">{getTotalLine(value)}</p>
                                        <p className="">{getScore(value)}</p>
                                        <p className="w-20">{formatTime(((60 * 150) - value?.codeData?.timeLeft!))}</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="">-</p>
                                        <p className="">0m 0s</p>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
// const styles = StyleSheet.create({
//     page: { padding: 20 },
//     section: { marginBottom: 10 },
//     table: { display: 'flex', width: 'auto', margin: 10 },
//     row: { flexDirection: 'row', borderBottom: '1px solid #000', padding: 5 },
//     cell: { flex: 1, padding: 5, textAlign: 'center' },
//     header: { fontWeight: 'bold' },
//   });
//   interface PdFProps{
//     sortedData:userDataType[],
//     levelData:Level[]
//   }
//   const PdfDocument:React.FC<PdFProps> = ({ sortedData, levelData }) => {
//     return (
//       <Document>
//         <Page size={[841.89, 595.28]} style={styles.page}>
//           <View style={styles.section}>
//             {levelData.map((value, index) => (
//               <View key={index} style={styles.row}>
//                 {value.questions.map((_, qIndex) => (
//                   <Text key={`L${index}Q${qIndex + 1}`} style={styles.cell}>
//                     L{index}Q{qIndex + 1}
//                   </Text>
//                 ))}
//               </View>
//             ))}
//           </View>
//           <View style={styles.table}>
//             {sortedData.map((value, index) => (
//               <View key={index} style={styles.row}>
//                 <Text style={styles.cell}>{index + 1}</Text>
//                 <Text style={styles.cell}>{value.formData.rollNumber}</Text>
//                 {levelData.map((q, qIndex) => (
//                   q.questions.map((_, questionIndex) => (
//                     <Text key={`codeLength_${qIndex}_${questionIndex}`} style={styles.cell}>
//                       {getCodeLength(value?.codeData?.finalAnswer[qIndex]?.answer[questionIndex]?.code || "")}
//                     </Text>
//                   ))
//                 ))}
//                 <Text style={styles.cell}>{getTotalLine(value)}</Text>
//                 <Text style={styles.cell}>{getScore(value)}</Text>
//                 <Text style={styles.cell}>{formatTime((60 * 150) - value?.codeData?.timeLeft!)}</Text>
//               </View>
//             ))}
//           </View>
//         </Page>
//       </Document>
//     );
//   };

export default DisplayUsers;
