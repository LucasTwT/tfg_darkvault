import { useEffect, Dispatch, SetStateAction } from "react";
import { getSetttings } from "../services/api/User/getSettings";
import { router } from "expo-router";
import { getSensitiveData } from "../services/crypto/functions/hash";
import { useGlobalStore } from "../store/globalStore";
import { UserSettings } from "../store/globalStoreTypes";
export function useInit({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) {
  const { updateRefreshToken, updateSettings } = useGlobalStore.getState()
  useEffect(() => {
    init(updateRefreshToken, updateSettings, setLoading)
  }, []);
}
async function init(updateRefreshToken: (newRefreshToken: string) => void, updateSettings: (newSettings: UserSettings) => void, setLoading:  Dispatch<SetStateAction<boolean>>) {
      try {
        
        const data = await getSensitiveData()
        if (data) {
          const { refresh_token } = data
          updateRefreshToken(refresh_token)
          const settings_response = await getSetttings()
          if (settings_response.status) {
            updateSettings(settings_response.response["settings"])
            router.replace({ pathname: "/(tabs)/Home", params: { email: settings_response.response["email"] } })
          } else {
            router.push("/(Auth)/Login")
          }
        } else {
          router.push("/(Auth)/Register")
        }
      } catch (e) {
      } finally {
        setLoading(false)
      }
    }