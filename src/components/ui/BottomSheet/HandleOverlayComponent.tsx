import { BottomSheetHandleProps } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { useOverlaySheetStore } from "@/src/store/useOverLaySheet";

interface HandleProps extends BottomSheetHandleProps {
    style?: StyleProp<ViewStyle>,
}

const HandleOverlayComponent: React.FC<HandleProps> = ({style}) => {
    const containerStyle = useMemo(() => [style], [style])
    const theme = useTheme()
    const { closeOverlay, contentHandle, changeBtnValue,  getHandleButtonsProps } = useOverlaySheetStore()
    return (
        contentHandle
        ? 
        <View style={[containerStyle, {paddingHorizontal: RFValue(30), paddingVertical: RFValue(10), flexDirection: "row", justifyContent: "space-between"}]}>
            <TouchableOpacity onPress={() => {closeOverlay()}} style={{padding: RFValue(6), borderRadius: RFValue(16), justifyContent: "center", backgroundColor: theme.customHandleComponent.btnClose.background}}>
                <Ionicons name="close-sharp" size={RFValue(20)} color={theme.customHandleComponent.btnClose.icColor}/>
            </TouchableOpacity>
            <View style={{flexDirection: "row", gap: RFValue(10)}}>
                {
             contentHandle.buttons.map((btn) => {
                const Content = btn.content;
                return <Content key={btn.action} id={btn.action} getHandleButtonsProps={getHandleButtonsProps} changeBtnValue={changeBtnValue}/>;
                })
            }
            </View>

        </View>
        :
        <View>
            <Text>Error</Text>
        </View>
    )

}

export default HandleOverlayComponent