import { Vault } from "@/src/reducers/Home/useHome.d";
import { IP } from "../constants/constants";

export async function requestCreateVault(access_token: string, vault: Vault) {
       try {
            const content = JSON.stringify({vault_name: vault.name, vault_config: vault.settings})
            const response = await fetch(`http://${IP}:8000/vault/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
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