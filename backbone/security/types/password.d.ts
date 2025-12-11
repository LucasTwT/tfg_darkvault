export enum PasswordType {
    random = "random",
    memorable = "memorable",
}

export interface PasswordGeneratorOptions  {
    type: PasswordType;

    length?: number;

    includeLowercase?: boolean;
    includeUppercase?: boolean;
    includeNumbers?: boolean;
    includeSymbols?: boolean;

    avoidAmbiguous?: boolean;
    allowRepeating?: boolean;

    excludeCharacters?: string;
    symbolsSet?: string;

    // para modo memorable/passphrase
    wordsCount?: number;
    separator?: string;
    excludeWeakWords?: boolean;
};