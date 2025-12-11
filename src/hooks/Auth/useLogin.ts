import { useEffect } from "react"
import { getSalt, hashMasterPassword, saveSensitiveDate } from "@/src/services/crypto/functions/hash"
import { LoginState } from "@/src/reducers/Auth/useLogin.d";
import { RequestError } from "@/src/reducers/Auth/useRegister";
import { Argon2Result } from "react-native-argon2";
import { loginUser } from "@/src/services/api/Auth/loginUser";

export  const useLoginUser = (state: LoginState, pressed: boolean, setPressed: React.Dispatch<React.SetStateAction<boolean>>, setRequestError: (payload: RequestError) => void, updateAccessToken: (newAccessToken: string) => void, updateAuthKey:(newAuthKey: Argon2Result) => void, updateRefreshToken: (newRefreshToken: string) => void) => {
    useEffect(() => {
      const { identifier, password } = state.userdata
      if ((state.errors.identifier === "" && state.errors.password === "") && (password !== "" && identifier !== "")) {
         getSalt(identifier, "login").then((salt) => {
            if(salt) {
                hashMasterPassword(password, salt).then(({hash, salt}) => {
                    loginUser(identifier, hash.encodedHash).then(({response, status}) => {
                        if(status){
                            updateAccessToken(response["access_token"])
                            updateAuthKey(hash)

                            saveSensitiveDate(salt, response["refresh_token"])
                            updateRefreshToken(response["refresh_token"])
                        }else{
                            setRequestError({title: "Error", msg: response.detail})
                        }
                    })
                })
            }else {
                setRequestError({title: "Error", msg: "Wrong email or username"})
            }
         })
      }
    }, [pressed, setPressed])
  }