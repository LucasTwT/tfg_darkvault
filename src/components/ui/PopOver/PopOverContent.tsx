import { FilterOption, Vault } from "@/src/reducers/Home/useHome.d";
import { useBottomSheetStore } from "@/src/store/useBottomSheet";
import Feather from "@expo/vector-icons/Feather";
import {Text, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { CreateOrModifyVault } from "../BottomSheet/CreateVault/CreateOrModifyVault";
import { Dispatch, SetStateAction, useMemo } from "react";
import HandleComponent from "../BottomSheet/HandleComponent";

export function PopOverContent ({filterOptions, setFilterOptions, vault, setShowPopover} : {filterOptions: FilterOption[], setFilterOptions: (payload: number) => void, vault?: Vault, setShowPopover?: Dispatch<SetStateAction<boolean>>}) {
  const theme = useTheme()
  const { openSheet } = useBottomSheetStore()
  const snapPoints = useMemo(() => ["90%"], [])
  const handlePress = ({idx, action} : {idx: number, action: "show" | "modify" | "delete"}) => {
    setFilterOptions(idx)
    if (action === "modify") openSheet(<CreateOrModifyVault vault={vault} />, {dynamicSizing: false, snapPoints: snapPoints, handleComponent: HandleComponent}, {btnTxt: "Update vault", status: false}) 
    if (setShowPopover) setShowPopover(false)
    }
    return (
        <View style={{width: "100%", borderRadius: RFValue(15), gap: RFValue(10), padding: RFValue(5), backgroundColor: theme.popOver.background, borderWidth: .5, borderColor: theme.popOver.borderColor}}>
          {filterOptions.map((filter, idx) => (
            filter.status ? 
          <TouchableOpacity key={idx} style={{padding: RFValue(5), flex: 1, gap: RFValue(10), flexDirection: "row", paddingRight: RFValue(20), alignItems: "center", borderRadius: RFValue(15), backgroundColor: theme.popOver.itemBackgroundSelected}} onPress={() => {handlePress({idx: idx, action: filter.tags})}}>
              <Feather name="check" size={RFValue(15)} color={theme.popOver.ic}/>
              <Text style={{color: theme.popOver.text, fontSize: RFValue(15)}}>{filter.name}</Text>
          </TouchableOpacity>
          :
           <TouchableOpacity key={idx} style={{padding: RFValue(5), flex: 1, gap: RFValue(10), flexDirection: "row", paddingRight: RFValue(20), alignItems: "center", borderRadius: RFValue(15)}}  onPress={() => {handlePress({idx: idx, action: filter.tags})}}>
            <Text style={{color: theme.popOver.text, fontSize: RFValue(15)}}>{filter.name}</Text>
          </TouchableOpacity>
          ))}
        </View>
    )
}