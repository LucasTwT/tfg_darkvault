import Feather from "@expo/vector-icons/Feather"
import { TouchableOpacity, View } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { Shadow } from "react-native-shadow-2"
import { useTheme } from "styled-components/native"

export function CustomIconButton({icon, onPress, endColor} : {icon: string, onPress: () => void, endColor: string}) {
    const theme = useTheme()
    const styles = theme.icButtons
    return (
        <Shadow style={{backgroundColor: styles.background, borderRadius: RFValue(20)}} startColor={styles.shadowColor} endColor={endColor} distance={theme.dark ? 10 : 7} >
            <TouchableOpacity style={{padding: RFValue(10), backgroundColor: styles.background, borderRadius: RFValue(20)}} onPress={() => {onPress()}}>
                <Feather name={icon} size={RFValue(24)} color={styles.icColor}/>
            </TouchableOpacity>
        </Shadow>
    )
}