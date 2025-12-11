import { ActivityIndicator, Image, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export function SplashView({theme} : {theme: object}) {
    const url = theme.dark ? require("@/src/assets/images/iconBlackBackground5.png") : require("@/src/assets/images/iconWhiteBackground.png")
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background, paddingHorizontal: RFValue(36) }}>
        <View style={{ borderRadius: RFValue(10), backgroundColor: theme.form.background, borderColor: theme.form.border, borderWidth: RFValue(2), width: "100%", padding: RFValue(25) }}>
          <View style={{ width: "100%", height: RFValue(90) }}>
            <Image style={{ width: "100%", height: "100%", objectFit: 'contain' }} source={url} />
          </View>
          <ActivityIndicator size="large" color={theme.colors.spinner} />
        </View>
      </View>
    );
}