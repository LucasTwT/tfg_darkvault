
import { MainView } from "@/src/styles/auth/styles";
import { View } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";

export default function Logs () {

    return (
        <MainView>
             <View style={{ flexDirection: 'row', gap: RFValue(20) }} >
                {/* <CustomIconButton icon="plus" onPress={() => { console.log("Boton clicado")}}/>  */}
            </View>
        </MainView>
    )
}