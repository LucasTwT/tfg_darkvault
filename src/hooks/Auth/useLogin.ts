import { useEffect } from "react"
import { signChallenge, saveSensitiveData, regenerateKeys } from "@/src/services/crypto/functions/hash"
import { LoginState } from "@/src/reducers/Auth/useLogin.d";
import { RequestError } from "@/src/reducers/Auth/useRegister.d";
import { finishLogin } from "@/src/services/api/Auth/loginUser";
import { useGlobalStore } from "@/src/store/globalStore";
import { loginStart } from "@/src/services/api/Auth/loginStart";
import { router } from "expo-router";

export const useLoginUser = (state: LoginState, pressed: boolean, setPressed: React.Dispatch<React.SetStateAction<boolean>>, setRequestError: (payload: RequestError) => void) => {
    const { updateAccessToken, updateRefreshToken } = useGlobalStore()
    useEffect(() => {
        const { identifier, password } = state.userdata
        if ((state.errors.identifier === "" && state.errors.password === "") && (password !== "" && identifier !== "")) {
            loginStart(identifier).then(({ response, status }) => {
                if (status) {
                    regenerateKeys(password, response["salt"], response["kdf_params"]).then(() => {
                        const signature = signChallenge(response["challenge"])
                        if (signature) {
                            finishLogin(identifier, signature).then(({ response, status }) => {
                                if (status) {
                                    updateAccessToken(response["access_token"])
                                    saveSensitiveData(response["salt"], response["refresh_token"])
                                    updateRefreshToken(response["refresh_token"])
                                    router.push("/(tabs)/Home")
                                } else {
                                    setRequestError({ title: "Error", msg: response.detail })
                                }
                            })
                        }
                    })
                } else {
                    setRequestError({ title: "Error", msg: "Wrong email or username" })
                }
            })
        }
    }, [pressed, setPressed])
}