import { useEffect } from "react";
import { InteractionManager } from "react-native";
import { useBottomSheetStore } from "../store/useBottomSheet";

export function useLoadBottomSheetContent() {
    const { content, bottomSheetRef } = useBottomSheetStore()
    useEffect(() => {
        if (!content) return;

        const task = InteractionManager.runAfterInteractions(() => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    bottomSheetRef.current?.snapToIndex?.(0);
                });
            });
        });

        return () => {
            task.cancel?.();
        };
    }, [content, bottomSheetRef]);
}