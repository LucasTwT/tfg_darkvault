import { Tabs } from "expo-router";
import MyCustomGlassTabBar from "@/src/components/ui/TabBar/CustomTabBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useBottomSheetStore } from "@/src/store/useBottomSheet";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { RFValue } from "react-native-responsive-fontsize";
import { useLoadBottomSheetContent } from "@/src/hooks/useLoadBottomSheetContent";
import { useCallback, useEffect } from "react";
import { useOverlaySheetStore } from "@/src/store/useOverLaySheet";
import { LockGate } from "@/src/components/ui/LockGate";

export default function BottomTabBarLayout() {
  const theme = useTheme();
  const { bottomSheetRef, content, props } = useBottomSheetStore();
  const {
    ref,
    content: overlayContent,
    props: overlayProps,
  } = useOverlaySheetStore();
  const styles = theme.bottomActionSheet;
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={"none"}
        opacity={0.25}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );
  useLoadBottomSheetContent();
  useOverlaySheetStore();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LockGate>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: theme.colors.background }}
        >
          <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <MyCustomGlassTabBar {...props} />}
          />
        </SafeAreaView>
        <>
          <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            enableDynamicSizing={props.dynamicSizing}
            snapPoints={props.snapPoints}
            enablePanDownToClose={props.enablePanDownToClose}
            enableContentPanningGesture={props.enableContentPanningGesture}
            handleComponent={props.handleComponent}
            backdropComponent={renderBackdrop}
            backgroundStyle={{ backgroundColor: styles.background }}
            handleIndicatorStyle={{
              backgroundColor: styles.handleIndicatorColor,
              borderRadius: RFValue(3),
              width: RFValue(50),
            }}
          >
            {content ? content : null}
          </BottomSheet>
          <BottomSheet
            enableContentPanningGesture={
              overlayProps.enableContentPanningGesture
            }
            enableDynamicSizing={overlayProps.dynamicSizing}
            index={-1}
            snapPoints={overlayProps.snapPoints}
            ref={ref}
            enablePanDownToClose
            backgroundStyle={{ backgroundColor: styles.background }}
            handleIndicatorStyle={{
              backgroundColor: styles.handleIndicatorColor,
              borderRadius: RFValue(3),
              width: RFValue(50),
            }}
            handleComponent={overlayProps.handleComponent}
            backdropComponent={renderBackdrop}
          >
            {overlayContent ? overlayContent : null}
          </BottomSheet>
        </>
      </LockGate>
    </GestureHandlerRootView>
  );
}
