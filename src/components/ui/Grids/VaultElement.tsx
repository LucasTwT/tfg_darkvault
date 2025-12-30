import { Vault } from "@/src/reducers/Home/useHome.d";
import { InteractionManager, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import Foundation from "@expo/vector-icons/Foundation";
import Feather from "@expo/vector-icons/Feather";
import { useRef } from "react";
import { usePopoverStore } from "@/src/store/usePopoverStore";

export function VaultElement({ vault }: { vault: Vault }) {
    const theme = useTheme();
    const popOverRef = useRef<View>(null)
    const { setAnchorRef, changeVisible, setSelectedVault } = usePopoverStore()
    return ( 
        <View
            style={[
                styles.container,
                {
                    borderColor: theme.grid.element.borderColor,
                },
            ]}
        >
            <View
                style={[
                    styles.iconContainer,
                    { backgroundColor: vault.settings.colors.bgColor },
                ]}
            >
                <Foundation
                    color={vault.settings.colors.icColor}
                    name={vault.settings.icon}
                    size={RFValue(24)}
                />
            </View>

            <Text
                style={[
                    styles.text,
                    { color: theme.grid.textColor },
                ]}
                numberOfLines={1}
            >
                {vault.name}
            </Text>
            <View ref={popOverRef}>
                <TouchableOpacity
                    onPress={() => {
                        setSelectedVault(vault)
                        setAnchorRef(popOverRef)
                        InteractionManager.runAfterInteractions(() => {
                        changeVisible(true)
                        })

                    }}
                >
                    <Feather
                        color={theme.grid.element.icColor}
                        name="settings"
                        size={RFValue(24)}
                    />
                </TouchableOpacity>

            </View>

        </View>
    );
}