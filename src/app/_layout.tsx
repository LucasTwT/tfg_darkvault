import { Slot, SplashScreen } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { useGlobalStore } from "@/src/store/globalStore";
import { useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { I18nextProvider } from "react-i18next";
import i18n from "@/src/translations/index"
import { useInit } from "@/src/hooks/useInit";
import { SplashView } from "@/src/components/ui/Splash";
import { getTheme } from "@/src/Theme";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const systemScheme = useColorScheme()
  const { settings, updateRefreshToken, updateAccessToken, updateSettings } = useGlobalStore()
  const [loading, setLoading] = useState(true);

  useInit({ updateAccessToken, updateRefreshToken, updateSettings, setLoading })

  useEffect(() => {
    i18n.changeLanguage("es");
  }, [settings.lang])

  const [fontsLoaded] = useFonts({
    lexendGigaMedium: require("@/src/assets/fonts/LexendGiga-Medium.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const theme = getTheme(settings, systemScheme)

  if (!fontsLoaded && loading) {
    return <SplashView theme={theme}/>
  }

  return (
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <SafeAreaView onLayout={onLayoutRootView} style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <Slot />
        </SafeAreaView>
      </I18nextProvider>
    </ThemeProvider>
  );
}