import { CustomButton } from "@/src/components/ui/Buttons/CustomButton";
import { CustomInputText } from "@/src/components/ui/CustomInputText";
import { CustomLink } from "@/src/components/ui/CustomLink";
import { PasswordInputText } from "@/src/components/ui/PasswordInputText";
import { useRegisterReducer } from "@/src/reducers/Auth/useRegister";
import { validateEmail, validatePassword, validateUsername } from "@/src/utils/validations/Register";
import { useState } from "react";
import { View, Image, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { MainView, CustomScrollView, TextTitle, FormContainer } from "../../styles/auth/styles";
import { useGlobalStore } from "@/src/store/globalStore";
import { useCreateUser } from "@/src/hooks/Auth/useCreateUser";
import { useTranslation } from 'react-i18next';
import { useAlert } from "@/src/hooks/useAlert";
import { router } from "expo-router";
import { useTheme } from "styled-components/native";

export default function Register() {

  const {state, setUserdata, setErrors, setRequestError } = useRegisterReducer()
  const [pressed, setPressed] = useState(false)

  const { settings, updateAccessToken, updateAuthKey, updateRefreshToken } = useGlobalStore()
  const theme = useTheme()
  const imgUrl = theme.dark ?  require("@/src/assets/images/iconBlackBackground5.png") : require("@/src/assets/images/iconWhiteBackground.png")
  useCreateUser(state, settings, pressed, setPressed, setRequestError, updateAccessToken, updateAuthKey, updateRefreshToken)
  const { t } = useTranslation()
  useAlert({title: state.requestError.title, msg: state.requestError.msg, 
    buttons: [{text: t("auth.register.requestErrors.error409.opc1"), style: "cancel"}, 
    {text: t("auth.register.requestErrors.error409.opc2"), style: "cancel", onPress: () => router.push("/(Auth)/Register")}], 
    input: state.requestError, validationFun: setRequestError})

  return (
    <MainView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <View style={{ flex: 1, gap: RFValue(25) }}>
        <View style={{ width: "100%", height: RFValue(90) }}>
          <Image style={{ width: "100%", height: "100%", objectFit: 'contain' }} source={imgUrl} />
        </View>
        <View style={{ alignItems: "center", width: "100%" }}>
          <TextTitle style={{ textAlign: "center", letterSpacing: 1 }}>{t('auth.register.title')}</TextTitle>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <CustomScrollView keyboardShouldPersistTaps="handled"  contentContainerStyle={{ paddingBottom: RFValue(80) }}>
            <FormContainer >
              <CustomInputText label={t('auth.register.usernameField.label')} placeholder={t('auth.register.usernameField.placeholder')} setInput={setUserdata} input={state.userdata.username} validationFun={validateUsername} setError={setErrors} error={state.errors.username} field="username" t={t} keyboardType="default"/>
              <CustomInputText label={t('auth.register.emailField.label')} placeholder={t('auth.register.emailField.placeholder')} setInput={setUserdata} input={state.userdata.email} validationFun={validateEmail} setError={setErrors} error={state.errors.email} field="email" t={t} keyboardType="email-address"/>
              <PasswordInputText label={t('auth.register.passwordField.label')} placeholder={t('auth.register.passwordField.placeholder')} setInput={setUserdata} input={state.userdata.password} validationFun={validatePassword} setError={setErrors} error={state.errors.password} field="password" t={t}/>
              <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
                <CustomButton text={t('auth.register.btnCreateUser')} pressed={pressed} setPressed={setPressed} />
              </View>
            </FormContainer>
          </CustomScrollView>
        </TouchableWithoutFeedback>
        <CustomLink text={t('auth.register.linkToLogin')} href="./Login/" />
      </View>
    </MainView>
  )
}