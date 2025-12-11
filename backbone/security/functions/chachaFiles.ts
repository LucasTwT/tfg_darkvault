import { Paths, Directory, File } from "expo-file-system";
import { FileData, Chunk } from "../types/file";
import { hexToUint8 } from "./chachaFunctions";
import { randombytes_buf, crypto_aead_xchacha20poly1305_ietf_encrypt, crypto_aead_xchacha20poly1305_ietf_NPUBBYTES, to_base64, from_base64, crypto_aead_xchacha20poly1305_ietf_decrypt } from "react-native-libsodium";
import { CHUNK_SIZE } from "../constants/files";
import { encryptXChaCha } from "./chachaTextData";

export async function downloadAndDecryptFile(
  fileData: FileData,
  chunks: Chunk,
  keyHex: string,
) {

  const outputUri = `${Paths.cache}/${fileData.fileName}`
  console.log(Paths.cache, "decryptedFiles",fileData.fileName)
  // 1. Crear archivo vacío
  const directory = new Directory(Paths.cache, "decryptedFiles");
  if (!directory.exists){
  directory.create()
  }
  const file = new File(Paths.cache, "decryptedFiles", fileData.fileName);
  file.create();

  // 2. Abrir un writer en modo “append”
    for (const { ciphertextB64, nonceB64 } of chunks) {
      // 3. Desencriptar chunk
      const plaintextChunk = decryptChunkXChaCha(
        ciphertextB64,
        nonceB64,
        keyHex
      );

      // 4. Escribir ese chunk al archivo
      file.write(plaintextChunk);
    }
    console.log(outputUri)
  return outputUri;
}
export async function encryptChunk(chunkBytes: Uint8Array<ArrayBufferLike>, chunkIndex:number, key: string) {
    const keyUnit8 = hexToUint8(key)
    const nonce = randombytes_buf(crypto_aead_xchacha20poly1305_ietf_NPUBBYTES)
    const ciphertext = crypto_aead_xchacha20poly1305_ietf_encrypt(
        chunkBytes,
        '',
        null,
        nonce,
        keyUnit8
    );

  return {
    nonce,
    ciphertext,
    index: chunkIndex,
  };
}


export async function* readEncryptFileChunks(fileUri: string, key: string) {
  // 1. Crear instancia File
  const file = new File(fileUri) // O usar la URI que tengas

  // 2. Abrir handle para leer
  const handle = file.open()

  try {
    // 3. Obtener el tamaño total
    const size = file.size
    if (size == null) {
      throw new Error("No se pudo obtener el tamaño del archivo")
    }

    let offset = 0
    let index = 0
    while (offset < size) {
      const readLength = Math.min(CHUNK_SIZE, size - offset);
      const chunkBytes: Uint8Array = handle.readBytes(readLength);

      const { nonce, ciphertext } = await encryptChunk(chunkBytes, index, key)

      yield {
        ciphertext,  
        nonce,       
        offset,
        index
      };

      offset += readLength;
    }
  } finally {
    handle.close();
  }
}

export async function uploadEncryptedFile(file: FileData, key: string, uri: string) {
  const chunks: Chunk = [];
  
  const { ciphertext, nonce } = encryptXChaCha(JSON.stringify(file), key)

  for await (const chunk of readEncryptFileChunks(uri, key)) {
    chunks.push({
      ciphertextB64: to_base64(chunk.ciphertext),
      nonceB64: to_base64(chunk.nonce),
      offset: chunk.offset,
    });
  }

  return { metadataFile:{ ciphertext: ciphertext, nonce: nonce}, fileChunks: chunks }; // metadata del file y los filechunks estan los datos del file
}


export function decryptChunkXChaCha(cipherB64: string, nonceB64: string, keyHex: string) {
  const key = hexToUint8(keyHex);
  const ciphertext = from_base64(cipherB64);
  const nonce = from_base64(nonceB64);

  const plaintextBytes = crypto_aead_xchacha20poly1305_ietf_decrypt(
    null, // AAD
    ciphertext,
    '', // secret nonce (siempre null)
    nonce,
    key
  );

  return plaintextBytes; // Uint8Array
}