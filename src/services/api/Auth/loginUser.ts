import { IP } from "../constants/constants";

export async function loginUser(identifier: string, auth_key: string) {
       try {
            const content = JSON.stringify({identifier, auth_key})
            const response = await fetch(`http://${IP}:8000/auth/login/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: content
            });
            console.log(await response.json())
            if (!response.ok){
                const errorData = await response.json()
                
                return {response: errorData, status: false}
            }
            return {response: await response.json(), status: true}
       }catch (error){
         return {response: error, status: false}
       } 
}