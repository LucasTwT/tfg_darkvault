import { BottomSheetView } from "@gorhom/bottom-sheet";
import { View } from "react-native";
import { HeaderView } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { TextTitle } from "@/src/styles/auth/styles";
import { CustomInputText } from "../../CustomInputText";
import { useTranslation } from "react-i18next";
import { styles } from "../../styles"
import { useTheme } from "styled-components/native";
import { useCreateVaultReducer } from "@/src/reducers/Create/useCreateVault";
import { ItemGrid } from "../../Grids/ItemGrid";
import { ColorGrid } from "../../Grids/ColorGrid";
import { DEFAULT_COLORS } from "@/src/utils/constants";
import Foundation from "@expo/vector-icons/Foundation";
import { useCreateVault } from "@/src/hooks/Create/useCreateVault";
import { useModifyVault } from "@/src/hooks/Modify/useModifyVault";
import { Vault } from "@/src/reducers/Home/useHome.d";

export function CreateOrModifyVault ({vault} : {vault?: Vault}) {
    const { state, changeVaultFields, setVaultError, initVault } = useCreateVaultReducer()
    const { t } = useTranslation()
    const theme = useTheme()
    const modifyOrCreate = vault ? "modify" : "create"
    useCreateVault({setError: setVaultError, vault: state.vaultPreview})
    useModifyVault({vault, initVault, modify: vault ? true : false, setError: setVaultError, t: t})
    return (
        <BottomSheetView style={{height: "100%", gap: RFValue(20), padding: RFValue(40)}}>
            <HeaderView>
                <TextTitle>{t(`${modifyOrCreate}.vault.title`)}</TextTitle>
            </HeaderView>
            <View style={{flexDirection: "row", width: "90%", justifyContent: "center", alignItems: "center", gap: RFValue(10), paddingLeft: RFValue(10)}}>
                <View
                    style={[
                        styles.iconContainer,
                        { backgroundColor: state.vaultPreview.settings.colors.bgColor}]}
                        >
                    <Foundation name={state.vaultPreview.settings.icon} size={RFValue(24)} color={state.vaultPreview.settings.colors.icColor}/>
                </View>
                <CustomInputText 
                    bgColor={theme.bottomActionSheet.background} 
                    label={t("create.vault.vaultNameField.label")} placeholder={t("create.vault.vaultNameField.placeholder")}  input={state.vaultPreview.name} setInput={changeVaultFields} error={state.error.name}
                    setError={setVaultError} 
                    field={"name"}  
                    t={t} 
                    keyboardType={"default"} 
                    />
            </View>
            <ColorGrid changeVaultFields={changeVaultFields} data={DEFAULT_COLORS} vaultPreview={state.vaultPreview}/>
            <ItemGrid data={state.icons} changeVaultFields={changeVaultFields} vaultPreview={state.vaultPreview}/>
        </BottomSheetView>
    )
}