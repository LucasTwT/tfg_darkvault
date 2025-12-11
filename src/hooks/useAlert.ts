import { useEffect } from "react";
import { Button } from "./alerts.d";
import { Alert } from "react-native";
import { RequestError } from "../reducers/Auth/useRegister";

export function useAlert({title, msg, buttons, input, validationFun} : {title: string, msg: string, buttons: Button[], input: RequestError, validationFun: (input: RequestError) => void}) {
    useEffect(() => {
        if (input.title !== "")
        Alert.alert(title, msg, buttons)
    },
    [input, validationFun])
}