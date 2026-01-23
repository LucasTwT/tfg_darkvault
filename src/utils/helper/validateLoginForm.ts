import { ErrorLogindata, Logindata } from "@/src/reducers/Create/useCreateLogin.d";
import { loginValidators } from "../validations/Create";

export function validateLoginForm(
  data: Logindata,
  t: any,
): { isValid: boolean; errors: Partial<ErrorLogindata> } {
  const errors: Partial<ErrorLogindata> = {};

  (Object.keys(data) as (keyof Logindata)[]).forEach((field) => {
    const validator = loginValidators[field];
    const error = validator(data[field], t);

    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
