import { FilterOption, Option, Vault } from "@/src/reducers/Home/useHome.d"
import { getVaults } from "@/src/services/api/Vault/getVaults"
import { useGlobalStore } from "@/src/store/globalStore"
import { useAppStore } from "@/src/store/useAppStore"
import { useBottomSheetStore } from "@/src/store/useBottomSheet"
import { Dispatch, SetStateAction, useEffect } from "react"

export function useHome({initFilterOptions, initVaultOptions, filterVaults, filterVal, setFilterVal, t} : {initFilterOptions: (payload: FilterOption[]) => void, initVaultOptions:  (payload: Option[]) => void, filterVaults:(payload: { vaults: Vault[]; inputValue: string}) => void, filterVal: string, setFilterVal:  Dispatch<SetStateAction<string>>, t: any}) {
    const { contentHandle } = useBottomSheetStore()
    const { access_token } = useGlobalStore() 
    const { initUserVaults, userVaults } = useAppStore()

    useEffect(() => {
        initFilterOptions([{ name: t('tabs.home.filterField.modalOptions.byName'), status: true, tags: "name" }, { name: t('tabs.home.filterField.modalOptions.byDate'), status: false, tags: "updated_at" }])
        initVaultOptions([{ name: t('tabs.home.vaults.modalOptions.show'), status: true, tags: "show" }, { name: t('tabs.home.vaults.modalOptions.modify'), status: false, tags: "modify" }, { name: t('tabs.home.vaults.modalOptions.delete'), status: false, tags: "delete" }])
    }, [])

    useEffect(() => {
        getVaults(access_token).then(({ response, status }) => {
            if (status === 200)
                initUserVaults(response.vaults)
        })
    }, [])

    // useEffect(() => {
    //     if (contentHandle?.status){
    //         getVaults(access_token).then(({ response, status }) => {
    //             if (status === 200)
    //                 initUserVaults(response.vaults)
    //         })
    //     }
    // }, [contentHandle])

    useEffect(() => {
        filterVaults({ vaults: userVaults, inputValue: filterVal })
    }, [filterVal, setFilterVal, userVaults])
}