const ThankYou = ()=>{
    const getTheme = () =>{
        return localStorage.getItem("theme") || "dracula";
    }
    return(
        <div>
            <p>Thank You</p>
        </div>
    )
}

export default ThankYou;