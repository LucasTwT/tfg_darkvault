import { IP } from "../constants/constants";

export async function refresh(refresh_token: string) {
    try {
        const content = JSON.stringify({refresh_token})
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
        return { response: await response.json(), status: true }
    } catch (error) {
        return { response: error, status: false }
    }
}