import { ColorSchemeName } from "react-native";
import { UserSettings } from "../store/globalStoreTypes.d";
import { darkTheme, lightTheme } from "./themes";

export default {
    light: lightTheme,
    dark: darkTheme
}

export function getTheme (settings: UserSettings, systemScheme: ColorSchemeName) {
    return (settings.theme === "system"
      ? systemScheme === "dark"
        ? darkTheme
        : lightTheme
      : settings.theme === "dark"
        ? darkTheme : lightTheme
    )
}