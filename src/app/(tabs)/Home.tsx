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
import { usePopoverStore } from "@/src/store/usePopoverStore";
import { TopButton } from "@/src/components/ui/Buttons/TopButton";

/*
    Errores:
        Delete vault:
            1º Cuando salta el bottom sheet y la contraseña introducida es incorrecta la primera vez da igual que despues se introduzca bien que no lo borra
            2º Cuando se borra usando el contexto de la store de zustdan sin pasar por la bottom sheet el modal (popover) pierde la referencia del vault y peta 
*/

export default function Home() {
  const theme = useTheme();
  const [filterVal, setFilterVal] = useState("");
  const [visible] = useState(false);
  const { openSheet } = useBottomSheetStore();
  const { isVisible, anchorRef, selectedVault, changeVisible } =
    usePopoverStore();
  const imgUrl = theme.dark
    ? require("@/src/assets/images/iconBlackBackground5.png")
    : require("@/src/assets/images/iconWhiteBackground.png");
  const { t } = useTranslation();
  const {
    state,
    setFilterOptions,
    setVaultOptions,
    initFilterOptions,
    initVaultOptions,
    filterVaults,
  } = useHomeReducer();
  const snapPoints = useMemo(() => ["90%"], []);
  const canShowPopover = isVisible && anchorRef?.current && selectedVault;

  useHome({
    initFilterOptions: initFilterOptions,
    initVaultOptions: initVaultOptions,
    filterVal: filterVal,
    filterVaults: filterVaults,
    setFilterVal: setFilterVal,
    t: t,
    filterOptions: state.filterOptions,
  });
  // useLoadPopover()
  return (
    <MainView style={{ gap: RFValue(34) }}>
      <View
        style={{ width: "100%", height: RFValue(50), alignItems: "flex-start" }}
      >
        <Image
          style={{ width: "50%", height: "100%", objectFit: "contain" }}
          source={imgUrl}
        />
      </View>
      <View style={{ alignItems: "center", width: "100%" }}>
        <TextTitle style={{ textAlign: "center", letterSpacing: 1 }}>
          {t("tabs.home.title")}
        </TextTitle>
      </View>
      <View style={{ flex: 1, gap: 20 }}>
        <View style={{ flexDirection: "row", gap: RFValue(20) }}>
          <Popover
            popoverStyle={{
              borderRadius: RFValue(15),
              backgroundColor: "rgba(0,0,0,.001)",
              flexDirection: "row",
            }}
            placement={PopoverPlacement.AUTO}
            arrowSize={{ width: 16, height: 8 }}
            from={(sourceRef, showPopover) => (
              <FilterInputText
                sourceRef={sourceRef}
                showPopover={showPopover}
                visible={visible}
                input={filterVal}
                setInput={setFilterVal}
                placeholder={"Vault name.."}
                t={t}
              />
            )}
          >
            <PopOverContent
              filterOptions={state.filterOptions}
              setFilterOptions={setFilterOptions}
            />
          </Popover>
          <CustomIconButton
            icon="plus"
            onPress={() => {
              openSheet(
                <CreateOrModifyVault />,
                {
                  dynamicSizing: false,
                  snapPoints: snapPoints,
                  handleComponent: HandleComponent,
                  enablePanDownToClose: true,
                  enableContentPanningGesture: true,
                },
                {
                  buttons: [
                    {
                      content: TopButton,
                      action: "add",
                      props: {
                        txt: t("create.vault.btnTxt"),
                        txtColor:
                          theme.customHandleComponent.btnAction.textColor,
                        bgColor:
                          theme.customHandleComponent.btnAction.background,
                        icRight: "plus",
                      },
                      status: false,
                    },
                  ],
                },
              );
            }}
            endColor={theme.colors.background}
          />
        </View>
        {state.filterData.length > 0 ? (
          <VaultGrid
            data={state.filterData}
            vaultOptions={state.vaultOptions}
            setVaultOptions={setVaultOptions}
          />
        ) : (
          <Text>No hay vaults creadas</Text>
        )}
      </View>
      {canShowPopover && (
        <Popover
          placement={PopoverPlacement.BOTTOM}
          isVisible={isVisible}
          popoverStyle={{
            borderRadius: RFValue(15),
            backgroundColor: "rgba(0,0,0,0.01)",
            flexDirection: "row",
          }}
          onRequestClose={() => changeVisible(false)}
          from={anchorRef}
        >
          <PopOverContent
            filterOptions={state.vaultOptions}
            setFilterOptions={setVaultOptions}
          />
        </Popover>
      )}
    </MainView>
  );
}
