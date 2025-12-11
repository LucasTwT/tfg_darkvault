import { View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export function ColorElement ({color} : {color: string}) {
    return (
        <View style={{backgroundColor: color, width: "100%", height: RFValue(45), borderRadius: RFValue(16)}}></View>
    )
}