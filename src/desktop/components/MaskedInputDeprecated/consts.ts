import {TFormatCharacters} from '@sberbusiness/triplex/desktop/components/MaskedInputDeprecated/types';

export const ESCAPE_CHAR = '\\';
export const DIGIT_RE = /^\d$/;
export const LETTER_RE = /^[A-Za-zА-Яа-я]$/;
export const ALPHANNUMERIC_RE = /^[\dA-Za-zА-Яа-я]$/;
export const DEFAULT_PLACEHOLDER_CHAR = '_';
export const DEFAULT_FORMAT_CHARACTERS: TFormatCharacters = {
    '#': {
        validate(char) {
            return ALPHANNUMERIC_RE.test(char);
        },
        transform(char) {
            return char.toUpperCase();
        },
    },
    '*': {
        validate(char) {
            return ALPHANNUMERIC_RE.test(char);
        },
    },
    A: {
        validate(char) {
            return LETTER_RE.test(char);
        },
        transform(char) {
            return char.toUpperCase();
        },
    },
    a: {
        validate(char) {
            return LETTER_RE.test(char);
        },
    },
    d: {
        validate(char) {
            return DIGIT_RE.test(char);
        },
    },
};
