import { View, ImageBackground, Text, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useState } from "react";
import { Label, StyledView, styles } from "../../styles";
import { palette } from "@/src/Theme/colors";
import { useTheme } from "styled-components/native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

import Entypo from "@expo/vector-icons/Entypo";

export function PasswordField({
  label,
  placeholder,
  input,
  setInput,
  error,
  field,
  t,
  bgColor,
}: {
  label: string;
  placeholder: string;
  input: string;
  setInput: (payload: any) => void;
  error: string;
  field: keyof any;
  t: any;
  bgColor?: string;
}) {
  const theme = useTheme();
  const gradientDefault = require("@/src/assets/images/Gradient2.png");
  const gradientFocused = theme.dark
    ? require("@/src/assets/images/Gradient1.png")
    : require("@/src/assets/images/Gradient3.png");

  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const [visible, setVisible] = useState(false);
  function handleChange(text: string) {
    setInput({ field, value: text });
  }

  function handleBlur() {
    setIsFocused(false);
    setTouched(true);
  }

  const showError = touched && error !== "";

  const containerStyle = showError
    ? styles.errorInputTextView
    : styles.inputTextView;

  return (
    <View style={{ gap: RFValue(5), width: "100%" }}>
      <Label>{label}</Label>

      <ImageBackground
        source={isFocused ? gradientFocused : gradientDefault}
        style={containerStyle}
        imageStyle={{ borderRadius: RFValue(9.74) }}
      >
        <StyledView
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            borderRadius: RFValue(9.74),
            padding: RFValue(3),
            backgroundColor: bgColor,
          }}
        >
          <BottomSheetTextInput
            value={input}
            onChangeText={handleChange}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            secureTextEntry={!visible}
            style={
              bgColor ? { flex: 1, color: theme.inputText.placeholders } : {}
            }
          />
          <TouchableOpacity
            style={{ padding: RFValue(9.74), backgroundColor: bgColor }}
            onPress={() => {
              setVisible(!visible);
            }}
          >
            <Entypo
              name={visible ? "eye-with-line" : "eye"}
              size={24}
              color={theme.inputText.ic}
            />
          </TouchableOpacity>
        </StyledView>
      </ImageBackground>

      {showError && <Text style={{ color: palette.error400 }}>{error}</Text>}
    </View>
  );
}