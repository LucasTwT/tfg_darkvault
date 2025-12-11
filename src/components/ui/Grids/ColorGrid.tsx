import { View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useBottomSheetScrollableCreator } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import type { UpdatePayload } from "../../../reducers/Create/useCreateVault.d"
import { Colors, Vault } from "@/src/reducers/Home/useHome.d";
import { ColorElementButton } from "./styles";
import { useRef } from "react";
import { ColorElement } from "./ColorElement";

export function ColorGrid({ data, changeVaultFields, vaultPreview } : { data: Colors[], changeVaultFields: (payload: UpdatePayload) => void, vaultPreview: Vault }) {
    const Scrollable = useRef(useBottomSheetScrollableCreator()).current;
    const selectedColor = vaultPreview.settings.colors.icColor;

    return (
        <FlashList
            renderScrollComponent={Scrollable}
            data={data}
            numColumns={5}
            keyExtractor={(item) => item}
            extraData={selectedColor}
            ItemSeparatorComponent={() => (
                <View style={{ height: RFValue(15) }} />
            )}
            renderItem={({ item }) => {
                const isSelected = selectedColor === item.icColor;

                const handlePress = () => {
                    changeVaultFields({
                        field: "settings",
                        value: {
                            icon: vaultPreview.settings.icon,
                            colors: item
                        }
                    });
                };

                return (
                    <View style={{flex: 1}}>
                        <ColorElementButton
                        isSelected={isSelected}  
                        onPress={handlePress}
                        >
                            <ColorElement color={item.icColor}/>
                        </ColorElementButton>
                    </View>
                );
            }}
        />
    );
}
