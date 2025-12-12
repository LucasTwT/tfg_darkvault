import { IP } from "../constants/constants";

export async function verifyJwt (access_token: string) {
        try {
            if (!access_token) return {status: false}
            const response = await fetch(`http://${IP}:8000/auth/verify_token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                },
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