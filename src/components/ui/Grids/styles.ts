import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";


export const IconElementButton = styled.TouchableOpacity<{ isSelected: boolean }>`
    padding: ${RFValue(2)}px;
    background-color: ${({theme}) => theme.itemGrid.background};
    border-radius: ${RFValue(16)}px;
    border-width: ${({ isSelected }) => (isSelected ? RFValue(.5) : 0)}px;
    border-color: ${({ theme }) => theme.itemGrid.borderColor};
    justify-content: center; 
    align-items: center;
`;


export const ColorElementButton = styled.TouchableOpacity<{isSelected: boolean}>`
    margin: ${RFValue(5)}px;
    border-radius: ${RFValue(16)}px;
    border-width: ${({ isSelected }) => (isSelected ? RFValue(.5) : 0)}px;
    border-color: ${({ theme }) => theme.itemGrid.borderColor};
`