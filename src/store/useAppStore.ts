import { create } from "zustand"
import type { AppGlobalState } from "./useAppStore.d"
import { Vault } from "../reducers/Home/useHome.d"

export const useAppStore = create<AppGlobalState>((set) => {
    return {
        userVaults: [],
        initUserVaults: (vaults: Vault[]) => set({userVaults: vaults}),
        addVault: (vault: Vault) => {
            set((prevState) => {
                const userVaults = [...prevState.userVaults]
                userVaults.push(vault)
                return { userVaults: userVaults }
            })
        },
        modifyVault: (modifiedVault: Vault) => {
            set((prevState) => {
                const userVaults = [...prevState.userVaults]
                const userVaultsModified = userVaults.map((vault) => {
                    if (modifiedVault.id === vault.id) {
                        return modifiedVault
                    }else{
                        return vault
                    }
                })
                return { userVaults: userVaultsModified }
            })
        }
    }
})