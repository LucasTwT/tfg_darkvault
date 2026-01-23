import { Vault } from "@/src/reducers/Home/useHome.d";
import { useAppStore } from "@/src/store/useAppStore";
import { useBottomSheetStore } from "@/src/store/useBottomSheet";
import Foundation from "@expo/vector-icons/Foundation";
import {
  BottomSheetView,
  useBottomSheetScrollableCreator,
} from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { BottomSheetElement } from "../BottomSheetElement";

export function ListOfVaults() {
  const { userVaults } = useAppStore();
  const theme = useTheme();
  const { t } = useTranslation();
  const { changeVault } = useBottomSheetStore();
  const BottomSheetScrollable = useBottomSheetScrollableCreator();

  const renderItem = useCallback(({ item }: { item: Vault }) => {
    const {
      name,
      settings: { colors, icon },
    } = item;

    return (
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() =>
          changeVault({
            txt: name,
            txtColor: colors.icColor,
            bgColor: colors.bgColor,
            icLeft: icon,
          })
        }
      >
        <BottomSheetElement
          actionName={name}
          icon={icon}
          color={colors.icColor}
        />
      </TouchableOpacity>
    );
  }, []);

  return (
    <BottomSheetView
      style={{
        flex: 1,
        gap: RFValue(16),
        paddingHorizontal: RFValue(20),
      }}
    >
      {/* Header */}
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text
          style={{
            color: theme.bottomActionSheet.handleIndicatorText,
            fontFamily: "lexendGigaMedium",
            fontSize: RFValue(12),
          }}
        >
          {t("aux.changeVault.title")}
        </Text>
      </View>

      {/* List */}
      <FlashList
        data={userVaults}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: RFValue(10) }} />}
        renderScrollComponent={BottomSheetScrollable}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheetView>
  );
}
