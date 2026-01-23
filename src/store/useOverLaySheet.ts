import BottomSheet from "@gorhom/bottom-sheet";
import React from "react";
import { create } from "zustand";
import { OverlaySheetState } from "./useOverLaySheetTypes.d";
import { ButtonAction, SheetProps, TopButton } from "./useBottomSheetTypes.d";

export const useOverlaySheetStore = create<OverlaySheetState>((set, get) => ({
  ref: React.createRef<BottomSheet>(),
  content: null,
contentHandle: null,
  props: {
    dynamicSizing: true,
  },
  openOverlay: (content, props, contentHandleData) => {
    const { ref } = useOverlaySheetStore.getState();

    set({
      content,
      props: props ?? {},
      contentHandle: contentHandleData ?? null,
    });
    requestAnimationFrame(() => {
      ref.current?.snapToIndex(0);
    });
  },

  changeOverlayProps: (props?: SheetProps) => {
     if (!props) return
     const { props: actualProps } = useOverlaySheetStore.getState();
    set({
      props: {
        ...actualProps,
        ...props
      }
    })
  },

  closeOverlay: () => {
    const { ref } = useOverlaySheetStore.getState();
    ref.current?.close();
    useOverlaySheetStore.setState({ content: null });
  },
getHandleButtonsProps: (id: ButtonAction) => {
  const btn = get().contentHandle?.buttons.find(
    (btn: TopButton) => btn.action === id
  );

  return btn ? btn.props : false;
},
  changeBtnValue: (btnAction: ButtonAction) => {
    const { contentHandle } = useOverlaySheetStore.getState();
    contentHandle &&
      set({
        contentHandle: {
          buttons: contentHandle.buttons.map((btn) => {
            if (btn.action === btnAction) btn.status = true;
            return btn;
          }),
        },
      });
  },
}));
