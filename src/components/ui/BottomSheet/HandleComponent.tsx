import { BottomSheetHandleProps } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { useBottomSheetStore } from "@/src/store/useBottomSheet";

interface HandleProps extends BottomSheetHandleProps {
    style?: StyleProp<ViewStyle>,
}

const HandleComponent: React.FC<HandleProps> = ({style}) => {
    const containerStyle = useMemo(() => [style], [style])
    const theme = useTheme()
    const { closeSheet, contentHandle, changeBtnValue } = useBottomSheetStore()
    return (
        contentHandle
        ? 
        <View style={[containerStyle, {paddingHorizontal: RFValue(30), paddingVertical: RFValue(10), flexDirection: "row", justifyContent: "space-between"}]}>
               <TouchableOpacity onPress={() => {closeSheet()}} style={{padding: RFValue(6), borderRadius: RFValue(16), justifyContent: "center", backgroundColor: theme.customHandleComponent.btnClose.background}}>
                    <Ionicons name="close-sharp" size={RFValue(25)} color={theme.customHandleComponent.btnClose.icColor}/>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => {changeBtnValue()}} style={{padding: RFValue(6), borderRadius: RFValue(16), justifyContent: "center", backgroundColor: theme.customHandleComponent.btnAction.background, flexDirection: "row", alignItems: "center", gap: RFValue(5)}}>
                    <Text style={{color: theme.customHandleComponent.btnAction.textColor}}>{contentHandle.btnTxt}</Text>
                    <Ionicons name="add" size={RFValue(25)} color={theme.customHandleComponent.btnAction.textColor}/>
               </TouchableOpacity>
        </View>
        : 
        <View>
            <Text>Error</Text>
        </View>
    )

}

export default HandleComponent