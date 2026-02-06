import { useState } from "react";
import { ImageBackground } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { ButtonContent, ButtonText } from "../styles";

export function CustomButton({ text, pressed, setPressed, bgColor }: { text: string, pressed: boolean, setPressed: (state: boolean) => void, bgColor?: string }) {
  const theme = useTheme()
  const gradient = theme.dark ? require("@/src/assets/images/Gradient1.png") : require("@/src/assets/images/Gradient3.png")
  const [isFocused, setIsFocused] = useState(false);
  return (
    <ImageBackground
      source={gradient}
      imageStyle={{ borderRadius: RFValue(9.74) }}
      style={{
        borderRadius: RFValue(9.74),
        overflow: "hidden",
        alignSelf: "flex-start",
      }}
    >
      <ButtonContent
        onPressIn={() => setIsFocused(true)}
        onPressOut={() => setIsFocused(false)}
        onPress={() => { setPressed(!pressed) }}
        style={isFocused ? { backgroundColor: "rgba(0,0,0,0)" } : bgColor && {backgroundColor: bgColor}}
        activeOpacity={.5}
      >
        <ButtonText style={isFocused ? { color: 'white', fontWeight: "900" } : {}}>{text}</ButtonText>
      </ButtonContent>
    </ImageBackground>
  );
}
