import { Tabs } from "expo-router";
import MyCustomGlassTabBar from "@/src/components/ui/TabBar/CustomTabBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useBottomSheetStore } from "@/src/store/useBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import { RFValue } from "react-native-responsive-fontsize";
import { useLoadBottomSheetContent } from "@/src/hooks/useLoadBottomSheetContent";

export default function BottomTabBarLayout() {
    const theme = useTheme()
    const { bottomSheetRef, content , props} = useBottomSheetStore()
    const styles = theme.bottomActionSheet
    useLoadBottomSheetContent()

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <MyCustomGlassTabBar {...props} />} />
            </SafeAreaView>
            <BottomSheet enableDynamicSizing={props.dynamicSizing} index={-1}  snapPoints={props.snapPoints} ref={bottomSheetRef} enablePanDownToClose backgroundStyle={{ backgroundColor: styles.background }} handleIndicatorStyle={{ backgroundColor: styles.handleIndicatorColor, borderRadius: RFValue(3), width: RFValue(50) }} handleComponent={props.handleComponent} >
                {content ? content : null}
            </BottomSheet>
        </GestureHandlerRootView>
    )
}