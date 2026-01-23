import { UpdatePayload } from "@/src/reducers/Create/useGenerateKey.d";
import { Switch, Text, View, Pressable } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";

interface Props {
  txt: string;
  type: any;
  value: boolean;
  setValue: (payload: UpdatePayload) => void;
}

export function CustomSwitch({ txt, type, value, setValue }: Props) {
  const theme = useTheme();

  const toggle = () => {
    setValue({ field: type, value: !value });
  };

  return (
    <Pressable
      onPress={toggle}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: RFValue(7),
        paddingHorizontal: RFValue(18),
        borderRadius: RFValue(14),
        borderTopColor: theme.bottomActionSheet.borderBottom,
        borderTopWidth: .25,
        borderBottomWidth: .25, 
        borderBottomColor: theme.bottomActionSheet.borderBottom,
      }}
    >
      <Text
        style={{
          color: theme.switchButton.text,
          fontSize: RFValue(16),
          fontFamily: "lexendMedium",
        }}
      >
        {txt}
      </Text>

      <Switch
        value={value}
        onValueChange={toggle}
        trackColor={{ false: "#3A245C", true: "#9B4DFF" }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#3A245C"
      />
    </Pressable>
  );
}
