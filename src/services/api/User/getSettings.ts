import { IP } from "../constants/constants";

export async function getSetttings(access_token: string) {
       try {
            const response = await fetch(`http://${IP}:8000/settings/get`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
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