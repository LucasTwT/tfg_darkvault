import { create } from "zustand"
import { BottomSheetState } from "./useBottomSheetTypes.d"

export const useBottomSheetStore = create<BottomSheetState>((set, get) => ({
  bottomSheetRef: { current: null },
  content: null,
  action: null,
  contentHandle: null,
  props: {
    dynamicSizing: true
  },
  openSheet: (content, props, contentHandleData) => {
    const { bottomSheetRef } = useBottomSheetStore.getState();
    props && set({props})
    contentHandleData && set({contentHandle: contentHandleData})
    bottomSheetRef.current?.snapToIndex(0);
    set({ content });
  },
  closeSheet: () => {
    const { bottomSheetRef } = useBottomSheetStore.getState();
    bottomSheetRef.current?.close();
    useBottomSheetStore.setState({ content: null });
  },
  changeBtnValue: () => {
    const { contentHandle } = useBottomSheetStore.getState()
    contentHandle && set({contentHandle: {btnTxt: contentHandle.btnTxt, status: true}})
  }
}));