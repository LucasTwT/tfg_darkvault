import Feather from "@expo/vector-icons/Feather"
import { ImageBackground, TouchableOpacity } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"
import { useTheme } from "styled-components/native"


export function ButtonTabBar({ icon, onPress, isFocused } : {icon: string,  onPress: () => void, isFocused: boolean}) {
    const theme = useTheme()
    const dark =  isFocused ? require("@/src/assets/images/ButtonBackgroundBlackFocused.png") : require("@/src/assets/images/ButtonBackgroundBlack.png")
    const light = isFocused ? require("@/src/assets/images/ButtonBackgroundWhiteFocused.png") : require("@/src/assets/images/ButtonBackgroundWhite.png")
    return (
        <ImageBackground source={theme.dark ? dark : light}
      resizeMode='contain'  
    style={{
        borderRadius: RFValue(20),
        flexDirection: 'row',
        alignItems: 'center',
        }}
        imageStyle={{ borderRadius: RFValue(9.74) }}>
            <TouchableOpacity
          onPress={() => onPress() }
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: RFValue(10),
            borderRadius: RFValue(20),
          }}
        >
          <Feather name={icon} size={24} color={theme.bottomTabBar.buttons.ic} />
        </TouchableOpacity>
        </ImageBackground>
    )
}