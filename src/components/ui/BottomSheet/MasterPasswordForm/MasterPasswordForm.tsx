import { TextTitle } from "@/src/styles/auth/styles";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { PasswordField } from "../InputText/PasswordField";
import { useMasterPassword } from "@/src/hooks/Auth/useMasterPassword";
import { Argon2Options } from "react-native-argon2";
import { useDeleteVault } from "@/src/hooks/Delete/useDeleteVault";

export function MasterPasswordForm({salt, kdfParams, vaultId, challenge} : {salt: string, kdfParams: Argon2Options, vaultId: string, challenge: string}) {
    const [masterPassword, setMasterPassword] = useState<MasterPassword>({field: "password", value: ""})
    const [error, setError] = useState('')
    const theme = useTheme()
    const { t } = useTranslation()
    useMasterPassword({password: masterPassword, setError: setError})
    useDeleteVault({password: masterPassword, kdfParams: kdfParams, challenge: challenge, vaultId: vaultId, salt: salt})
    return (
        <BottomSheetView style={{flex: 1, padding: RFValue(40), gap: RFValue(20)}}>
            <TextTitle style={{textAlign: "center"}}>{t("auth.verifyMasterPassword.title")}</TextTitle>
                <PasswordField 
                    bgColor={theme.bottomActionSheet.background} 
                    label={t("auth.verifyMasterPassword.masterPasswordField.label")}
                    placeholder={t("auth.verifyMasterPassword.masterPasswordField.placeholder")}
                    input={masterPassword.value}
                    setInput={(payload: MasterPassword) => setMasterPassword({field: payload.field, value: payload.value})}
                    error={error}
                    field={"password"}  
                    t={t} 
                    />
        </BottomSheetView>
    )
}