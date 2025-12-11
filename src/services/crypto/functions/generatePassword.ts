import { PasswordGeneratorOptions, PasswordType } from "../types/password.d";
import { PASSWORD_CONSTANTS, WORD_LIST } from "../constants/passwords";
import * as Random from 'expo-crypto'

export function generatePassword(opts: PasswordGeneratorOptions): string {
    if (opts.type === PasswordType.memorable) {
        return generateMemorable(opts);
    }

    if (opts.type === PasswordType.random) {
        return generateRandomPassword(opts);
    }
    
    throw new Error("Invalid type");
}

function generateRandomPassword(opts: PasswordGeneratorOptions): string {
    let charset = "";

    if (opts.includeLowercase !== false) charset += PASSWORD_CONSTANTS.LOWERCASE;
    if (opts.includeUppercase) charset += PASSWORD_CONSTANTS.UPPERCASE;
    if (opts.includeNumbers) charset += PASSWORD_CONSTANTS.NUMBERS;

    if (opts.includeSymbols) {
        charset += opts.symbolsSet ?? PASSWORD_CONSTANTS.SYMBOLS;
    }

    if (opts.avoidAmbiguous) {
        charset = charset
            .split("")
            .filter(ch => !PASSWORD_CONSTANTS.AMBIGUOUS.includes(ch))
            .join("");
    }

    if (opts.excludeCharacters) {
        charset = charset
            .split("")
            .filter(ch => !opts.excludeCharacters!.includes(ch))
            .join("");
    }

    if (!charset.length) throw new Error("Character set empty");


    const length = opts.length ?? 16;
    let password = "";

    const bytes = Random.getRandomBytes(length);

    for (let i = 0; i < length; i++) {
        const idx = bytes[i] % charset.length;
        const char = charset[idx];

        if (!opts.allowRepeating && password.includes(char)) {
            i--;
            continue;
        }

        password += char;
    }

    return password;
}

function generateMemorable(opts: PasswordGeneratorOptions): string {
    const count = opts.wordsCount ?? 4;
    const sep = opts.separator ?? "-";

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
