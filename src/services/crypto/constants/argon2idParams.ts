import { Argon2Options } from "react-native-argon2";

export const KDF_PARAMS: Argon2Options = {
    hashLength: 32,
    iterations: 3,
    memory: 131072,
    parallelism: 1,
    mode: "argon2id",
}