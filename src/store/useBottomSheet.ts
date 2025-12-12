import { create } from "zustand"
import { BottomSheetState } from "./useBottomSheetTypes.d"

export const useBottomSheetStore = create<BottomSheetState>((set, get) => ({
  bottomSheetRef: { current: null },
  content: null,
  contentHandle: null,
  props: {
    dynamicSizing: true
  },
openSheet: (content, props, contentHandleData) => {
  const { bottomSheetRef } = useBottomSheetStore.getState();

  set({
    content,
    props: props ?? {},
    contentHandle: contentHandleData ?? null
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
  changeBtnValue: () => {
    const { contentHandle } = useBottomSheetStore.getState()
    contentHandle && set({contentHandle: {btnTxt: contentHandle.btnTxt, status: true}})
  }
}));