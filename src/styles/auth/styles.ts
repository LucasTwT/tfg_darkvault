import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const MainView = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    justify-content: center;
    flex-direction: column;
    padding: ${RFValue(36)}px;
  `

export const TextTitle = styled.Text`
    font-family: "lexendGigaMedium";
    color: ${({ theme }) => theme.colors.textTitle};
    font-size: ${RFValue(22.64)}px;
  `

export const FormContainer = styled.View`
  align-items: "center";
  gap: ${RFValue(20)}px;
  padding: ${RFValue(25)}px;
  `

export const CustomScrollView = styled.ScrollView`
  border-radius: ${RFValue(10)}px;
  background-color: ${({ theme }) => theme.form.background};
  border-color:  ${({ theme }) => theme.form.border};
  border-width: ${RFValue(2)}px;
  `

export const ViewContainer = styled.View`
  border-radius: ${RFValue(10)}px;
  background-color: ${({ theme }) => theme.form.background};
  border-color:  ${({ theme }) => theme.form.border};
  border-width: ${RFValue(2)}px;
  `