import { Tabs } from "expo-router";
import MyCustomGlassTabBar from "@/src/components/ui/TabBar/CustomTabBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useBottomSheetStore } from "@/src/store/useBottomSheet";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { RFValue } from "react-native-responsive-fontsize";
import { useLoadBottomSheetContent } from "@/src/hooks/useLoadBottomSheetContent";
import { useCallback } from "react";

export default function BottomTabBarLayout() {
    const theme = useTheme()
    const { bottomSheetRef, content , props} = useBottomSheetStore()
    const styles = theme.bottomActionSheet
    const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
                opacity={.25}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[]
	);
    useLoadBottomSheetContent()

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <MyCustomGlassTabBar {...props} />} />
            </SafeAreaView>
            <BottomSheet enableDynamicSizing={props.dynamicSizing} index={-1}  snapPoints={props.snapPoints} ref={bottomSheetRef} enablePanDownToClose backgroundStyle={{ backgroundColor: styles.background }} handleIndicatorStyle={{ backgroundColor: styles.handleIndicatorColor, borderRadius: RFValue(3), width: RFValue(50) }} handleComponent={props.handleComponent} backdropComponent={renderBackdrop} >
                {content ? content : null}
            </BottomSheet>
        </GestureHandlerRootView>
    )
}