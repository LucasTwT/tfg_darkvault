import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text, TouchableOpacity } from "react-native";
import { BottomSheetElement } from "../BottomSheetElement";
import { RFValue } from "react-native-responsive-fontsize";
import React, { useMemo } from "react";
import { useTheme } from "styled-components/native";
import { useBottomSheetStore } from "@/src/store/useBottomSheet";
import { CreateOrModifyVault } from "../CreateVault/CreateOrModifyVault";
import { useTranslation } from "react-i18next";
import HandleComponent from "../HandleComponent";

export function BottomSheetCreate () {
    const theme = useTheme()
    const { t } = useTranslation()
    const { openSheet } = useBottomSheetStore()
    const styles = theme.bottomActionSheet
    const snapPoints = useMemo(() => ["90%"], [])
    const urlImg = theme.dark ? require("@/src/assets/images/vaultIcon.png") : require("@/src/assets/images/VaultIconBackgroundWhite.png") 
    return (
            <BottomSheetView style={{ gap: RFValue(30) }}>
                <BottomSheetView style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ color: styles.handleIndicatorText, fontFamily: "lexendGigaMedium", fontSize: RFValue(12) }}>{t("create.bottomSheetCreate.title")}</Text>
                </BottomSheetView>
                <BottomSheetView style={{ padding: RFValue(20) }}>
                    <TouchableOpacity onPress={() => openSheet(<CreateOrModifyVault/>, {dynamicSizing: false, snapPoints: snapPoints, handleComponent: HandleComponent}, {btnTxt: t("create.vault.btnTxt"), status: false})}>
                        <BottomSheetElement actionName={t("create.bottomSheetCreate.vault.title")} description={t("create.bottomSheetCreate.vault.description")} image={urlImg} color={styles.icColor} />
                    </TouchableOpacity>
                    <BottomSheetElement actionName={t("create.bottomSheetCreate.login.title")} description={t("create.bottomSheetCreate.login.description")} icon={"user"} color={styles.icColor} />
                    <BottomSheetElement actionName={t("create.bottomSheetCreate.file.title")} description={t("create.bottomSheetCreate.file.description")} icon={"file"} color={styles.icColor} />
                </BottomSheetView>
            </BottomSheetView>
    )
}