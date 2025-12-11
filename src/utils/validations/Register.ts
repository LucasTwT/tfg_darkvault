export function validatePassword(password: string, t: any) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!password || password.trim() === "") {
    return t("auth.register.validations.passwordRequired");
  }

  if (!regex.test(password)) {
    return t("auth.register.validations.passwordInvalid");
  }

  return "";
}

export function validateUsername(username: string, t: any) {
  const regex = /^[a-zA-Z0-9_-]{3,20}$/;

  if (!username || username.trim() === "") {
    return t("auth.register.validations.usernameRequired");
  }

  if (!regex.test(username)) {
    return t("auth.register.validations.usernameInvalid");
  }

  return "";
}

export function validateEmail(email: string, t: any) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || email.trim() === "") {
    return t("auth.register.validations.emailRequired");
  }

  if (!regex.test(email)) {
    return t("auth.register.validations.emailInvalid");
  }

  return "";
}
