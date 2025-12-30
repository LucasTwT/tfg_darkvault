import { apiFetch } from "@/src/utils/helper/apiFetch";
import { IP } from "../constants/constants";
import { getVaults } from "./getVaults";
import { useAppStore } from "@/src/store/useAppStore";

export async function startDeleteVault() {
       try {
            const response = await apiFetch(`http://${IP}:8000/vault/start`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
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

export async function finishDeleteVault(signature: string, vaultId: string) {
    const { initUserVaults } = useAppStore.getState()
           try {
            const content = JSON.stringify({signature: signature})
            const response = await apiFetch(`http://${IP}:8000/vault/${vaultId}/finish`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: content
            });
            if (!response.ok){
                const errorData = await response.json()
                return {response: errorData, status: false}
            }
            getVaults().then(({status, response}) => {
                        if (status === 200) {
                            initUserVaults(response.vaults)
                        }
                    })
            return {response: await response.json(), status: true}
       }catch (error){
         return {response: error, status: false}
       } 
}