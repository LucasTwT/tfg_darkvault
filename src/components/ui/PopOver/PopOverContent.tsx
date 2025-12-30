import { FilterOption } from "@/src/reducers/Home/useHome.d";
import { useBottomSheetStore } from "@/src/store/useBottomSheet";
import Feather from "@expo/vector-icons/Feather";
import { InteractionManager, Text, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { CreateOrModifyVault } from "../BottomSheet/CreateVault/CreateOrModifyVault";
import { useMemo } from "react";
import HandleComponent from "../BottomSheet/HandleComponent";
import { MasterPasswordForm } from "../BottomSheet/MasterPasswordForm/MasterPasswordForm";
import { finishDeleteVault, startDeleteVault } from "@/src/services/api/Vault/deleteVault";
import { signChallenge } from "@/src/services/crypto/functions/hash";
import { usePopoverStore } from "@/src/store/usePopoverStore";

export function PopOverContent({ filterOptions, setFilterOptions } : { filterOptions: FilterOption[], setFilterOptions: (payload: number) => void }) {
  const theme = useTheme()
  const { openSheet, closeSheet } = useBottomSheetStore()
  const snapPoints = useMemo(() => ["90%"], [])
  const { changeVisible, selectedVault, setAnchorRef, setSelectedVault } = usePopoverStore()
  const handlePress = ({ idx, action } : { idx: number, action: "show" | "modify" | "delete" }) => {
    setFilterOptions(idx)

    changeVisible(false)
//     InteractionManager.runAfterInteractions(() => {
// requestAnimationFrame(() => {
//     requestAnimationFrame(() => {
//   setAnchorRef(null)
//       setSelectedVault(null)
//     })    

//     })
//     })
    

    if (!selectedVault) return
    if (action === "modify") openSheet(<CreateOrModifyVault vault={selectedVault} />, { dynamicSizing: false, snapPoints: snapPoints, handleComponent: HandleComponent }, { btnTxt: "Update vault", status: false })
    if (action === "delete") {
      startDeleteVault().then(({ response, status }) => {
        if (!status) console.log("Error 1")
        const signature = signChallenge(response["challenge"])
        if (signature) {
          console.log("Hay key")
          closeSheet()
          finishDeleteVault(signature, selectedVault.id).then(({ status }) => {
          if (!status) {
            console.log("Error en la request finish")
            openSheet(<MasterPasswordForm challenge={response["challenge"]} salt={response["salt"]} kdfParams={response["kdf_params"]} vaultId={selectedVault.id} />, { handleComponent: HandleComponent }, { btnTxt: "Delete vault", status: false })
            
          }
        })}
        else {
          console.log("No hay private key guardada")
          openSheet(<MasterPasswordForm challenge={response["challenge"]} salt={response["salt"]} kdfParams={response["kdf_params"]} vaultId={selectedVault.id} />, { handleComponent: HandleComponent }, { btnTxt: "Delete vault", status: false })
        }
      })
    }
  }
  return (
    <View style={{ width: "100%", borderRadius: RFValue(15), gap: RFValue(10), padding: RFValue(5), backgroundColor: theme.popOver.background, borderWidth: .5, borderColor: theme.popOver.borderColor }}>
      {filterOptions.map((filter, idx) => (
        filter.status ?
          <TouchableOpacity key={idx} style={{ padding: RFValue(5), flex: 1, gap: RFValue(10), flexDirection: "row", paddingRight: RFValue(20), alignItems: "center", borderRadius: RFValue(15), backgroundColor: theme.popOver.itemBackgroundSelected }} onPress={() => { handlePress({ idx: idx, action: filter.tags }) }}>
            <Feather name="check" size={RFValue(15)} color={theme.popOver.ic} />
            <Text style={{ color: theme.popOver.text, fontSize: RFValue(15) }}>{filter.name}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity key={idx} style={{ padding: RFValue(5), flex: 1, gap: RFValue(10), flexDirection: "row", paddingRight: RFValue(20), alignItems: "center", borderRadius: RFValue(15) }} onPress={() => { handlePress({ idx: idx, action: filter.tags }) }}>
            <Text style={{ color: theme.popOver.text, fontSize: RFValue(15) }}>{filter.name}</Text>
          </TouchableOpacity>
      ))}
    </View>
  )
}