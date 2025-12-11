import { palette } from "@/src/Theme/colors";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const styles = StyleSheet.create({
  inputTextView: {
    flexDirection: 'row',
    padding: RFValue(1.39),
    justifyContent: 'center',
  },
  errorInputTextView: {
    flexDirection: 'row',
    backgroundColor: palette.error400,
    padding: RFValue(1.39),
    justifyContent: 'center',
    borderRadius: RFValue(9.74)
  },
  buttonView: {
    flexDirection: 'row',
    padding: RFValue(2),
    justifyContent: 'center',
  },
      container: {
        flexDirection: "row",
        padding: RFValue(10),
        width: "100%",
        borderWidth: 0.7,
        borderRadius: RFValue(10),
        alignItems: "center",
        gap: RFValue(20),
    },
    iconContainer: {
        padding: RFValue(6),
        borderRadius: RFValue(16),
        width: RFValue(35),
        height: RFValue(35),
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        flex: 1,
        fontFamily: "lexendGigaMedium",
        fontSize: RFValue(13),
    },
})

export const Label = styled.Text`
  color: ${({ theme }) => theme.inputText.labels};
  padding-left: 5px;
  font-size: ${RFValue(13.8)}px;
`;

export const StyledInput = styled.TextInput`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.inputText.placeholders};
  border-radius: ${RFValue(9.74)}px;
`;


export const StyledView = styled.View`
    flex: 1;
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors.background};
    border-radius: ${RFValue(9.74)}px;
`
export const LinkText = styled.Text`
    font-family: "lexendGigaMedium";
    color: ${({ theme }) => theme.link.text};
    font-size: ${RFValue(16)}px;
`

export const ButtonContent = styled.TouchableOpacity`
  margin-vertical: ${RFValue(2)}px;
  margin-horizontal: ${RFValue(2)}px;
  align-items: center;
  justify-content: center;
  background-color:  ${({ theme }) => theme.colors.background};
  border-radius: ${RFValue(9.74)}px;
`;

export const ButtonText = styled.Text`
  padding-vertical: ${RFValue(10)}px;
  padding-horizontal: ${RFValue(10)}px;
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.buttons.text};
`;