import argon2 from "react-native-argon2";
import * as Crypto from 'expo-crypto';
import { fromByteArray } from 'base64-js'
import * as Keychain from 'react-native-keychain'
import { requestSalt } from "../../api/Auth/getSalt";

export const hashMasterPassword = async (password: string, salt: string ) => {
    const result = await argon2(password, salt, {
        hashLength: 32,
        iterations: 3,
        memory: 4096,
        parallelism: 1,
        mode: "argon2id",
    });
    return { hash: result, salt: salt }; // incluye salt + params
};

export async function getSalt(identificador: string, ctx: "register" | "login" ) {
    if (ctx === "login") {
        const credentials = await Keychain.getGenericPassword({ service: `com.darkvault.securedata`});
        if (credentials) {
            const parsed = JSON.parse(credentials.password);
            return parsed.salt;   
        }
        const {response, status } =  await requestSalt(identificador)// Request al server para obtener el salt del user en base a el identificador
        if (status)
            return response["salt"]
        return false
    }

    const saltBytes = Crypto.getRandomBytes(16)
    const salt = fromByteArray(saltBytes)
    return salt
}

export async function saveSensitiveDate(salt: string, refresh_token: string) {
    const data = JSON.stringify({refresh_token, salt})
    await Keychain.setGenericPassword(`secure-data`, data, { 
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
        service: `com.darkvault.securedata` 
    })
}

export async function getSensitiveData() {
    const data = await Keychain.getGenericPassword({ service: `com.darkvault.securedata`})
    if (data) {
        return JSON.parse(data.password)
    }
    return false
}