import { useEffect } from "react"
import { getSalt, hashMasterPassword, saveSensitiveDate } from "@/src/services/crypto/functions/hash"
import { registerUser } from "@/src/services/api/Auth/registerUser"
import { RegisterState, RequestError } from "@/src/reducers/Auth/useRegister";
import { UserSettings } from "@/src/store/globalStoreTypes.d";
import { Argon2Result } from "react-native-argon2";

export const useCreateUser = (state: RegisterState, settings: UserSettings, pressed: boolean, setPressed: React.Dispatch<React.SetStateAction<boolean>>, setRequestError: (payload: RequestError) => void, updateAccessToken: (newAccessToken: string) => void, updateAuthKey: (newAuthKey: Argon2Result) => void, updateRefreshToken: (newRefreshToken: string) => void) => {
  useEffect(() => {
    const { username, password, email } = state.userdata
    if ((state.errors.username === "" && state.errors.email === "" && state.errors.password === "") && (username !== "" && password !== "" && email !== "")) {
      getSalt(username, "register").then((salt) => {
        if (salt) {
          hashMasterPassword(password, salt).then(({ hash, salt }) => {
            registerUser(username, email, hash.encodedHash, salt, settings).then(({ response, status }) => {
              if (status) {
                updateAccessToken(response["access_token"])
                updateAuthKey(hash)
                saveSensitiveDate(salt, response["refresh_token"])
                updateRefreshToken(response["refresh_token"])
              } else {
                setRequestError({ title: "Error", msg: response.detail })
              }
            })
          })
        }
      })
    }
  }, [pressed, setPressed])
}