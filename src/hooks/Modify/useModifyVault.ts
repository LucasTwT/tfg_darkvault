import { UpdatePayload } from "@/src/reducers/Create/useCreateVault.d";
import type { Vault } from "@/src/reducers/Home/useHome.d";
import { requestModifyVault } from "@/src/services/api/Vault/modifyVault";
import { useGlobalStore } from "@/src/store/globalStore";
import { useAppStore } from "@/src/store/useAppStore";
import { useBottomSheetStore } from "@/src/store/useBottomSheet";
import { validateModifyVaultName } from "@/src/utils/validations/Modify";
import { useEffect } from "react";

export function useModifyVault ({modify, vault, updatedVault, initVault, t, setError} : {modify: boolean, vault?: Vault, updatedVault?: Vault, initVault: (payload: {vault: Vault}) => void, t: any, setError: (error: UpdatePayload) => void}) {

    const { userVaults, modifyVault } = useAppStore()
    const { access_token } = useGlobalStore()
    const { contentHandle } = useBottomSheetStore()

    // Load of the vault to be modified:
    useEffect(() => {
        if (!modify || !vault) return
        initVault({vault: vault})
    }, [initVault, modify, vault])

    // Verify vault data
    useEffect(() => {
        if (!modify || !updatedVault ) return
        setError({field: "name", value: validateModifyVaultName(updatedVault, t, userVaults)})
    }, [modify, updatedVault, userVaults, setError, t]) 

    // Send to server
    useEffect(() => {
        if (!modify || !updatedVault || !contentHandle?.status) return
        const error = validateModifyVaultName(updatedVault, t, userVaults)
        setError({field: "name", value: error})        
        if (error !== "") return

        requestModifyVault(access_token, updatedVault).then(({response, status}) => {
            console.log(updatedVault)
            if (status === 202) modifyVault(updatedVault)
        })

    }, [contentHandle])
}