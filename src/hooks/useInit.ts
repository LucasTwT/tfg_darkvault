import { useEffect, Dispatch, SetStateAction } from "react";
import { getSetttings } from "../services/api/User/getSettings";
import { router } from "expo-router";
import { getSensitiveData } from "../services/crypto/functions/hash";
import { useGlobalStore } from "../store/globalStore";

export function useInit({ setLoading }: { setLoading: Dispatch<SetStateAction<boolean>> }) {
  const { updateRefreshToken, updateSettings } = useGlobalStore.getState()
  useEffect(() => {
    async function init() {
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
            router.replace("/(Auth)/Login")
          }
        } else {
          router.replace("/(Auth)/Register")
        }
      } catch (e) {
      } finally {
        setLoading(false)
      }
    }
    init()
  }, []);
}