import { Vault } from "@/src/reducers/Home/useHome.d";
import { requestCreateVault } from "@/src/services/api/Vault/createVault";
import { useGlobalStore } from "@/src/store/globalStore";
import { useAppStore } from "@/src/store/useAppStore";
import { useBottomSheetStore } from "@/src/store/useBottomSheet";
import { validateVaultName } from "@/src/utils/validations/Create";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useCreateVault({vault, setError} : {vault: Vault, setError: (payload: any) => void}) {
    const { userVaults, addVault } = useAppStore()
    const { access_token } = useGlobalStore()
    const { t } = useTranslation()
    const { contentHandle } = useBottomSheetStore()
        
    useEffect(() => {
        const error = validateVaultName(vault.name, t, userVaults);
        setError(error);
    }, [vault.name, userVaults]);

  useEffect(() => {
    if (!contentHandle) return;

    const error = validateVaultName(vault.name, t, userVaults);
    setError(error);

    if (error !== "") return;

    requestCreateVault(access_token, vault).then(({ response, status }) => {
      if (status === 201) addVault(vault);
    });
  }, [contentHandle]);
}