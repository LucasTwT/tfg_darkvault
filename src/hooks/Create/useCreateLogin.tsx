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
import { encryptXChaCha } from "@/src/services/crypto/functions/chachaTextData";
import { useGlobalStore } from "@/src/store/globalStore";
import { loginStart } from "@/src/services/api/Login/createLogin";
import { useAppStore } from "@/src/store/useAppStore";
import { CIPHER, VERSION } from "@/src/services/crypto/constants/cipher";

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
  const { cryptoContext, canSign } = useGlobalStore()
  const { actualVault } = useAppStore()
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    if (!contentHandle) return;

    const activeButton = contentHandle.buttons.find((b) => b.status && b.action === "change");
    if (!activeButton) return;

        openOverlay(<ListOfVaults />, {
          snapPoints: ["25%", "50%"],
          dynamicSizing: false,
        });

  }, [contentHandle]);

  useEffect(() => {
    if (!contentHandle) return;
    const activeButton = contentHandle.buttons.find((b) => b.status && b.action === "add");
    if (!activeButton) return;
    handleSubmit();
  }, [contentHandle])

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
    

    if (canSign() && cryptoContext && actualVault) {
            const { ciphertext, nonce } = encryptXChaCha(JSON.stringify(state.logindata), cryptoContext.vaultKey )
            loginStart({vaultId: actualVault.id , ciphertext: ciphertext, nonce: nonce, cipher: CIPHER, version: VERSION})
    }

  }
}
