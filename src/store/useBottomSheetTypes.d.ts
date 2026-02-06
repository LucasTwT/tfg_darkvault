import BottomSheet, { BottomSheetHandleProps, BottomSheetProps } from "@gorhom/bottom-sheet";
import React, { ReactNode, ComponentType } from "react";

export interface BottomSheetState {
    bottomSheetRef: React.RefObject<BottomSheet>,
    content: ReactNode | null,
    contentHandle: ContentHandleData | null,
    props: SheetProps,
    openSheet: (content: ReactNode, props?: SheetProps, contentHandleData?: ContentHandleData) => void,
    getHandleButtonsProps: (id: ButtonAction) => TopButtonProps | false,
    changeVault: (newProps: TopButtonProps) => void,
    changeBtnValue: (btnAction: ButtonAction ) => void,
    closeSheet: () => void
}

interface ContentHandleData {
    buttons: TopButton[]
}

interface TopButton {
    content:  ComponentType<any>,
    action: ButtonAction,
    props: TopButtonProps,
    status: boolean
}

interface TopButtonProps {
    txt: string,
    txtColor: string,
    bgColor: string,
    icLeft?: string,
    icRight?: string
}

type ButtonAction = "add" | "modify" | "delete" | "change" | "verify"

interface SheetProps {
    dynamicSizing?: boolean,
    enablePanDownToClose?: boolean,
    snapPoints?: (string | number)[] ,
    handleComponent?: React.FC<BottomSheetHandleProps>
    enableContentPanningGesture?: boolean
}