import { useEffect, Dispatch, SetStateAction } from "react";
import { refresh } from "../services/api/Auth/refresh";
import { getSetttings } from "../services/api/User/getSettings";
import { router } from "expo-router";
import { getSensitiveData } from "../services/crypto/functions/hash";
import { UserSettings } from "../store/globalStoreTypes.d";

export function useInit({updateAccessToken, updateRefreshToken, updateSettings, setLoading} : {updateAccessToken: (newToken: string) => void, updateRefreshToken: (newToken: string) => void, updateSettings: (newSettings: UserSettings) => void, setLoading: Dispatch<SetStateAction<boolean>>}){
    useEffect(() => {
    async function init() {
      try{
        const data = await getSensitiveData()
        if (data) {
          const { refresh_token } = data
          updateRefreshToken(refresh_token)
          const verify_token_response = await refresh(refresh_token)

          if (verify_token_response.status) {
            const jwt = verify_token_response.response["access_token"]
            updateAccessToken(jwt)
            const settings_response = await getSetttings(jwt)
            if(settings_response.status) {
              updateSettings(settings_response.response["settings"])
              
              router.replace({pathname: "/(tabs)/Home", params: {email: settings_response.response["email"]}})
            }
          }else{
            router.replace("/(Auth)/Login")
          }
        }else{
          router.replace("/(Auth)/Register")
        }
      }catch(e) {
      }finally{
        setLoading(false)
      }
    }
    init()
  }, []); 
}