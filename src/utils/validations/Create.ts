import { Vault } from "@/src/reducers/Home/useHome.d";

export function validateVaultName(name: string, t: any, vaults: Vault[]) {
    if (name.trim().length === 0) return t("create.vault.validations.vaultNameRequired")
    if (vaults.filter((vault) => vault.name === name).length > 0) return t("create.vault.validations.vaultNameAlreadyExist")
    return ""
}