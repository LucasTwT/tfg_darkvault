import { challengeFinish } from "@/src/services/api/Auth/challengeFinish";
import { challengeStart } from "@/src/services/api/Auth/challengeStart";
import {
  regenerateKeys,
  signChallenge,
} from "@/src/services/crypto/functions/hash";
import { useBottomSheetStore } from "@/src/store/useBottomSheet";
import { validatePassword } from "@/src/utils/validations/Login";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useMasterPassword({
  password,
  setError,
  pressed,
  setLoading
}: {
  password: MasterPassword;
  setError: Dispatch<SetStateAction<string>>;
  pressed: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>
}) {
  const { closeSheet } = useBottomSheetStore();
  const { t } = useTranslation();
useEffect(() => {
  if (!password.value) return; 
  const error = validatePassword(password.value, t);
  setError(error);
}, [setError, password])

 useEffect(() => {
  if (!password.value) return; 
  if (!pressed) return;
  try{
    const error = validatePassword(password.value, t);
  setError(error);
  if (error) return;

  challengeStart().then(({ status, response }) => {
    if (!status || !response) return;

    const { salt, kdf_params, challenge } = response;

    if (!salt || !kdf_params || !challenge) {
      console.error("Invalid challenge payload");
      return;
    }

    regenerateKeys(password.value, salt, kdf_params)
      .then(() => {
        const signature = signChallenge(challenge);
        if (!signature) return;

        return challengeFinish({ signedChallenge: signature });
      })
      .then((res) => {
        if (res?.status && res.response?.status) {
          closeSheet();
        }
        else {
          setError("Contraseña incorrecta")
        }
      });
  });
  }catch (e) {

  } finally {
    setLoading(false)
    
  }
}, [pressed]);

}
