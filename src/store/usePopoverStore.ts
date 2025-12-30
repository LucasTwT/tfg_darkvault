import { create } from "zustand";
import { PopoverState } from "./usePopoverStore.d"
import { View } from "react-native";
import { Vault } from "../reducers/Home/useHome.d";
import { RefObject } from "react";

export const usePopoverStore = create<PopoverState>((set) => ({
    anchorRef: null,
    selectedVault: null,
    isVisible: false,
    changeVisible: (newVal: boolean) =>  set({isVisible: newVal}),
    setSelectedVault: (content: Vault) => set({selectedVault: content}),
    setAnchorRef: (ref: RefObject<View>) => set({anchorRef: ref})
}))