import { PasswordType } from "@/src/reducers/Create/useGenerateKey.d";
import Entypo from "@expo/vector-icons/Entypo";
import { Text, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";

export function PasswordTypeSelector({
  type,
  onToggle,
}: {
  type: PasswordType;
  onToggle: () => void;
}) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onToggle}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: RFValue(18),
        paddingVertical: RFValue(14),
        borderRadius: RFValue(14),
        backgroundColor: theme.colors.surface,
      }}
    >
      <Text style={{ color: theme.switchButton.text }}>Type</Text>

      <View
        style={{ flexDirection: "row", alignItems: "center", gap: RFValue(6) }}
      >
        <Text style={{ color: theme.switchButton.text }}>{type}</Text>
        <Entypo
          name="triangle-down"
          size={RFValue(12)}
          color={theme.switchButton.text}
        />
      </View>
    </TouchableOpacity>
  );
}
