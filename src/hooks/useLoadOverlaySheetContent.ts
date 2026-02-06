import { useEffect } from "react";
import { InteractionManager } from "react-native";
import { useOverlaySheetStore } from "../store/useOverLaySheet";

export function useLoadBottomSheetContent() {
    const { content, ref } = useOverlaySheetStore()
    useEffect(() => {
        if (!content) return;

        const task = InteractionManager.runAfterInteractions(() => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    ref.current?.snapToIndex?.(0);
                });
            });
        });

        return () => {
            task.cancel?.();
        };
    }, [content, ref]);
}