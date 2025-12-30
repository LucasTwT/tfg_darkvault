import { CustomButton } from "@/src/components/ui/Buttons/CustomButton";
import { CustomInputText } from "@/src/components/ui/CustomInputText";
import { CustomLink } from "@/src/components/ui/CustomLink";
import { PasswordInputText } from "@/src/components/ui/PasswordInputText";
import { useEffect, useState } from "react";
import { View, Image, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { MainView, TextTitle, FormContainer, ViewContainer } from "../../styles/auth/styles";
import { useTranslation } from 'react-i18next';
import { useAlert } from "@/src/hooks/useAlert";
import { router, useLocalSearchParams } from "expo-router";
import { useLoginReducer } from "@/src/reducers/Auth/useLogin";
import { validateIdentifier, validatePassword } from "@/src/utils/validations/Login";
import { useLoginUser } from "@/src/hooks/Auth/useLogin";
import { useTheme } from "styled-components/native";

export default function Login() {
  const { email } = useLocalSearchParams();
  const { state, setUserdata, setErrors, setRequestError } = useLoginReducer()
  const [pressed, setPressed] = useState(false)
  const theme = useTheme()
  const imgUrl = theme.dark ? require("@/src/assets/images/iconBlackBackground5.png") : require("@/src/assets/images/iconWhiteBackground.png")
  useLoginUser(state, pressed, setPressed, setRequestError)
  const { t } = useTranslation()

  useEffect(() => {
    if (email)
      setUserdata({ field: "identifier", value: email.toString() })
  }, [])

  useAlert({
    title: state.requestError.title, msg: state.requestError.msg,
    buttons: [{ text: t("auth.login.requestErrors.error409.opc1"), style: "cancel" },
    { text: t("auth.login.requestErrors.error409.opc2"), style: "cancel", onPress: () => router.push("/(Auth)/Register") }],
    input: state.requestError, validationFun: setRequestError
  })

  return (
    <MainView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <View style={{ flex: 1, gap: RFValue(25) }}>
        <View style={{ width: "100%", height: RFValue(90) }}>
          <Image style={{ width: "100%", height: "100%", objectFit: 'contain' }} source={imgUrl} />
        </View>
        <View style={{ alignItems: "center", width: "100%" }}>
          <TextTitle style={{ textAlign: "center", letterSpacing: 1 }}>{t('auth.login.title')}</TextTitle>
        </View>
        <View style={{flex: 1, justifyContent: "space-around"}}>
          <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <ViewContainer>
              <FormContainer>
                <CustomInputText label={t('auth.login.usernameField.label')} placeholder={t('auth.login.usernameField.placeholder')} setInput={setUserdata} input={state.userdata.identifier} validationFun={validateIdentifier} setError={setErrors} error={state.errors.identifier} field="identifier" t={t} keyboardType="default" />
                <PasswordInputText label={t('auth.login.passwordField.label')} placeholder={t('auth.login.passwordField.placeholder')} setInput={setUserdata} input={state.userdata.password} validationFun={validatePassword} setError={setErrors} error={state.errors.password} field="password" t={t} />
                <View style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  <CustomButton text={t('auth.login.btnLogin')} pressed={pressed} setPressed={setPressed} />
                </View>
              </FormContainer>
            </ViewContainer>
          </TouchableWithoutFeedback>
          <CustomLink text={t('auth.login.linkToRegister')} href="./Register/" /></View>
      </View>
    </MainView>
  )
}