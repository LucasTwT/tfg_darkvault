import {
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { RFValue } from "react-native-responsive-fontsize";
import { CustomInputText } from "../InputText/CustomInputText";
import { useCreateLoginReducer } from "@/src/reducers/Create/useCreateLogin";
import { Logindata } from "@/src/reducers/Create/useCreateLogin.d";
import { loginValidators } from "@/src/utils/validations/Create";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components/native";
import { View } from "react-native";
import { useCreateLogin } from "@/src/hooks/Create/useCreateLogin";

export function CreateLogin() {

  const { state, setErrors, setLogindata, setKeyGenerator } = useCreateLoginReducer();
  useCreateLogin({state: state, setValue: setLogindata, setError: setErrors})
  const { t } = useTranslation();
  const theme = useTheme();
  // const { actualVault } = useAppStore()
  return (
    <BottomSheetScrollView
      contentContainerStyle={{
        padding: RFValue(40),
        gap: RFValue(20),
      }}
      keyboardShouldPersistTaps="handled"
    >

      <View style={{gap: RFValue(5)}}>
        <CustomInputText<Logindata>
        field="title"
        label={t("create.login.loginForm.titleField.label")}
        placeholder={t("create.login.loginForm.titleField.placeholder")}
        value={state.logindata.title}
        error={state.errors.title}
        setValue={setLogindata}
        setError={setErrors}
        validationFun={loginValidators}
        t={t}
        bgColor={theme.bottomActionSheet.background}
        textColor={theme.inputText.placeholders}
      />

      <CustomInputText<Logindata>
        field="email"
        label={t("create.login.loginForm.emailField.label")}
        placeholder={t("create.login.loginForm.emailField.placeholder")}
        value={state.logindata.email}
        error={state.errors.email}
        setValue={setLogindata}
        setError={setErrors}
        validationFun={loginValidators}
        t={t}
        keyboardType="email-address"
        bgColor={theme.bottomActionSheet.background}
        textColor={theme.inputText.placeholders}
      />

      <CustomInputText<Logindata>
        field="url"
        label={t("create.login.loginForm.urlField.label")}
        placeholder={t("create.login.loginForm.urlField.placeholder")}
        value={state.logindata.url}
        error={state.errors.url}
        setValue={setLogindata}
        setError={setErrors}
        validationFun={loginValidators}
        t={t}
        keyboardType="url"
        bgColor={theme.bottomActionSheet.background}
        textColor={theme.inputText.placeholders}
      />

      <CustomInputText<Logindata>
        field="note"
        label={t("create.login.loginForm.noteField.label")}
        placeholder={t("create.login.loginForm.noteField.placeholder")}
        value={state.logindata.note}
        error={state.errors.note}
        setValue={setLogindata}
        setError={setErrors}
        validationFun={loginValidators}
        t={t}
        bgColor={theme.bottomActionSheet.background}
        textColor={theme.inputText.placeholders}
        multiline
      />

      <CustomInputText<Logindata>
        field="password"
        label={t("create.login.loginForm.passwordField.label")}
        placeholder={t("create.login.loginForm.passwordField.placeholder")}
        value={state.logindata.password}
        error={state.errors.password}
        setValue={setLogindata}
        setError={setErrors}
        validationFun={loginValidators}
        t={t}
        secureTextEntry
        bgColor={theme.bottomActionSheet.background}
        textColor={theme.inputText.placeholders}
        icon="key"
        changeIconState={setKeyGenerator}
      />
      </View>
    </BottomSheetScrollView>
  );
}
