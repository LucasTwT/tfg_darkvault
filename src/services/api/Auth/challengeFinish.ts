import { apiFetch } from "@/src/utils/helper/apiFetch";
import { IP } from "../constants/constants";

export async function challengeFinish({signedChallenge} : {signedChallenge: string}) {
    const content = JSON.stringify({signature: signedChallenge})   
    try {
            const response = await apiFetch(`http://${IP}:8000/auth/challenge/finish`, {
                method: "POST",
                 headers: {
                    "Content-Type": "application/json",
                },
                body: content
            });
            if (!response.ok){
                const errorData = await response.json()
                return {response: errorData, status: false}
            }
            return {response: await response.json(), status: true}
       }catch (error){
        console.log(error)
         return {response: error, status: false}
       } 
}