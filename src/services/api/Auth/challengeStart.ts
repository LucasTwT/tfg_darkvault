import { apiFetch } from "@/src/utils/helper/apiFetch";
import { IP } from "../constants/constants";

export async function challengeStart() {
       try {
            const response = await apiFetch(`http://${IP}:8000/auth/challenge/start`, {
                method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                }
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