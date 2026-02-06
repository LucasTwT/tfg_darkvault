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
import {
  finishDeleteVault,
  startDeleteVault,
} from "@/src/services/api/Vault/deleteVault";
import { signChallenge } from "@/src/services/crypto/functions/hash";
import { usePopoverStore } from "@/src/store/usePopoverStore";
import { useTranslation } from "react-i18next";
import { TopButton } from "../Buttons/TopButton";

export function PopOverContent({
  filterOptions,
  setFilterOptions,
}: {
  filterOptions: FilterOption[];
  setFilterOptions: (payload: number) => void;
}) {
  const theme = useTheme();
  const { openSheet, closeSheet } = useBottomSheetStore();
  const { t } = useTranslation();
  const snapPoints = useMemo(() => ["90%"], []);
  const { changeVisible, selectedVault } = usePopoverStore();

  const handlePress = ({
    idx,
    action,
  }: {
    idx: number;
    action: "show" | "modify" | "delete";
  }) => {
    setFilterOptions(idx);
    changeVisible(false);

    if (!selectedVault) return;

    if (action === "modify") {
      openSheet(
        <CreateOrModifyVault vault={selectedVault} />,
        {
          dynamicSizing: false,
          snapPoints,
          handleComponent: HandleComponent,
          enablePanDownToClose: true,
          enableContentPanningGesture: true,
        },
        {
          buttons: [
            {
              content: TopButton,
              action: "modify",
              props: {
                txt: t("modify.vault.btnTxt"),
                txtColor: theme.customHandleComponent.btnAction.textColor,
                bgColor: theme.customHandleComponent.btnAction.background,
                icRight: "plus",
              },
              status: false,
            },
          ],
        }
      );
    }

    if (action === "delete") {
      startDeleteVault().then(({ response, status }) => {
        if (!status) {
          console.log("Error 1");
          return;
        }

        const signature = signChallenge(response.challenge);

        if (signature) {
          closeSheet();

          finishDeleteVault(signature, selectedVault.id).then(({ status }) => {
            // if (!status) {
            //   openSheet(
            //     <MasterPasswordForm
            //       challenge={response.challenge}
            //       salt={response.salt}
            //       kdfParams={response.kdf_params}
            //       vaultId={selectedVault.id}
            //     />,
            //     {
            //       dynamicSizing: false,
            //       snapPoints,
            //       handleComponent: HandleComponent,
            //     },
            //     {
            //       buttons: [
            //         {
            //           content: TopButton,
            //           action: "add",
            //           props: {
            //             txt: t("create.login.btnTxt"),
            //             txtColor:
            //               theme.customHandleComponent.btnAction.textColor,
            //             bgColor:
            //               theme.customHandleComponent.btnAction.background,
            //             icRight: "plus",
            //           },
            //           status: false,
            //         },
            //       ],
            //     }
            //   );
            // }
          });
        } else {
          // openSheet(
          //   <MasterPasswordForm
          //     challenge={response.challenge}
          //     salt={response.salt}
          //     kdfParams={response.kdf_params}
          //     vaultId={selectedVault.id}
          //   />,
          //   {
          //     handleComponent: HandleComponent,
          //   },
          //   {
          //      buttons: [
          //           {
          //             content: TopButton,
          //             action: "add",
          //             props: {
          //               txt: t("create.login.btnTxt"),
          //               txtColor:
          //                 theme.customHandleComponent.btnAction.textColor,
          //               bgColor:
          //                 theme.customHandleComponent.btnAction.background,
          //               icRight: "plus",
          //             },
          //             status: false,
          //           },
          //         ],
          //   }
          // );
        }
      });
    }
  };

  return (
    <View
      style={{
        width: "100%",
        borderRadius: RFValue(15),
        gap: RFValue(10),
        padding: RFValue(5),
        backgroundColor: theme.popOver.background,
        borderWidth: 0.5,
        borderColor: theme.popOver.borderColor,
      }}
    >
      {filterOptions.map((filter, idx) => (
        <TouchableOpacity
          key={idx}
          style={{
            padding: RFValue(5),
            flex: 1,
            gap: RFValue(10),
            flexDirection: "row",
            paddingRight: RFValue(20),
            alignItems: "center",
            borderRadius: RFValue(15),
            backgroundColor: filter.status
              ? theme.popOver.itemBackgroundSelected
              : undefined,
          }}
          onPress={() =>
            handlePress({ idx, action: filter.tags })
          }
        >
          {filter.status && (
            <Feather
              name="check"
              size={RFValue(15)}
              color={theme.popOver.ic}
            />
          )}
          <Text
            style={{
              color: theme.popOver.text,
              fontSize: RFValue(15),
            }}
          >
            {filter.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
