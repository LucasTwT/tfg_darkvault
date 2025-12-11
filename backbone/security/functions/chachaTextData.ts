import { hexToUint8 } from "./chachaFunctions";
import { crypto_aead_xchacha20poly1305_ietf_decrypt, from_base64, to_string, randombytes_buf, crypto_aead_xchacha20poly1305_ietf_encrypt, to_base64 } from 'react-native-libsodium'


export function decryptXChaCha(
    ciphertext: string,
    nonce: string,
    keyHex: string
) {
    const keyUint8 = hexToUint8(keyHex);
    const additionalData = "";

    const plaintextBytes = crypto_aead_xchacha20poly1305_ietf_decrypt(
        null,
        from_base64(ciphertext),
        additionalData,
        from_base64(nonce),
        keyUint8
    );

    return to_string(plaintextBytes);
}
export function encryptXChaCha(plaintext: string, key: string) {
    const keyUnit8 = hexToUint8(key);
    const messageBytes =  new TextEncoder().encode(plaintext);

    const nonce = randombytes_buf(24);
    const addtionalData = ''

    const ciphertext = crypto_aead_xchacha20poly1305_ietf_encrypt(
        messageBytes,
        addtionalData,
        null,
        nonce,
        keyUnit8
    );

    return {
        ciphertext: to_base64(ciphertext),
        nonce: to_base64(nonce),
    };
}