import { IP } from "../constants/constants";

export async function requestSalt(identifier: string) {
       try {
            const content = JSON.stringify({identifier})
            console.log(content)
            const response = await fetch(`http://${IP}:8000/auth/request_salt`, {
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
         return {response: error, status: false}
       } 
}