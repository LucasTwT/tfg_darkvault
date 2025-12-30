import { finishDeleteVault } from "@/src/services/api/Vault/deleteVault"
import { regenerateKeys, signChallenge } from "@/src/services/crypto/functions/hash"
import { useBottomSheetStore } from "@/src/store/useBottomSheet"
import { usePopoverStore } from "@/src/store/usePopoverStore"
import { validatePassword } from "@/src/utils/validations/Login"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Argon2Options } from "react-native-argon2"

export function useDeleteVault({password, salt, kdfParams, challenge, vaultId} : {salt: string, kdfParams: Argon2Options, challenge: string, password: MasterPassword, vaultId: string}) {
    const { t } = useTranslation()
    const { contentHandle, closeSheet } = useBottomSheetStore()
    const { changeVisible, setAnchorRef, setSelectedVault } = usePopoverStore()
    useEffect(() => {
        if (!contentHandle || validatePassword(password.value, t) !== "") return
        regenerateKeys(password.value, salt, kdfParams).then(() => {
            const signature = signChallenge(challenge)
            if (signature)
                finishDeleteVault(signature, vaultId).then(({status}) => {
                    if (!status) return // setRequestError(response.detail) show a alert modal
                    changeVisible(false)
                    setAnchorRef(null)
                    setSelectedVault(null)
                    closeSheet()
                })
        })
    }, [contentHandle])
}