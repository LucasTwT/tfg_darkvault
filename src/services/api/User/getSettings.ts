import { apiFetch } from "@/src/utils/helper/apiFetch";
import { IP } from "../constants/constants";

export async function getSetttings() {
       try {
            const response = await apiFetch(`http://${IP}:8000/settings/get`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok){
                const errorData = await response.json()
                return {response: errorData, status: false}
            }
            return {response: await response.json(), status: true}
       }catch (error){
         return {response: error, status: false}
       } 
}