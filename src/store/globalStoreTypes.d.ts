import sodium from "react-native-libsodium";

export interface GlobalState {
    // User settings
    settings: userSettings,
    updateSettings: (newSettings: UserSettings) => void,
    // Tokens
    access_token: string,
    refresh_token: string,
    updateAccessToken: (newAccessToken: string) => void,
    updateRefreshToken: (newRefreshToken: string) => void,
    // crypto
    cryptoContext?: CryptoContext,
    updateCryptoContext: (newCryptoCtx: CryptoContext) => void,
    canSign: () => boolean,
    clearKeys: () => void
}

export interface CryptoContext {
    vaultKey: Uint8Array<ArrayBufferLike>,
    authKey: Uint8Array<ArrayBufferLike>,
    signingKeys: sodium.KeyPair,
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