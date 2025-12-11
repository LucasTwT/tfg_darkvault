import Popover, { PopoverPlacement } from "react-native-popover-view";
import { VaultElement } from "./VaultElement";
import { PopOverContent } from "../PopOver/PopOverContent";
import { RFValue } from "react-native-responsive-fontsize";
import { Vault, Options } from "@/src/reducers/Home/useHome.d";
import { useRef, useState } from "react";
import { View } from "react-native";

export function VaultPopoverItem({ item, vaultOptions, setVaultOptions } :  { item: Vault, vaultOptions: Options[], setVaultOptions: (payload: number) => void }) {
    const [showPopover, setShowPopover] = useState(false);
    const popOverRef = useRef<View>(null)
    return (
        <>
        <VaultElement
                    vault={item}
                    showPopover={setShowPopover}
                    sourceRef={popOverRef}
            />
        <Popover
            placement={PopoverPlacement.BOTTOM}
            isVisible={showPopover}
            popoverStyle={{
                borderRadius: RFValue(15),
                backgroundColor: "rgba(0,0,0,0.01)",
                flexDirection: "row",
            }}
            from={popOverRef}
        >
            <PopOverContent
                vault={item}
                filterOptions={vaultOptions}
                setFilterOptions={setVaultOptions}
                setShowPopover={setShowPopover}
            />
        </Popover>
        </>
            
    )
}