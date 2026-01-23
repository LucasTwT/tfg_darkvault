import { Vault } from "@/src/reducers/Home/useHome.d";
import { LoginState, Validator } from "@/src/reducers/Create/useCreateLogin.d";

// Create vault:
export function validateVaultName(name: string, t: any, vaults: Vault[]) {
    if (name.trim().length === 0) return t("create.vault.validations.vaultNameRequired")
    if (vaults.filter((vault) => vault.name === name).length > 0) return t("create.vault.validations.vaultNameAlreadyExist")
    return ""
}

// Create Login:

export const validateTitle: Validator = (value, t) => {
  if (!value.trim()) return t("create.login.loginForm.validations.titleRequired");
  if (value.length < 3) return t("create.login.loginForm.validations.titleMinLength", { count: 3 });
  return "";
};

export const validateEmail: Validator = (value, t) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return t("create.login.loginForm.validations.invalidEmail");

  return "";
};

export const validateUrl: Validator = (value, t) => {
  if (!value.trim()) return "";

  try {
    new URL(value);
    return "";
  } catch {
    return t("create.login.loginForm.validations.invalidUrl");
  }
};

export const validateNote: Validator = (value, t) => {
  if (!value) return "";
  if (value.length > 250) return t("create.login.loginForm.validations.noteMaxLength", { count: 250 });
  return "";
};

export const validatePassword: Validator = (value, t) => {
  if (!value) return t("create.login.loginForm.validations.passwordRequired");
  return "";
};


export const loginValidators: Record<
  keyof LoginState["logindata"],
  Validator
> = {
  title: validateTitle,
  email: validateEmail,
  url: validateUrl,
  note: validateNote,
  password: validatePassword,
};
