import * as DocumentPicker from "expo-document-picker";
import { FileData } from "../../security/types/file.d";
export async function pickFile() {
  const resp = await DocumentPicker.getDocumentAsync({
    type: "*/*",
    copyToCacheDirectory: true,
    multiple: true,
  });

  if (resp.canceled) return null;

  const files: FileData[] = [] 
  const uris: string[] = []
  resp.assets.forEach((file, idx) => {
      files[idx] = {fileName: file.name, note: '', tags: '', chunks: []}
      uris.push(file.uri)
  })
  return {selectedFiles: files, selectedUris: uris}
}
