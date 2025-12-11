import { View, ImageBackground, Text, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { useState } from "react";
import { Label, StyledInput, StyledView, styles } from "./styles";
import { palette } from "@/src/Theme/colors";
import Entypo from '@expo/vector-icons/Entypo';

export function PasswordInputText({
  label,
  placeholder,
  input,
  setInput,
  validationFun,
  error,
  setError,
  field,
  t,
}: {
  label: string;
  placeholder: string;
  validationFun: (input: string, t: any) => string;
  input: string;
  setInput: (payload: any) => void;
  error: string,
  setError: (payload: any) => void;
  field: keyof any;
  t: any,
}) {
  const theme = useTheme();
  const gradientDefault = require("@/src/assets/images/Gradient2.png");
  const gradientFocused = theme.dark ? require("@/src/assets/images/Gradient1.png") : require("@/src/assets/images/Gradient3.png")

  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const [visible, setVisible] = useState(false);
  function handleChange(text: string) {
    setInput({ field, value: text });
    if (touched) {
      setError({ field, value: validationFun(text, t) });
    }
  }

  function handleBlur() {
    setIsFocused(false);
    setTouched(true);
    setError({ field, value: validationFun(input, t) });
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
        <StyledView style={{ alignItems: "center", justifyContent: "space-around" }}>
          <StyledInput
            value={input}
            onChangeText={handleChange}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            secureTextEntry={!visible}
          />
          <TouchableOpacity style={{ padding: RFValue(9.74) }} onPress={() => { setVisible(!visible) }}>
            <Entypo name={visible ? "eye-with-line" : "eye"} size={24} color={theme.inputText.ic} />
          </TouchableOpacity>
        </StyledView>
      </ImageBackground>

      {showError && (
        <Text style={{ color: palette.error400 }}>{error}</Text>
      )}
    </View>
  );
}