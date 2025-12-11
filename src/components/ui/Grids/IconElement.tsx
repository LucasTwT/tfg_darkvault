import Foundation from '@expo/vector-icons/Foundation';
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";

export function IconElement ({name} : {name: string}) {
    const theme = useTheme()
    return (
            <Foundation name={name} size={RFValue(30)} color={theme.itemGrid.icColor}/>
    )
}