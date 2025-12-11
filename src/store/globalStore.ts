import { create } from "zustand"
import { Clipboard_cleaning, GlobalState, UserSettings } from "./globalStoreTypes.d"
import * as Localization from 'expo-localization';
import { Argon2Result } from "react-native-argon2";

export const useGlobalStore = create<GlobalState>((set) => {
    return {
        settings: {
            theme: "system",
            lang: Localization.getLocales()[0].languageCode,
            logged: false,
            clipboard_cleaning: Clipboard_cleaning.later_2m
        },
        access_token: "",
        refresh_token: "",
        auth_key: {encodedHash: "", rawHash: ""},

        updateSettings: (newSettings: UserSettings) => set({settings: newSettings}),

        updateAccessToken: (newAccessToken: string) => set({access_token: newAccessToken}),
        updateRefreshToken: (newRefreshToken: string) => set({refresh_token: newRefreshToken}),
        updateAuthKey: (newAuthKey: Argon2Result) => set({auth_key: newAuthKey})
    }
})