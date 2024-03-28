import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Notification.
export const designTokensComponentsNotificationKeys = ['Color', 'Background', 'Shadow'] as const;
// Тип, содержащий названия токенов компонента Notification.
export type TDesignTokensComponentsNotificationKeys = (typeof designTokensComponentsNotificationKeys)[number];
// Тип, содержащий названия токенов компонента Notification и их значения.
export type TDesignTokensComponentsNotificationValue = Record<TDesignTokensComponentsNotificationKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Notification и их значения в светлой и темной теме.
export type TDesignTokensComponentsNotificationValues = Record<TDesignTokensComponentsNotificationKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Notification.
export type TDesignTokensComponentsNotification = {Notification: TDesignTokensComponentsNotificationValue};

// Токены компонента Notification в светлой и темной темах.
export const Notification_Tokens: TDesignTokensComponentsNotificationValues = {
    Color: [{ref: 'Basic.700'}, {ref: 'Neutral.100'}], // var(--triplex-Notification-Color)
    Background: [{ref: 'Basic.100'}, {ref: 'Basic.500'}], // var(--triplex-Notification-Background)
    Shadow: [{value: '0px 2px 7px rgba(31, 31, 34, 0.25)'}, {value: 'none'}], // var(--triplex-Notification-Shadow)
};
