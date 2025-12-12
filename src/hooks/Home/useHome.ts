import { FilterOption, Option, Vault } from "@/src/reducers/Home/useHome.d"
import { getVaults } from "@/src/services/api/Vault/getVaults"
import { useAppStore } from "@/src/store/useAppStore"
import { Dispatch, SetStateAction, useEffect } from "react"

export function useHome({initFilterOptions, initVaultOptions, filterVaults, filterVal, setFilterVal, t, filterOptions} : {initFilterOptions: (payload: FilterOption[]) => void, initVaultOptions:  (payload: Option[]) => void, filterVaults:(payload: { vaults: Vault[]; inputValue: string}) => void, filterVal: string, setFilterVal:  Dispatch<SetStateAction<string>>, t: any, filterOptions: FilterOption[]}) {
    const { initUserVaults, userVaults } = useAppStore()

    useEffect(() => {
        initFilterOptions([{ name: t('tabs.home.filterField.modalOptions.byName'), status: true, tags: "name" }, { name: t('tabs.home.filterField.modalOptions.byDate'), status: false, tags: "updated_at" }])
        initVaultOptions([{ name: t('tabs.home.vaults.modalOptions.show'), status: true, tags: "show" }, { name: t('tabs.home.vaults.modalOptions.modify'), status: false, tags: "modify" }, { name: t('tabs.home.vaults.modalOptions.delete'), status: false, tags: "delete" }])
    }, [])

    useEffect(() => {
        getVaults().then(({ response, status }) => {
            if (status === 200)
                initUserVaults(response.vaults)
        })
    }, [])
    
    useEffect(() => {
        filterVaults({ vaults: userVaults, inputValue: filterVal })
    }, [filterVal, setFilterVal, userVaults, filterOptions])
}