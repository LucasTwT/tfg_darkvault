import Feather from "@expo/vector-icons/Feather";
import { Image, ImageSourcePropType, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { ActionName, Description, ElementView } from "./styles";

export function BottomSheetElement ({icon, image, color, actionName, description} : {icon?: string, image?: ImageSourcePropType, color: string, actionName: string, description?: string}) {
    return (
        <ElementView>
            <View style={{width: RFValue(25), height: RFValue(25)}}>
                {
                image ? (
                    <Image source={image} resizeMode="contain" style={{width: RFValue(25), height: RFValue(25)}}/>
                )
                : (
                    <Feather size={RFValue(25)} color={color} name={icon}/>
                )
                }
            </View>
            <View style={{flex: 1}}>
                <ActionName>{actionName}</ActionName>
                {description && <Description>{description}</Description>}
            </View>
        </ElementView>
    )
}