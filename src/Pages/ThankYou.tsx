import "../Modules/themes"
const ThankYou = ()=>{
    const getTheme = () =>{
        return localStorage.getItem("theme") || "dracula";
    }
    return(
        <div className={`flex-col w-full h-screen ace-${getTheme} flex justify-center items-center`}>
            <p className="text-[8rem] uppercase font-serif">Thank You</p>
        <div className="ace-dracula w-full h-screen">
            <p>Thank You</p>
        </div>
        </div>
    )
}

export default ThankYou;