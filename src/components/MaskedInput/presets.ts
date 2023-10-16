import {TMaskedInputMask} from './MaskedInput';

export interface TMaskedInputPresets {
    // Предзаготовленный набор плейсхолдеров масок.
    placeholderMasks: {
        // Номер автомобиля A000AA 00.
        carNumber: string;
        // Номер карты 0000 0000 0000 0000 (от 16 до 20 символов).
        cardNumber: string;
        // Дата дд.мм.гггг.
        date: string;
        // ИНН 0000000000 (от 10 до 12 символов).
        inn: string;
        // Единый лицевой счёт поставщика услуг (ЖКУ) 00АА000000.
        zhkuAccount: string;
        // Идентификатор ЖКУ 00АА000000-00.
        zhkuId: string;
        // Идентификатор платёжного документа (ЖКУ) 00АА000000-00-0000.
        zhkuPaymentDocumentId: string;
    };
    // Предзаготовленный набор масок.
    masks: {
        // Номер счета 00000 000 0 00000000000.
        account: TMaskedInputMask;
        // БИК 000 000 000.
        bic: TMaskedInputMask;
        // Номер автомобиля A000AA 00.
        carNumber: TMaskedInputMask;
        // Номер карты 0000 0000 0000 0000 (от 16 до 20 символов).
        cardNumber: TMaskedInputMask;
        // Дата.
        date: TMaskedInputMask;
        // Водительское удостоверение 00 00 000000.
        driversLicense: TMaskedInputMask;
        // ИНН 0000000000 (от 10 до 12 символов).
        inn: TMaskedInputMask;
        // КБК 00000000000000000000.
        kbk: TMaskedInputMask;
        // КПП 000000000.
        kpp: TMaskedInputMask;
        // Широта 00.000000.
        latitude: TMaskedInputMask;
        // Долгота 00.000000.
        longitude: TMaskedInputMask;
        // ОГРН 00000000000000000000.
        ogrn: TMaskedInputMask;
        // ОКТМО 00000000.
        oktmo: TMaskedInputMask;
        // Паспорт РФ.
        passport: {
            // Код подразделения 000-000.
            departmentCode: TMaskedInputMask;
            // Номер 000000.
            number: TMaskedInputMask;
            // Серия 00 00.
            series: TMaskedInputMask;
        };
        phone: TMaskedInputMask;
        // Индекс 000000.
        postalCode: TMaskedInputMask;
        // СНЛС 000-000-000 00.
        snils: TMaskedInputMask;
        // УИН 00000000000000000000.
        uin: TMaskedInputMask;
        // Единый лицевой счёт поставщика услуг (ЖКУ) 00АА000000.
        zhkuAccount: TMaskedInputMask;
        // Идентификатор ЖКУ 00АА000000-00.
        zhkuId: TMaskedInputMask;
        // Идентификатор платёжного документа (ЖКУ) 00АА000000-00-0000.
        zhkuPaymentDocumentId: TMaskedInputMask;
    };
}

export const presets: TMaskedInputPresets = {
    // Предзаготовленный набор плейсхолдеров масок.
    placeholderMasks: {
        // Номер автомобиля A000AA00. Пустые пробелы в конце - под дополнительные не подсвеченные символы.
        carNumber: 'A000AA00 ',
        // Номер карты 0000 0000 0000 0000 (от 16 до 20 символов). Пустые пробелы в конце - под дополнительные не подсвеченные символы.
        cardNumber: '0000 0000 0000 0000     ',
        // Дата дд.мм.гггг.
        date: 'дд.мм.гггг',
        // ИНН 0000000000 (от 10 до 12 символов). Пустые пробелы в конце - под дополнительные не подсвеченные символы.
        inn: '0000000000  ',
        // Единый лицевой счёт поставщика услуг (ЖКУ) 00АА000000.
        zhkuAccount: '00АА000000',
        // Идентификатор ЖКУ 00АА000000-00.
        zhkuId: '00АА000000-00',
        // Идентификатор платёжного документа (ЖКУ) 00АА000000-00-0000.
        zhkuPaymentDocumentId: '00АА000000-00-0000',
    },
    // Предзаготовленный набор масок.
    masks: {
        account: [
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
        ],
        // БИК 000000000.
        bic: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
        // Номер автомобиля A000AA 00.
        carNumber: [/[а-яА-ЯЁё]/, /\d/, /\d/, /\d/, /[а-яА-ЯЁё]/, /[а-яА-ЯЁё]/, /\d/, /\d/, /\d/],
        // Номер карты 0000 0000 0000 0000 0000.
        cardNumber: [
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
        ],
        date: [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/],
        // Водительское удостоверение 00 00 000000.
        driversLicense: [/\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
        // ИНН 0000000000 (от 10 до 12 символов).
        inn: Array<RegExp>(12).fill(/\d/),
        // КБК 00000000000000000000.
        kbk: Array<RegExp>(20).fill(/\d/),
        // КПП 000000000.
        kpp: Array<RegExp>(9).fill(/\d/),
        // Широта 00.000000.
        latitude: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
        // Долгота 00.000000.
        longitude: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
        // ОГРН 00000000000000000000.
        ogrn: Array<RegExp>(20).fill(/\d/),
        // ОКТМО 00000000.
        oktmo: Array<RegExp>(8).fill(/\d/),
        passport: {
            // Код подразделения 000-000.
            departmentCode: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
            // Номер 000000.
            number: Array<RegExp>(6).fill(/\d/),
            // Серия 00 00.
            series: [/\d/, /\d/, ' ', /\d/, /\d/],
        },
        phone: ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
        // Индекс 000000.
        postalCode: Array<RegExp>(6).fill(/\d/),
        // УИН 00000000000000000000.
        uin: Array<RegExp>(20).fill(/\d/),
        // СНИЛС 000-000-000 00.
        snils: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, ' ', /\d/, /\d/],
        // Единый лицевой счёт поставщика услуг (ЖКУ) 00АА000000.
        zhkuAccount: [/\d/, /\d/, /[а-яА-ЯЁё]/, /[а-яА-ЯЁё]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
        // Идентификатор ЖКУ 00АА000000-00.
        zhkuId: [/\d/, /\d/, /[а-яА-ЯЁё]/, /[а-яА-ЯЁё]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
        // Идентификатор платёжного документа (ЖКУ) 00АА000000-00-0000.
        zhkuPaymentDocumentId: [
            /\d/,
            /\d/,
            /[а-яА-ЯЁё]/,
            /[а-яА-ЯЁё]/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
        ],
    },
};