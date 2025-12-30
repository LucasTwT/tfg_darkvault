import { create } from "zustand"
import { Clipboard_cleaning, CryptoContext, GlobalState, UserSettings } from "./globalStoreTypes.d"
import * as Localization from 'expo-localization';

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
        cryptoContext: undefined,
        updateSettings: (newSettings: UserSettings) => set({settings: newSettings}),
        updateAccessToken: (newAccessToken: string) => set({access_token: newAccessToken}),
        updateRefreshToken: (newRefreshToken: string) => set({refresh_token: newRefreshToken}),

        updateCryptoContext: (newCryptoCtx: CryptoContext) => set({cryptoContext: newCryptoCtx}),

        canSign: (): boolean => {
        const ctx: CryptoContext | undefined = useGlobalStore.getState().cryptoContext
        return !!ctx?.signingKeys.privateKey
        },

        clearKeys: () => set({cryptoContext: undefined})
    }
})