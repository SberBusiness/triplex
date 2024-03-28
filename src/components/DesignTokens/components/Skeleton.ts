import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Skeleton.
export const designTokensComponentsSkeletonKeys = ['BackgroundImage_Light', 'BackgroundImage_Dark'] as const;
// Тип, содержащий названия токенов компонента Skeleton.
export type TDesignTokensComponentsSkeletonKeys = (typeof designTokensComponentsSkeletonKeys)[number];
// Тип, содержащий названия токенов компонента Skeleton и их значения.
export type TDesignTokensComponentsSkeletonValue = Record<TDesignTokensComponentsSkeletonKeys, TDesignTokenValue>;
// Тип, содержащий названия токенов компонента Skeleton и их значения в светлой и темной теме.
export type TDesignTokensComponentsSkeletonValues = Record<TDesignTokensComponentsSkeletonKeys, TDesignTokenValues>;
// Тип локальных токенов компонента Skeleton.
export type TDesignTokensComponentsSkeleton = {Skeleton: TDesignTokensComponentsSkeletonValue};

// Токены компонента Skeleton в светлой и темной темах.
export const Skeleton_Tokens: TDesignTokensComponentsSkeletonValues = {
    BackgroundImage_Light: [
        {value: 'linear-gradient(88deg, #FFFFFF 0%, #E4E8EB 70.95%, #FFFFFF 100%)'},
        {value: 'linear-gradient(88deg, #1F1F22 0%, #565B62 70.95%, #1F1F22 100%)'},
    ], // var(--triplex-Skeleton-BackgroundImage_Light)
    BackgroundImage_Dark: [
        {value: 'linear-gradient(88deg, #F2F4F7 0%, #E4E8EB 70.95%, #F2F4F7 100%)'},
        {value: 'linear-gradient(88deg, #565B62 0%, #1F1F22 70.95%, #565B62 100%)'},
    ], // var(--triplex-Skeleton-BackgroundImage_Dark)
};
