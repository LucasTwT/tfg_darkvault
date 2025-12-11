import BottomSheet, { BottomSheetHandleProps } from "@gorhom/bottom-sheet";
import React, { ReactNode } from "react";

export interface BottomSheetState {
    bottomSheetRef: React.RefObject<BottomSheet>,
    content: ReactNode | null,
    contentHandle: ContentHandleData | null,
    props: SheetProps,
    openSheet: (content: ReactNode, props?: SheetProps, contentHandleData?: ContentHandleData) => void,
    changeBtnValue: () => void,
    closeSheet: () => void
}

interface ContentHandleData {
    btnTxt: string,
    status: boolean
}

interface SheetProps {
    dynamicSizing?: boolean,
    snapPoints?: (string | number)[] ,
    handleComponent?: React.FC<BottomSheetHandleProps>
}