//TableBasicExampleEnums.ts
export enum EDocStatus {
    SUCCESS = 'Исполнено',
    ERROR = 'Ошибка',
    WARNING = 'Важное',
    WAITING = 'Ожидание',
}

export enum EDocFilter {
    ALL = 'Все',
    EXECUTED = 'Исполненные',
    REJECTED = 'Отказанные',
    CREATED = 'Созданные',
    NOT_REJECTED = 'Неотклоненные',
}
