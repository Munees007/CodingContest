import { get, ref, set, update } from "firebase/database";
import { FormData } from "../../Components/Form";
import { db } from "../firebase";
import { codeData } from "../../Components/Editor";

export async function addData(formData:FormData){
    try {
        const roll = formData.rollNumber;

        const userRef = ref(db,`users/${roll}`);

        const userSnapShot = await get(userRef);

        if(userSnapShot.exists())
        {
            throw new Error("Already There")
        }
        else{
            await set(userRef,{formData});

            console.log("form submitted successfully");
        }

        
    } catch (error) {
        console.log(error);
    }
}
export async function addCodeData(codeData:codeData){
    try {
        const userData = localStorage.getItem("userData");
        const data = JSON.parse(userData!);
        const roll = data.rollNumber;

        const userRef = ref(db,`users/${roll}`);

        await update(userRef,{codeData});

        console.log("data submitted successfully");
    } catch (error) {
        console.log(error);
    }
}

export async function getData(){
    try {
        const userRef = ref(db,'users');

        const userSnapShot = await get(userRef);

        if(userSnapShot.exists())
        {
            return userSnapShot.val();
        }
        else{
            console.log("No data found");
        }
    } catch (error) {
        console.log(error);
    }
}

export async function setFlag(val:boolean){
    try {
        const userRef = ref(db,'flag');
        await set(userRef,val);
    } catch (error) {
        console.log(error)
    }
}

export async function getFlag():Promise<boolean>{
    try {
        const userRef = ref(db,'flag');

        const userSnapShot = await get(userRef);

        if(userSnapShot.exists())
        {
            return userSnapShot.val()
        }
        else{
            throw new Error('no flag found');
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}