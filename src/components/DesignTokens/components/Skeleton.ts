import {TDesignTokenValue, TDesignTokenValues} from '@sberbusiness/triplex/components/DesignTokens/types/DesignTokenTypes';

// Название токенов компонента Skeleton.
export const designTokensComponentsSkeletonKeys = ['BackgroundImage_Dark', 'BackgroundImage_Light'] as const;
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
    BackgroundImage_Dark: [
        {value: 'linear-gradient(90deg, #F2F4F7 0%, #E4E8EB 71%, #F2F4F7 100%)'},
        {value: 'linear-gradient(90deg, #2D2D30 0%, #1F1F22 71%, #2D2D30 100%)'},
    ], // var(--triplex-Skeleton-BackgroundImage_Dark)
    BackgroundImage_Light: [
        {value: 'linear-gradient(90deg, #FFFFFF 0%, #F2F4F7 71%, #FFFFFF 100%)'},
        {value: 'linear-gradient(90deg, #1F1F22 0%, #2D2D30 71%, #1F1F22 100%)'},
    ], // var(--triplex-Skeleton-BackgroundImage_Light)
};
