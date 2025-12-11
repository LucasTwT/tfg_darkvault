import { Vault } from "../reducers/Home/useHome.d";

export interface AppGlobalState {
    userVaults: Vault[],
    initUserVaults: (userVaults: Vault[]) => void,
    addVault: (newVault: Vault) => void,
    modifyVault: (modifiedVault: Vault) => void,
}