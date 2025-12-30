import { useEffect } from "react";
import { InteractionManager } from "react-native";
import { usePopoverStore } from "../store/usePopoverStore";

export function useLoadPopover() {
    const { anchorRef, selectedVault, setAnchorRef, setSelectedVault } = usePopoverStore()
    useEffect(() => {
        if (!anchorRef || !selectedVault ) return;

        const task = InteractionManager.runAfterInteractions(() => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setAnchorRef(null)
                    setSelectedVault(null)
                });
            });
        });

        return () => {
            task.cancel?.();
        };
    }, [selectedVault, anchorRef]);
}