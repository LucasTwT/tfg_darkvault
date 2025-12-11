import { Argon2Result } from "react-native-argon2";

export interface GlobalState {
    settings: userSettings,
    access_token: string,
    refresh_token: string,
    auth_key: Argon2Result,
    updateSettings: (newSettings: UserSettings) => void,
    updateAccessToken: (newAccessToken: string) => void,
    updateRefreshToken: (newRefreshToken: string) => void,
    updateAuthKey: (newAuthKey: Argon2Result) => void,
}

export interface UserSettings {
    lang: "es" | "en",
    theme: "dark" | "light" | "system",
    logged: boolean,
    clipboard_cleaning: clipboard_cleaning
}


export enum Clipboard_cleaning {
    later_15s = 15,
    later_1m = 60,
    later_2m = 120
}