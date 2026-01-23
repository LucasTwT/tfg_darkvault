import { View, ImageBackground, Text, KeyboardTypeOptions, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useState, useCallback } from "react";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Label, StyledView, styles } from "../../styles";
import { palette } from "@/src/Theme/colors";
import { useTheme } from "styled-components/native";
import { Validator } from "@/src/reducers/Create/useCreateLogin.d";
import Entypo from "@expo/vector-icons/Entypo";

interface CustomInputTextProps<T> {
  label: string;
  placeholder: string;
  value: string;
  field: keyof T;
  setValue: (payload: { field: keyof T; value: string }) => void;
  error: string;
  setError: (payload: { field: keyof T; value: string }) => void;
  validationFun?:  Record<keyof T, Validator>;
  t: any;
  keyboardType?: KeyboardTypeOptions;
  extraParam?: any;
  bgColor?: string;
  textColor?: string;
  icon?: string;
  changeIconState?: (payload: {newValue: boolean}) => void ;
}

export function CustomInputText<T>({
  label,
  placeholder,
  value,
  field,
  setValue,
  error,
  setError,
  validationFun,
  t,
  keyboardType,
  extraParam,
  bgColor,
  textColor,
  icon,
  changeIconState
}: CustomInputTextProps<T>) {
  const theme = useTheme();

  const gradientDefault = require("@/src/assets/images/Gradient2.png");
  const gradientFocused = theme.dark
    ? require("@/src/assets/images/Gradient1.png")
    : require("@/src/assets/images/Gradient3.png");

  const [isFocused, setIsFocused] = useState(false);

  const validate = useCallback(
    (text: string) => {
      if (!validationFun) return;
      const errorMsg = extraParam
        ? validationFun[field](text, t, extraParam)
        : validationFun[field](text, t);
      setError({ field, value: errorMsg });
    },
    [validationFun, extraParam]
  );

  const handleChange = (text: string) => {
    setValue({ field, value: text });
    validate(text);
  };

  const handleBlur = () => {
    setIsFocused(false);
    validate(value);
  };

  const showError = error.length > 0;

  return (
    <View style={{ gap: RFValue(6), width: "100%" }}>
      <Label>{label}</Label>

      <ImageBackground
        source={isFocused ? gradientFocused : gradientDefault}
        style={showError ? styles.errorInputTextView : styles.inputTextView}
        imageStyle={{  borderRadius: RFValue(9.74) }}
        
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
          value={value}
          keyboardType={keyboardType}
          placeholder={placeholder}
          onChangeText={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          style={[
            {flex: 1},
            bgColor && { backgroundColor: bgColor },
            textColor && { color: textColor}
          ]}
        />
        {icon  && changeIconState &&
        
        <TouchableOpacity
            style={{ padding: RFValue(9.74),backgroundColor: bgColor }}
            onPress={() => {
              changeIconState({newValue: true});
            }}
          >
            <Entypo
              name={icon}
              size={24}
              color={theme.inputText.ic}
            />
          </TouchableOpacity>
        }
       </StyledView>
      </ImageBackground>

      {showError && (
        <Text style={{ color: palette.error400, fontSize: RFValue(11) }}>
          {error}
        </Text>
      )}
    </View>
  );
}
