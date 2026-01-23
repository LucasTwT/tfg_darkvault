import { View } from "react-native";
import { CustomSlider } from "../../Slider/CustomSlider";
import { CustomSwitch } from "../../Switch/CustomSwitch";
import {
  GenerateKeyState,
  PasswordType,
  UpdatePayload,
} from "@/src/reducers/Create/useGenerateKey.d";
import { PasswordTypeSelector } from "../../Buttons/PasswordTypeSelector";
import { RANDOM_OPTIONS } from "@/src/utils/constants";

export function KeyOptionsView({
  state,
  setKeyOptions,
}: {
  state: GenerateKeyState;
  setKeyOptions: (payload: UpdatePayload) => void;
}) {
  const { keyOptions } = state;

  const sliderProps =
    keyOptions.type === PasswordType.memorable
      ? {
          txt: `${keyOptions.wordsCount} palabras`,
          type: "wordsCount",
          value: keyOptions.wordsCount,
          minVal: 4,
          maxVal: 15,
        }
      : {
          txt: `${keyOptions.length} caracteres`,
          type: "length",
          value: keyOptions.length,
          minVal: 4,
          maxVal: 64,
        };

  return (
    <>
      <PasswordTypeSelector
        type={keyOptions.type}
        onToggle={() =>
          setKeyOptions({
            field: "type",
            value:
              keyOptions.type === PasswordType.memorable
                ? PasswordType.random
                : PasswordType.memorable,
          })
        }
      />

      <CustomSlider {...sliderProps} setValue={setKeyOptions} />

      {keyOptions.type === PasswordType.random && (
        <View>
          {RANDOM_OPTIONS.map(({ label, field }) => (
            <CustomSwitch
              key={field}
              txt={label}
              type={field}
              value={keyOptions[field]}
              setValue={setKeyOptions}
            />
          ))}
        </View>
      )}
    </>
  );
}