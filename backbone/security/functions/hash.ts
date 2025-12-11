import argon2 from "react-native-argon2";
import * as Crypto from 'expo-crypto';
import { fromByteArray } from 'base64-js'
import * as Keychain from 'react-native-keychain'

export const hashMasterPassword = async (password: string) => {
    const salt = await getSalt('username')
    const result = await argon2(password, salt, {
        hashLength: 32,
        iterations: 3,
        memory: 4096,
        parallelism: 1,
        mode: "argon2id",
    });
    return { hash: result, salt: salt }; // incluye salt + params
};

async function getSalt(username: string) {
    const credentials = await Keychain.getGenericPassword({ service: 'salt' });
    if (credentials) {
        return credentials.password

    }
    const saltBytes = Crypto.getRandomBytes(16)
    const salt = fromByteArray(saltBytes)
    setSaltInLocalStorage('username', salt)
    return salt
}

async function setSaltInLocalStorage(username: string, salt: string) {
    await Keychain.setGenericPassword(username, salt, { service: 'salt' })
}