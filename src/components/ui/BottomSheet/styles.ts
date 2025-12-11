import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ActionName = styled.Text`
    color: ${({ theme }) => theme.bottomActionSheet.actionName};
    font-family: "lexendGigaMedium";
     font-size: ${RFValue(13)}px;
`

export const Description = styled.Text`
    color: ${({ theme }) => theme.bottomActionSheet.description};
    font-family: "lexendGigaMedium";
     font-size: ${RFValue(12)}px;
`

export const ElementView = styled.View`
    width: 100%;
    padding: ${RFValue(10)}px;
    flex-direction: row;
    align-items: center;
    border-bottom-color: ${({ theme }) => theme.bottomActionSheet.borderBottom};
    border-bottom-width: ${RFValue(1)}px;
    gap: ${RFValue(30)}px;
`