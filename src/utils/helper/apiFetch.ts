import { refresh } from "@/src/services/api/Auth/refresh";
import { verifyJwt } from "@/src/services/api/Auth/verifyJwt";
import { useGlobalStore } from "@/src/store/globalStore";

export async function apiFetch(url: string, options: RequestInit = {}) {
    const { access_token } = useGlobalStore.getState()
    let token = access_token

    // Request para validar el token en el server: 
    const { status: jwtValid } = await verifyJwt(token)

    if (!jwtValid) {
        // Request para refrescar el jwt con el refresh_token
        const { response: newJwt, status: newToken } = await refresh()
        if (!newToken) throw new Error("No se pudo refrescar el token")
        token = newJwt
    }

    // Ejecutar la solicitud pasada como argumento:
    const res = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`,
        },
    });

    if (res.status === 401) {
        const { response: newJwt, status: newToken } = await refresh()
        if (!newToken) return res
        // Retry
        return fetch(url, {
            ...options,
            headers: {
                ...(options.headers || {}),
                Authorization: `Bearer ${newJwt}`,
            },
        });
    }
    return res
}