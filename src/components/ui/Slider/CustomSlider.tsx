import { UpdatePayload } from "@/src/reducers/Create/useGenerateKey.d";
import Slider from "@react-native-community/slider";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
interface Props {
  txt: string;
  type: any;
  value: number;
  setValue: (payload: UpdatePayload) => void;
  minVal: number,
  maxVal: number
}
export function CustomSlider({ txt, type, value, setValue, minVal, maxVal } : Props) {
    const theme = useTheme()
    return (
    <GestureHandlerRootView>
        <View       style={{
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
      }}>
<Text style={{ color: theme.switchButton.text,
          fontSize: RFValue(16),
          fontFamily: "lexendMedium",}}>{txt}</Text>
      <Slider
      style={{flex: 1}}
        value={value}
        minimumValue={minVal}
        maximumValue={maxVal}
        step={1}
        onValueChange={(v) =>
          setValue({ field: type, value: v })
        }
        minimumTrackTintColor="#9B4DFF"
        maximumTrackTintColor="#3A245C"
        thumbTintColor="#FFF"
      />
        </View>
    </GestureHandlerRootView>
  );
}