import { IP } from "../constants/constants";
import { useGlobalStore } from "@/src/store/globalStore";
import sodium, { to_base64 } from "react-native-libsodium";
import { KDF_PARAMS } from "../../crypto/constants/argon2idParams";

export async function registerUser(username: string, email: string, authSalt: string) {
    const { cryptoContext, settings } = useGlobalStore.getState()   
    if (!cryptoContext) return {response: "Error de sincronización intente de nuevo", status: false}
    try {
        console.log(to_base64(cryptoContext.signingKeys.publicKey, sodium.base64_variants.ORIGINAL))
            const content = JSON.stringify({
                username: username, 
                email: email, 
                public_key: to_base64(cryptoContext.signingKeys.publicKey, sodium.base64_variants.ORIGINAL),
                auth_salt: authSalt, 
                kdf_params: KDF_PARAMS, 
                default_settings: settings
            })

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