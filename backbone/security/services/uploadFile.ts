// export async function downloadAndDecryptFile(
//   chunks: Chunk,
//   keyHex: string,
//   outputUri: string
// ) {
//   const file = new File(outputUri);
//   file.create()
//   // crear archivo vacío
//   file.write(new Uint8Array());

//   for (const { ciphertextB64, nonceB64 } of chunks) {
//     const plaintextChunk = decryptChunkXChaCha(ciphertextB64, nonceB64, keyHex);
//     file.write(plaintextChunk);
//   }

//   return outputUri;
// }

/* 
async function uploadEncryptedFile(fileUri: string, keyUint8: Uint8Array) {
  for await (const chunk of readEncryptFileChunks(fileUri, keyUint8)) {
    // chunk.ciphertext → Uint8Array
    // chunk.nonce → Uint8Array
    // chunk.offset → número

    // Aquí puedes convertir a base64 si tu servidor lo espera:
    const ciphertextB64 = to_base64(chunk.ciphertext);
    const nonceB64 = to_base64(chunk.nonce);

    // Enviar por fetch / websocket / lo que uses:
    await fetch("https://tu-backend/upload-chunk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        offset: chunk.offset,
        ciphertext: ciphertextB64,
        nonce: nonceB64,
      }),
    });
  }

  // Luego puedes enviar un “fin” para que el servidor sepa que acabaste
  await fetch("https://tu-backend/upload-complete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileUri }),
  });
}
*/