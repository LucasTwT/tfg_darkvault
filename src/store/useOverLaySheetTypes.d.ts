import { ButtonAction, ContentHandleData, SheetProps, TopButtonProps } from "./useBottomSheetTypes.d";

interface OverlaySheetState {
  ref: React.RefObject<BottomSheet>;
  content: ReactNode | null;
  contentHandle: ContentHandleData | null,
  props: SheetProps,
  changeOverlayProps: (props?: SheetProps) => void,
  openOverlay: (content: ReactNode, props?: SheetProps, contentHandleData?: ContentHandleData) => void,
  getHandleButtonsProps: (id: ButtonAction) => TopButtonProps | false,
  changeBtnValue: (btnAction: ButtonAction ) => void,
  closeOverlay: () => void;
}
