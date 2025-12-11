export function validateIdentifier(identifier: string, t: any) {
    if (!identifier || identifier.trim() === "")
        return t("auth.login.validations.identifierRequired")
    return ""
}

export function validatePassword(password: string, t: any) {
    if (!password || password.trim() === "")
        return t("auth.login.validations.passwordRequired")
    return ""
}