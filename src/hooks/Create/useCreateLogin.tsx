import { useBottomSheetStore } from "@/src/store/useBottomSheet";
import { useOverlaySheetStore } from "@/src/store/useOverLaySheet";
import { ListOfVaults } from "@/src/components/ui/BottomSheet/vaults/ListOfVaults";
import { useEffect } from "react";
import { GenerateKey } from "@/src/components/ui/BottomSheet/Create/GenerateKey";
import HandleOverlayComponent from "@/src/components/ui/BottomSheet/HandleOverlayComponent";
import { TopButton } from "@/src/components/ui/Buttons/TopButton";
import { useTheme } from "styled-components/native";
import { Logindata, LoginState, UpdatePayload } from "@/src/reducers/Create/useCreateLogin.d";
import { useTranslation } from "react-i18next";
import { validateLoginForm } from "@/src/utils/helper/validateLoginForm";
import { decryptXChaCha, encryptXChaCha } from "@/src/services/crypto/functions/chachaTextData";
import { to_string } from "react-native-libsodium";
import { regenerateKeys } from "@/src/services/crypto/functions/hash";
import { useGlobalStore } from "@/src/store/globalStore";

export function useCreateLogin({
  state,
  setValue,
  setError,
}: {
  state: LoginState;
  setValue: (payload: UpdatePayload) => void;
  setError: (payload: { field: keyof Logindata; value: string }) => void;
}) {
  const { contentHandle } = useBottomSheetStore();
  const { openOverlay } = useOverlaySheetStore();
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    if (!contentHandle) return;

    const activeButton = contentHandle.buttons.find((b) => b.status);
    if (!activeButton) return;

    switch (activeButton.action) {
      case "change":
        openOverlay(<ListOfVaults />, {
          snapPoints: ["25%", "50%"],
          dynamicSizing: false,
        });
        break;

      case "add":
        handleSubmit();
        break;
    }
  }, [contentHandle]);

  useEffect(() => {
    if (!state.generateKey) return;

    openOverlay(
      <GenerateKey setValue={setValue} />,
      {
        handleComponent: HandleOverlayComponent,
        dynamicSizing: true,
        enableContentPanningGesture: false,
      },
      {
        buttons: [
          {
            content: TopButton,
            action: "change",
            props: {
              txt: "rellenar",
              txtColor: theme.customHandleComponent.btnAction.textColor,
              bgColor: theme.customHandleComponent.btnAction.background,
            },
            status: false,
          },
        ],
      },
    );
  }, [state.generateKey]);

  function handleSubmit() {
    const { isValid, errors } = validateLoginForm(state.logindata, t);

    if (!isValid) {
      (Object.entries(errors) as [keyof Logindata, string][]).forEach(
        ([field, value]) => setError({ field, value }),
      );
      return;
    }
    
    const password = "A01b02c03d04|777" // psw prueba
    const salt = "Wa9PTLg2fa5zct8iqEfGUw=="
    const kdf_params = {"hashLength": 32, "iterations": 3, "memory": 131072, "mode": "argon2id", "parallelism": 1}
    
    regenerateKeys(password, salt).then(() => {
      const { cryptoContext } = useGlobalStore.getState()
      if (!cryptoContext) { console.log("NO crypto ctx") 
        return
      } 
      const { ciphertext, nonce } = encryptXChaCha(JSON.stringify(state.logindata), cryptoContext.vaultKey )
      console.log("Cipher text: " + ciphertext + "\nNonce: " + nonce)
      const res = decryptXChaCha(ciphertext, nonce, cryptoContext.vaultKey)
      console.log(res)
    

    })
    

    

  }
}
