import { Option, Vault } from "@/src/reducers/Home/useHome.d";
import { FlashList } from "@shopify/flash-list";
import { RFValue } from "react-native-responsive-fontsize";
import { View } from "react-native";
import { VaultPopoverItem } from "./VaultPopOverItem";

export function VaultGrid({ data, vaultOptions, setVaultOptions }: { data: Vault[], vaultOptions: Option[], setVaultOptions: (payload: number) => void }) {
    return (
        <View style={{flex: 1}}>
                <FlashList
                    ItemSeparatorComponent={() => (
                        <View style={{ height: RFValue(15) }}></View>
                    )}
                    style={{height: "100%", width: "100%"}}
                    data={data}
                    renderItem={({ item }) => (
                        <VaultPopoverItem item={item} setVaultOptions={setVaultOptions} vaultOptions={vaultOptions} />
                    )}
                />
        </View>
    )
}