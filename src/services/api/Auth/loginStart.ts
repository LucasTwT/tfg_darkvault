import { IP } from "../constants/constants";

export async function loginStart(identifier: string) {
       try {
            const content = JSON.stringify({identifier})
            const response = await fetch(`http://${IP}:8000/auth/login/start`, {
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