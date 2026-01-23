import { create } from "zustand";
import { BottomSheetState, ButtonAction, TopButton, TopButtonProps } from "./useBottomSheetTypes.d";

export const useBottomSheetStore = create<BottomSheetState>((set, get) => ({
  bottomSheetRef: { current: null },
  content: null,
  contentHandle: null,
  props: {
    dynamicSizing: true,
  },
  openSheet: (content, props, contentHandleData) => {
    const { bottomSheetRef } = useBottomSheetStore.getState();

    set({
      content,
      props: props ?? {},
      contentHandle: contentHandleData ?? null,
    });
    requestAnimationFrame(() => {
      bottomSheetRef.current?.snapToIndex(0);
    });
  },

  closeSheet: () => {
    const { bottomSheetRef } = useBottomSheetStore.getState();
    bottomSheetRef.current?.close();
    useBottomSheetStore.setState({ content: null });
  },
getHandleButtonsProps: (id: ButtonAction) => {
  const btn = get().contentHandle?.buttons.find(
    (btn: TopButton) => btn.action === id
  );

  return btn ? btn.props : false;
},
  changeBtnValue: (btnAction: ButtonAction) => {
    const { contentHandle } = useBottomSheetStore.getState();
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

  changeVault: (newProps: TopButtonProps) => {
    const { contentHandle } = useBottomSheetStore.getState()
    contentHandle &&
      set({
        contentHandle: {
          buttons: contentHandle.buttons.map((btn) => {
            if (btn.action === "change") btn.props = newProps;
            return btn;
          }),
        },
      });
  }
}));
