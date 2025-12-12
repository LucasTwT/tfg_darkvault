import { FilterInputText } from "@/src/components/ui/FilterInputText";
import { CustomIconButton } from "@/src/components/ui/Buttons/CustomIconButton";
import { MainView, TextTitle } from "@/src/styles/auth/styles";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useHomeReducer } from "@/src/reducers/Home/useHome";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { PopOverContent } from "@/src/components/ui/PopOver/PopOverContent";
import { VaultGrid } from "@/src/components/ui/Grids/VaultGrid";
import { useTheme } from "styled-components/native";
import { useBottomSheetStore } from "@/src/store/useBottomSheet";
import { CreateOrModifyVault } from "@/src/components/ui/BottomSheet/CreateVault/CreateOrModifyVault";
import HandleComponent from "@/src/components/ui/BottomSheet/HandleComponent";
import { useHome } from "@/src/hooks/Home/useHome";

export default function Home() {
    const theme = useTheme()
    const [filterVal, setFilterVal] = useState('')
    const [ visible ] = useState(false)
    const { openSheet } = useBottomSheetStore()
    const imgUrl = theme.dark ? require("@/src/assets/images/iconBlackBackground5.png") : require("@/src/assets/images/iconWhiteBackground.png")
    const { t } = useTranslation()
    const { state, setFilterOptions, setVaultOptions, initFilterOptions, initVaultOptions, filterVaults } = useHomeReducer()
    const snapPoints = useMemo(() => ["90%"], [])

    useHome({initFilterOptions: initFilterOptions, initVaultOptions: initVaultOptions, filterVal: filterVal, filterVaults: filterVaults, setFilterVal: setFilterVal, t: t})

    return (
        <MainView style={{ gap: RFValue(34)}}>
            <View style={{ width: "100%", height: RFValue(50), alignItems: "flex-start" }}>
                <Image style={{ width: "50%", height: "100%", objectFit: 'contain' }} source={imgUrl} />
            </View>
            <View style={{ alignItems: "center", width: "100%" }}>
                <TextTitle style={{ textAlign: "center", letterSpacing: 1 }}>{t('tabs.home.title')}</TextTitle>
            </View>
            <View style={{ flex: 1, gap: 20}}>
                <View style={{ flexDirection: 'row', gap: RFValue(20) }} >
                    <Popover
                        popoverStyle={{ borderRadius: RFValue(15), backgroundColor: "rgba(0,0,0,.001)", flexDirection: "row" }}
                        placement={PopoverPlacement.AUTO}
                        arrowSize={{ width: 16, height: 8 }}
                        from={((sourceRef, showPopover) =>
                            <FilterInputText sourceRef={sourceRef} showPopover={showPopover} visible={visible} input={filterVal} setInput={setFilterVal} placeholder={"Vault name.."} t={t} />
                        )}>
                        <PopOverContent  filterOptions={state.filterOptions} setFilterOptions={setFilterOptions} />
                    </Popover>
                    <CustomIconButton icon="plus" onPress={() => { openSheet(<CreateOrModifyVault/>, {dynamicSizing: false, snapPoints: snapPoints, handleComponent: HandleComponent}, {btnTxt: "Create vault", status: false})}} endColor={theme.colors.background}/>
                </View>
                {
                    state.filterData.length > 0 ? <VaultGrid data={state.filterData} vaultOptions={state.vaultOptions} setVaultOptions={setVaultOptions} />
                    : <Text>No hay vaults creadas</Text>
                }
            </View>
        </MainView>
    )
}