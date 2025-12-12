import { useGlobalStore } from "@/src/store/globalStore";
import { IP } from "../constants/constants";

export async function refresh() {
    const { refresh_token, updateAccessToken } = useGlobalStore.getState()
    try {
        const content = JSON.stringify({"refresh_token": refresh_token})
        const response = await fetch(`http://${IP}:8000/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: content
        });

        if (!response.ok) {
            const error = await response.json()
            return { response: error, status: false }
        }
        const { access_token } = await response.json()
        updateAccessToken(access_token)
        return { response: access_token, status: true }
    } catch (error) {
        return { response: error, status: false }
    }
}