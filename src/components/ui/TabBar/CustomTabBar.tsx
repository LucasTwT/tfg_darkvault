import { ImageBackground } from 'react-native';
import { useTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { ButtonTabBar } from './ButtonTabBar';
import { TabBarIcons } from './types.d';
import { useBottomSheetStore } from '@/src/store/useBottomSheet';
import { BottomSheetCreate } from '../BottomSheet/Create/BottomSheetCreate';

export default function MyCustomGlassTabBar({ state, descriptors, navigation }) {
    const theme = useTheme()
    const {openSheet} = useBottomSheetStore()
    const urlTabBar = theme.dark ? require("@/src/assets/images/BottomTabBarBlack.png") : require("@/src/assets/images/BottomTabBarWhite.png")
  return (
    <ImageBackground source={urlTabBar}
      resizeMode='contain'  
    style={{ position: 'absolute',
        bottom: -40,
        left: 20,
        right: 20,
        height: 70,
        borderRadius: 25,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-around",
        }}
        imageStyle={{ borderRadius: RFValue(9.74) }}>

      {state.routes.map((route, index) => {
        const isFocused = state.index === index
        
        return <ButtonTabBar isFocused={isFocused} key={route.key} icon={TabBarIcons[route.name]} onPress={() => { navigation.navigate(route.name)}} />
  })}
  <ButtonTabBar isFocused={false} icon='plus' onPress={() => openSheet(<BottomSheetCreate/>, {dynamicSizing: true, snapPoints: undefined, handleComponent: undefined}, {btnTxt: "Create vault", status: false})}/>
    </ImageBackground>
  );
}
