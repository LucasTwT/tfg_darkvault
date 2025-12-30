import type { View } from "react-native"
import { Vault } from "../reducers/Home/useHome.d"
import { RefObject } from "react"

export interface PopoverState {
    anchorRef: RefObject<View> | null
    selectedVault: Vault | null,
    isVisible: boolean,
    setAnchorRef: (ref: RefObject<View> | null) => void
    setSelectedVault: (content: Vault | null) => void,
    changeVisible: (newVal: boolean) => void,
}