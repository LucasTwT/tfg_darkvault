import { useEffect } from "react"
import { generateSalt, regenerateKeys, saveSensitiveData } from "@/src/services/crypto/functions/hash"
import { registerUser } from "@/src/services/api/Auth/registerUser"
import { RegisterState, RequestError } from "@/src/reducers/Auth/useRegister.d";
import { useGlobalStore } from "@/src/store/globalStore";
import { router } from "expo-router";

export const useCreateUser = (state: RegisterState, pressed: boolean, setPressed: React.Dispatch<React.SetStateAction<boolean>>, setRequestError: (payload: RequestError) => void) => {
  const { updateAccessToken, updateRefreshToken } = useGlobalStore()

  useEffect(() => {
    const { username, password, email } = state.userdata
    if ((state.errors.username === "" && state.errors.email === "" && state.errors.password === "") && (username !== "" && password !== "" && email !== "")) {
      const salt = generateSalt()
      regenerateKeys(password, salt).then(() => { 
          registerUser(username, email, salt).then(({ response, status }) => {
          if (status) {
            saveSensitiveData(salt, response["refresh_token"])
            updateAccessToken(response["access_token"])
            updateRefreshToken(response["refresh_token"])
            router.push("/(tabs)/Home")
          } else {
            setRequestError({ title: "Error", msg: response.detail })
          }
        })
      })


    }
  }, [pressed, setPressed])
}