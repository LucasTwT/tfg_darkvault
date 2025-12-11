import { View, ImageBackground, Text, KeyboardTypeOptions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useState } from "react";
import { Label, StyledInput, styles } from "./styles";
import { palette } from "@/src/Theme/colors";
import { useTheme } from "styled-components/native";

export function CustomInputText({
  label,
  placeholder,
  input,
  setInput,
  validationFun,
  error,
  setError,
  field,
  t,
  keyboardType,
  adittionalParam,
  bgColor,
}: {
  label: string;
  placeholder: string;
  validationFun?: (input: string, t: any, adittionalParam?: any) => string;
  input: string;
  setInput: (payload: any) => void;
  error: string,
  setError: (payload: any) => void;
  field: keyof any;
  t: any;
  keyboardType: KeyboardTypeOptions | undefined,
  adittionalParam?: any,
  bgColor?: string,
}) {
  const theme = useTheme()
  const gradientDefault = require("@/src/assets/images/Gradient2.png")
  const gradientFocused = theme.dark ? require("@/src/assets/images/Gradient1.png") : require("@/src/assets/images/Gradient3.png")
  const [isFocused, setIsFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  function handleChange(text: string) {
    setInput({ field, value: text });
    if (touched && validationFun) {
      setError({ field, value: adittionalParam ? validationFun(input, t, adittionalParam) : validationFun(input, t) });
    }
  }

  function handleBlur() {
    setIsFocused(false);
    setTouched(true);
    validationFun && setError({ field, value: adittionalParam ? validationFun(input, t, adittionalParam) : validationFun(input, t) });
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
        <StyledInput
          value={input}
          keyboardType={keyboardType}
          onChangeText={handleChange}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          style={bgColor ? {backgroundColor: bgColor} : {}}
        />
      </ImageBackground>

      {showError && (
        <Text style={{ color: palette.error400 }}>{error}</Text>
      )}
    </View>
  );
}
