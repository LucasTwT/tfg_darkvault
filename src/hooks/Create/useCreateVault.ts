import { Vault } from "@/src/reducers/Home/useHome.d";
import { requestCreateVault } from "@/src/services/api/Vault/createVault";
import { getVaults } from "@/src/services/api/Vault/getVaults";
import { useAppStore } from "@/src/store/useAppStore";
import { useBottomSheetStore } from "@/src/store/useBottomSheet";
import { validateVaultName } from "@/src/utils/validations/Create";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useCreateVault({vault, setError, modify} : {vault: Vault, setError: (payload: any) => void, modify: boolean}) {
    const { userVaults,  initUserVaults } = useAppStore()
    const { t } = useTranslation()
    const { contentHandle } = useBottomSheetStore()
        
    useEffect(() => {
        if (modify) return
        const error = validateVaultName(vault.name, t, userVaults);
        setError({field: "name", value: error})
    }, [vault.name, userVaults, modify]);

  useEffect(() => {
    if (!contentHandle || modify) return;

    const error = validateVaultName(vault.name, t, userVaults);
    setError(error);

    if (error !== "") return;

    requestCreateVault(vault).then(({ response, status }) => {
      if (status === 201) {
         if (contentHandle?.status){
            getVaults().then(({ response, status }) => {
                if (status === 200)
                    initUserVaults(response.vaults)
            })
        }
      }
    });
  }, [contentHandle, modify]);
}  