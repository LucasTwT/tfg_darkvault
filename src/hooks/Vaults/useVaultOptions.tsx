// import { CreateOrModifyVault } from "@/src/components/ui/BottomSheet/CreateVault/CreateOrModifyVault"
// import HandleComponent from "@/src/components/ui/BottomSheet/HandleComponent"
// import { FilterOption, Option, Vault } from "@/src/reducers/Home/useHome.d"
// import { useBottomSheetStore } from "@/src/store/useBottomSheet"
// import { useEffect, useMemo } from "react"
// import { useTranslation } from "react-i18next"

// export function useVaultOptions({vaultOptions, setVaultOptions, showPopOver, vault} : {vaultOptions: Option[], setVaultOptions?: (payload: {tag:  "show" | "modify" | "delete", value: boolean}) => void, showPopOver: boolean, vault: Vault}) {
//         const { contentHandle, openSheet } = useBottomSheetStore()
//         const {t} = useTranslation()
//         const snapPoints = useMemo(() => ["90%"], [])
//         useEffect(() => {
//         if (!contentHandle || !showPopOver) return
//         const option = vaultOptions.filter((opt) => opt.status === true)
//         console.log(option[0].tags)
//         if (option[0].tags === "modify") { 
//             openSheet(<CreateOrModifyVault vault={vault} />, { dynamicSizing: false, snapPoints: snapPoints, handleComponent: HandleComponent }, { btnTxt: t("modify.vault.btnTxt"), status: false })
//             setVaultOptions && setVaultOptions({tag: option[0].tags, value: false })
//         }

        
//     }, [contentHandle, showPopOver, vault, openSheet, t, snapPoints])
// }
//       // startDeleteVault().then(({response, status}) => {
//       //   if (status) {
//       //     const signature = signChallenge(response["challenge"], signingKeys.privateKey)
//       //     finishDeleteVault(signature).then(({response, status}) => {
//       //       if (!status)
//       //         openSheet(<MasterPasswordForm/>,  {handleComponent: HandleComponent}, {btnTxt: t("auth.verifyMasterPassword.btnTxt"), status: false})
//       //     })
//       //   }
//       // })

//               // hashMasterPassword(password.value, response["salt"], response["kdf_params"]).then(({ hash, salt }) => {
//         //                         const rootKey = hash.rawHash
//         //                         const vaultKey = deriveKey(rootKey, "VAULT")
//         //                         const authKey = deriveKey(rootKey, "AUTH")
//         // })