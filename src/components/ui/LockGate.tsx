import { useGlobalStore } from "@/src/store/globalStore";
import { MasterPasswordForm } from "./BottomSheet/MasterPasswordForm/MasterPasswordForm";
import { useBottomSheetStore } from "@/src/store/useBottomSheet";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export function LockGate({ children }: { children: React.ReactNode }) {
  const { canSign } = useGlobalStore()
  const { openSheet } = useBottomSheetStore()
  const { t } = useTranslation()
  useEffect(() => {
      if (!canSign()) {
    openSheet(<MasterPasswordForm/>,  {
    snapPoints: ["100%"],
    dynamicSizing: false,
    enablePanDownToClose: false,
    enableContentPanningGesture: false,
                },)
  }
  }, [canSign]
  )

  return <>{children}</>;
}
