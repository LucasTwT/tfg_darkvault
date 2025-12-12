import { apiFetch } from "@/src/utils/helper/apiFetch";
import { IP } from "../constants/constants";

export async function getVaults() {
       try {
            const response = await apiFetch(`http://${IP}:8000/vault/all`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok){
                const errorData = await response.json()
                return {response: errorData, status: response.status}
            }
            return {response: await response.json(), status: response.status}
       }catch (error){
         return {response: error, status: false}
       } 
}