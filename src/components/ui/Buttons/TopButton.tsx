import { useAppStore } from "@/src/store/useAppStore";
import { ButtonAction, TopButtonProps } from "@/src/store/useBottomSheetTypes";
import Feather from "@expo/vector-icons/Feather";
import Foundation from "@expo/vector-icons/Foundation";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export function TopButton({ id, getHandleButtonsProps, changeBtnValue } : { id: ButtonAction, getHandleButtonsProps: (id: ButtonAction) => TopButtonProps, changeBtnValue: any }) {
    const [props, setProps] = useState<TopButtonProps | false>()
    const { actualVault } = useAppStore()
    useEffect(() => {
        setProps(getHandleButtonsProps(id))
    }, [ props, getHandleButtonsProps, id, actualVault])
    return (
        props
            ?
            <TouchableOpacity
                onPress={() => {
                    changeBtnValue(id);
                }}
                style={{
                    paddingVertical: RFValue(6),
                    paddingHorizontal: RFValue(10),
                    borderRadius: RFValue(16),
                    justifyContent: "center",
                    backgroundColor: props.bgColor,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: RFValue(5),
                }}
            >
                {props.icLeft && (
                    <Foundation
                        name={props.icLeft}
                        size={RFValue(20)}
                        color={props.txtColor}
                    />
                )}
                <Text style={{ color: props.txtColor }}>
                    {props.txt}
                </Text>
                {props.icRight && (
                    <Feather
                        name={props.icRight}
                        size={RFValue(20)}
                        color={props.txtColor}
                    />
                )}
            </TouchableOpacity>
            :
            <Text>Error</Text>
    );
}
