import argon2, { Argon2Options } from "react-native-argon2";
import * as Keychain from 'react-native-keychain'
import sodium, { from_base64 } from "react-native-libsodium";
import { KDF_PARAMS } from "../constants/argon2idParams";
import { useGlobalStore } from "@/src/store/globalStore";

// Regenarte keys:
export async function regenerateKeys(masterPassword: string, salt: string, kdfParams?: Argon2Options) {
    const { updateCryptoContext } = useGlobalStore.getState()
    const params = kdfParams ? kdfParams : KDF_PARAMS
    const { hash } = await hashMasterPassword(masterPassword, salt, params)
    console.log("M. password", masterPassword, "Root_Key", hash.rawHash, "Salt", salt, "Params", params)
    const vaultKey = deriveKey(hash.rawHash, "VAULT")
    const authKey = deriveKey(hash.rawHash, "AUTH")
    const keys = keypairFromSeed(authKey)
    console.log("Vault key", vaultKey, "AuthKey", "PRIVATE_KEY", keys.privateKey)
    updateCryptoContext({ authKey: authKey, vaultKey: vaultKey, signingKeys: keys })
}

// Hash de la Master password con argon2id
const hashMasterPassword = async (password: string, salt: string, kdfParams: Argon2Options) => {
    const result = await argon2(password, salt, kdfParams);
    return { hash: result, salt: salt, kdfParams: kdfParams };
};

// Derivación de la master password con kdf para generar la auth_key y vault_key
const deriveKey = (
    rootKey: string,
    context: "VAULT" | "AUTH"
) => {
    const ctx = context.padEnd(8, '\0').slice(0, 8);

    return sodium.crypto_kdf_derive_from_key(
        32,
        1,
        ctx,
        from_base64(rootKey, sodium.base64_variants.ORIGINAL)
    );
};

// Generacion del auth verifier aplicando hmac a la auth_key
function keypairFromSeed(authKey: Uint8Array) {
    return sodium.crypto_sign_seed_keypair(authKey);
}

// Función para firmar el challenge propuesto por el server 
export function signChallenge(challengeBase64: string) {
    const { cryptoContext, canSign } = useGlobalStore.getState()
    const challengeBytes = sodium.from_base64(challengeBase64, sodium.base64_variants.ORIGINAL);
    console.log("Private_key", cryptoContext?.signingKeys.privateKey)
    if (canSign() && cryptoContext)
        return sodium.to_base64(sodium.crypto_sign_detached(challengeBytes, cryptoContext.signingKeys.privateKey), sodium.base64_variants.ORIGINAL);
    return false
}

export function generateSalt() {
    const saltBytes = sodium.randombytes_buf(16)
    const salt = sodium.to_base64(saltBytes, sodium.base64_variants.ORIGINAL)
    return salt
}

export async function saveSensitiveData(salt: string, refresh_token: string) {
    const data = JSON.stringify({ refresh_token, salt })
    await Keychain.setGenericPassword(`secure-data`, data, {
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
        service: `com.darkvault.securedata`
    })
}

export async function getSensitiveData() {
    const data = await Keychain.getGenericPassword({ service: `com.darkvault.securedata` })
    if (data) {
        return JSON.parse(data.password)
    }
    return false
}