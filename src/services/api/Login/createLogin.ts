import { apiFetch } from "@/src/utils/helper/apiFetch";
import { IP } from "../constants/constants";

export async function loginStart({vaultId, ciphertext, nonce, cipher, version} : {vaultId: string, ciphertext: string, nonce: string, cipher: string, version: number}) {
       try {
            const content = JSON.stringify({ciphertext: ciphertext, nonce: nonce, cipher: cipher, version: version})
            const response = await apiFetch(`http://${IP}:8000/login/${vaultId}/create`, {
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