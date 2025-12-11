import { View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { IconElement } from "./IconElement";
import { useBottomSheetScrollableCreator } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import type { UpdatePayload } from "../../../reducers/Create/useCreateVault.d"
import { Vault } from "@/src/reducers/Home/useHome.d";
import { IconElementButton } from "./styles";
import { useRef } from "react";

export function ItemGrid({ data, changeVaultFields, vaultPreview } : { data: string[], changeVaultFields: (payload: UpdatePayload) => void, vaultPreview: Vault }) {
    const Scrollable = useRef(useBottomSheetScrollableCreator()).current;

    const selectedIcon = vaultPreview.settings.icon;

    return (
        <FlashList
            renderScrollComponent={Scrollable}
            data={data}
            numColumns={5}
            keyExtractor={(item) => item}
            extraData={selectedIcon}
            ItemSeparatorComponent={() => (
                <View style={{ height: RFValue(15) }} />
            )}
            renderItem={({ item }) => {
                const isSelected = selectedIcon === item;

                const handlePress = () => {
                    changeVaultFields({
                        field: "settings",
                        value: {
                            icon: item,
                            colors: vaultPreview.settings.colors
                        }
                    });
                };

                return (
                    <View style={{flex: 1}}>
                        <IconElementButton
                        isSelected={isSelected}  
                        onPress={handlePress}
                    >
                        <IconElement name={item} />
                    </IconElementButton>
                    </View>
                );
            }}
        />
    );
}
