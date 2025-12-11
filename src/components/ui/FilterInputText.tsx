import { Component, Dispatch, RefObject, SetStateAction, useState } from "react";
import { useTheme } from "styled-components/native";
import { StyledInput, StyledView, styles } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import FilterIcon from "../svg/FilterIcon";

export function FilterInputText({placeholder, input, setInput, t, visible, showPopover, sourceRef } : { placeholder: string, input: string, setInput: Dispatch<SetStateAction<string>>, t: any, visible: boolean, showPopover: () => void, sourceRef: RefObject<Component<{}, {}, any>>}) {
  const theme = useTheme();
  const gradientDefault = require("@/src/assets/images/Gradient2.png");
  const gradientFocused = theme.dark
    ? require("@/src/assets/images/Gradient1.png")
    : require("@/src/assets/images/Gradient3.png");

  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={{ gap: RFValue(5), flex: 1 }}>
      <ImageBackground
        source={isFocused ? gradientFocused : gradientDefault}
        style={styles.inputTextView}
        imageStyle={{ borderRadius: RFValue(9.74) }}
      >
        <StyledView style={{ alignItems: "center", justifyContent: "space-around" }}>
          
          <StyledInput
            value={input}
            onChangeText={setInput}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          <TouchableOpacity
            ref={sourceRef}
            style={{ padding: RFValue(9.74) }}
            onPress={() => showPopover()}   
          >
            {visible ? (
              <Feather name="filter" size={24} color={theme.inputText.ic} />
            ) : (
              <FilterIcon dark={theme.dark} width={24} height={24} />
            )}
          </TouchableOpacity>

        </StyledView>
      </ImageBackground>
    </View>
  );
}
