import { IP } from "../constants/constants";

export async function getVaults(access_token: string) {
       try {
            const response = await fetch(`http://${IP}:8000/vault/all`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
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