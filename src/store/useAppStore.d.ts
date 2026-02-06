import { Vault } from "../reducers/Home/useHome.d";

export interface AppGlobalState {
    userVaults: Vault[],
    actualVault?: Vault,
    initUserVaults: (userVaults: Vault[]) => void,
    addVault: (newVault: Vault) => void,
    modifyVault: (modifiedVault: Vault) => void,
    setActualVault: (vault: Vault) => void,
}