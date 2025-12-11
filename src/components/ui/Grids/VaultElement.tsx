import { Vault } from "@/src/reducers/Home/useHome.d";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import Foundation from "@expo/vector-icons/Foundation";
import Feather from "@expo/vector-icons/Feather";
import { Dispatch, SetStateAction } from "react";

export function VaultElement({ vault, showPopover, sourceRef }: { vault: Vault, showPopover: Dispatch<SetStateAction<boolean>>, sourceRef?: any }) {
    const theme = useTheme();

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
            <View>
                <TouchableOpacity
                    ref={sourceRef}
                    onPress={showPopover ? () => showPopover(true) : () => { }}
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