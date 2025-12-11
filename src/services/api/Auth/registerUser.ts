import { UserSettings } from "@/src/store/globalStoreTypes.d";
import { IP } from "../constants/constants";

export async function registerUser(username: string, email: string, auth_key: string, auth_salt: string, default_settings: UserSettings) {
       try {
            const content = JSON.stringify({username, email, auth_key, auth_salt, default_settings})
            const response = await fetch(`http://${IP}:8000/auth/register/user`, {
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