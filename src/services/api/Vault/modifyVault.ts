import { Vault } from "@/src/reducers/Home/useHome.d";
import { IP } from "../constants/constants";
import { apiFetch } from "@/src/utils/helper/apiFetch";

export async function requestModifyVault(vault: Vault) {
       try {
            const content = JSON.stringify({new_data: vault})
            const response = await apiFetch(`http://${IP}:8000/vault/${vault.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: content
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