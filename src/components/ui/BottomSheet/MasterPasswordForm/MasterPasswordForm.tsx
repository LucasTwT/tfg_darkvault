import { TextTitle } from "@/src/styles/auth/styles";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { PasswordField } from "../InputText/PasswordField";
import { useMasterPassword } from "@/src/hooks/Auth/useMasterPassword";
import { ActivityIndicator, Image, View } from "react-native";
import { CustomButton } from "../../Buttons/CustomButton";
// import { useDeleteVault } from "@/src/hooks/Delete/useDeleteVault";

export function MasterPasswordForm() {
  const [masterPassword, setMasterPassword] = useState<MasterPassword>({
    field: "password",
    value: "",
  });
  const [pressed, setPressed] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState("");
  const theme = useTheme();
  const { t } = useTranslation();
  const url = theme.dark
    ? require("@/src/assets/images/iconBlackBackground5.png")
    : require("@/src/assets/images/iconWhiteBackground.png");
  useMasterPassword({ password: masterPassword, setError: setError, pressed: pressed, setLoading: setLoading });
  useEffect(() => console.log(pressed, loading), [pressed, loading])
  return (
    <BottomSheetView
      style={{ flex: 1, padding: RFValue(40), gap: RFValue(20), justifyContent: "center", height: "100%" }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderRadius: RFValue(10),
            backgroundColor: theme.form.background,
            gap: RFValue(30),
            borderColor: theme.form.border,
            borderWidth: RFValue(2),
            alignItems: "center",
            width: "100%",
            padding: RFValue(25),
          }}
        >
          <View style={{ width: "100%", height: RFValue(90) }}>
            <Image
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
              source={url}
            />
          </View>
          <TextTitle style={{ textAlign: "center" }}>
            {t("auth.lockGate.title")}
          </TextTitle>
          <PasswordField
            bgColor={theme.bottomActionSheet.background}
            label={t("auth.lockGate.masterPasswordField.label")}
            placeholder={t("auth.lockGate.masterPasswordField.placeholder")}
            input={masterPassword.value}
            setInput={(payload: MasterPassword) =>
              setMasterPassword({ field: payload.field, value: payload.value })
            }
            error={error}
            field={"password"}
            t={t}
          /><View style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
             <CustomButton text="desencriptar" pressed setPressed={ () => {setPressed(!pressed)}} bgColor={theme.buttons.background}/>
              </View>
                {loading && <ActivityIndicator size="large" color={theme.colors.spinner} />}
        </View>
      </View>
    </BottomSheetView>
  );
}