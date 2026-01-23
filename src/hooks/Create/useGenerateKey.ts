import { UpdatePayload } from "@/src/reducers/Create/useCreateLogin.d";
import { GenerateKeyState } from "@/src/reducers/Create/useGenerateKey.d";
import { useOverlaySheetStore } from "@/src/store/useOverLaySheet";
import { useEffect } from "react";

export function useGenerateKey({state, regeneratePassword, setValue} : {state: GenerateKeyState, regeneratePassword: () => void, setValue: (payload: UpdatePayload) => void}) {
    
    const { contentHandle, closeOverlay } = useOverlaySheetStore()

    useEffect(() => {
        regeneratePassword()
    }, [state.keyOptions, state.regenerateBtn])


    useEffect(() => {
        if (!contentHandle) return;
    const createBtn = contentHandle.buttons.find(
      (btn) => btn.action === "change",
    );
    if (!createBtn?.status) return;

    setValue({field: "password", value: state.password})
    closeOverlay()
    }, [contentHandle])
}