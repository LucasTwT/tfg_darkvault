import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { useGenerateKeyReducer } from "@/src/reducers/Create/useGenerateKey";
import { useGenerateKey } from "@/src/hooks/Create/useGenerateKey";
import { KeyOptionsView } from "./KeyOptionsView";
import { PasswordText } from "../../styles";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { UpdatePayload } from "@/src/reducers/Create/useCreateLogin.d";

export function GenerateKey({ setValue } : { setValue: (payload: UpdatePayload) => void }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { state, regeneratePassword, setKeyOptions, setRegenerateBtn } = useGenerateKeyReducer();
  useGenerateKey({ state, regeneratePassword, setValue: setValue});
  const { password } = state;

  return (
    <BottomSheetScrollView>
      <Text
        style={{
          color: theme.bottomActionSheet.handleIndicatorText,
          fontFamily: "lexendGigaMedium",
          fontSize: RFValue(12),
          textAlign: "center",
        }}
      >
        {t("create.generateKeys.title")}
      </Text>
      <View style={{ width: "100%", paddingTop: RFValue(20) }}>
        <PasswordText style={{ paddingHorizontal: RFValue(20) }}>
          {password}
        </PasswordText>
        <KeyOptionsView state={state} setKeyOptions={setKeyOptions}/>
        <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: RFValue(20), gap: RFValue(20)}}>
          <TouchableOpacity onPress={() => setRegenerateBtn({newVal: !state.regenerateBtn}) } style={{padding: RFValue(10), backgroundColor: "#9B4DFF", borderRadius: RFValue(20)}}>
            <FontAwesome name="exchange" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetScrollView>
  );
}
