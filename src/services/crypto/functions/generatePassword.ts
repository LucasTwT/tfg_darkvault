import { PasswordGeneratorOptions, PasswordType } from "@/src/reducers/Create/useGenerateKey.d";
import { PASSWORD_CONSTANTS, WORD_LIST } from "../constants/passwords";
import * as Random from 'expo-crypto'

export function generatePassword (keyOptions : PasswordGeneratorOptions): string {
    switch (keyOptions.type) {
        case PasswordType.memorable: {
            return generateMemorable(keyOptions)
        }

        case PasswordType.random: {
            return generateRandomPassword(keyOptions)
        }
    }
}


export function generateRandomPassword(
  opts: PasswordGeneratorOptions
): string {
  let charset = "";

  charset += PASSWORD_CONSTANTS.LOWERCASE;
  if (opts.includeUppercase) charset += PASSWORD_CONSTANTS.UPPERCASE;
  if (opts.includeNumbers) charset += PASSWORD_CONSTANTS.NUMBERS;
  if (opts.includeSymbols) charset += PASSWORD_CONSTANTS.SYMBOLS;

  if (!charset.length) {
    throw new Error("No character sets selected");
  }

  if (opts.avoidAmbiguous) {
    charset = charset
      .split("")
      .filter(ch => !PASSWORD_CONSTANTS.AMBIGUOUS.includes(ch))
      .join("");
  }

  if (!charset.length) {
    throw new Error("Character set empty after filtering");
  }

  const length = Math.max(1, opts.length ?? 16);
  const chars = charset.split("");

  const canRepeat = opts.allowRepeating || chars.length < length;

  if (!canRepeat) {
    const shuffled = [...chars];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const rand = Random.getRandomBytes(1)[0] % (i + 1);
      [shuffled[i], shuffled[rand]] = [shuffled[rand], shuffled[i]];
    }

    return shuffled.slice(0, length).join("");
  }

  const bytes = Random.getRandomBytes(length);
  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars[bytes[i] % chars.length];
  }

  return password;
}


function generateMemorable(opts: PasswordGeneratorOptions): string {
    const count = opts.wordsCount ?? 4;
    const sep = "-";

    let words: string[] = [];

    for (let i = 0; i < count; i++) {
        const index = getRandomInt(WORD_LIST.length);
        words.push(WORD_LIST[index]);
    }

    return words.join(sep);
}

function getRandomInt(max: number): number {
    return Random.getRandomBytes(1)[0] % max;
}
