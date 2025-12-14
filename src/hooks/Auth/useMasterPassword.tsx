import { validatePassword } from "@/src/utils/validations/Login";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useMasterPassword ({password, setError} : {password: MasterPassword, setError: Dispatch<SetStateAction<string>>}) {
    const { t } = useTranslation()
    useEffect(() => {
        console.log(password)
        const error = validatePassword(password.value, t)
        setError(error)
    }, [password, setError, t])
}