import React from 'react';
import {EButtonSize, EButtonTheme} from '@sberbusiness/triplex/desktop/components/Button/enums';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {DotsIcon} from '@sberbusiness/triplex/desktop/common/icons';
import {SpinnersmallwhiteAniIcon20} from '@sberbusiness/icons/SpinnersmallwhiteAniIcon20';
import {SpinnersmallAniIcon20} from '@sberbusiness/icons/SpinnersmallAniIcon20';
import {ButtonBase} from '../protected/ButtonBase/ButtonBase';

/** Свойства кнопки типа General. */
export interface IButtonGeneralProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Тема кнопки. */
    theme: EButtonTheme.GENERAL;
    /** Размер кнопки. */
    size: EButtonSize;
    /** Блочный режим. */
    block?: boolean;
    /** Режим загрузки. */
    loading?: boolean;
    /** Иконка загрузки. */
    spinnerIcon?: React.ReactElement;
}

/** Свойства кнопки типа Secondary. */
export interface IButtonSecondaryProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Тема кнопки. */
    theme: EButtonTheme.SECONDARY;
    /** Размер кнопки. */
    size: EButtonSize;
    /** Блочный режим. */
    block?: boolean;
    /** Режим загрузки. */
    loading?: boolean;
    /** Иконка загрузки. */
    spinnerIcon?: React.ReactElement;
}

/** Свойства кнопки типа Danger. */
export interface IButtonDangerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Тема кнопки. */
    theme: EButtonTheme.DANGER;
    /** Размер кнопки. */
    size: EButtonSize;
    /** Блочный режим. */
    block?: boolean;
    /** Режим загрузки. */
    loading?: boolean;
    /** Иконка загрузки. */
    spinnerIcon?: React.ReactElement;
}

/** Свойства кнопки типа Dots. */
export interface IButtonDotsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Тема кнопки. */
    theme: EButtonTheme.DOTS;
    /** Размер кнопки. */
    size: EButtonSize;
    /** Блочный режим. */
    block?: never;
    /** Режим загрузки. */
    loading?: never;
    /** Иконка загрузки. */
    spinnerIcon?: never;
}

/** Свойства кнопки типа Link. */
export interface IButtonLinkProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
    /** Тема кнопки. */
    theme: EButtonTheme.LINK;
    /** Размер кнопки. */
    size: EButtonSize;
    /** Блочный режим. */
    block?: never;
    /** Режим загрузки. */
    loading?: never;
    /** Иконка загрузки. */
    spinnerIcon?: never;
}

/** Свойства кнопки типа Tile. */
export interface IButtonTileProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Тема кнопки. */
    theme: EButtonTheme.TILE;
    /** Размер кнопки. */
    size?: never;
    /** Блочный режим. */
    block?: boolean;
    /** Режим загрузки. */
    loading?: boolean;
    /** Иконка загрузки. */
    spinnerIcon?: React.ReactElement;
}

/** Свойства Button. */
export type TButtonProps =
    | IButtonGeneralProps
    | IButtonSecondaryProps
    | IButtonDangerProps
    | IButtonDotsProps
    | IButtonLinkProps
    | IButtonTileProps;

/** Возвращает CSS класс темы кнопки. */
const getButtonThemeCssClass = (theme: EButtonTheme) => {
    switch (theme) {
        case EButtonTheme.GENERAL:
            return 'cssClass[general]';
        case EButtonTheme.SECONDARY:
            return 'cssClass[secondary]';
        case EButtonTheme.DANGER:
            return 'cssClass[danger]';
        case EButtonTheme.DOTS:
            return 'cssClass[dots]';
        case EButtonTheme.LINK:
            return 'cssClass[link]';
        case EButtonTheme.TILE:
            return 'cssClass[tile]';
    }
};

/** Возвращает CSS класс размера кнопки. */
const getButtonSizeCssClass = (size?: EButtonSize) => {
    switch (size) {
        case EButtonSize.MD:
            return 'cssClass[MD]';
        case EButtonSize.SM:
            return 'cssClass[SM]';
    }
};

/** Кнопка. */
export const Button = React.forwardRef<HTMLButtonElement, TButtonProps>((props, ref) => {
    const {children, className, theme, size, block, loading, spinnerIcon, ...rest} = props;
    const {'aria-expanded': expanded} = props;
    const classNames = classnames(
        'cssClass[button]',
        getButtonThemeCssClass(theme),
        getButtonSizeCssClass(size),
        {'cssClass[block]': !!block, 'cssClass[loading]': !!loading, 'cssClass[expanded]': !!expanded},
        className
    );

    /** Отрисовка иконки загрузки. */
    const renderLoadingIcon = () => {
        switch (theme) {
            case EButtonTheme.GENERAL:
            case EButtonTheme.DANGER:
                return <SpinnersmallwhiteAniIcon20 className="cssClass[globalSpin]" />;
            case EButtonTheme.SECONDARY:
            case EButtonTheme.TILE:
                return <SpinnersmallAniIcon20 className="cssClass[globalSpin]" />;
        }
    };

    return (
        <ButtonBase className={classNames} tabIndex={loading ? -1 : undefined} ref={ref} {...rest}>
            <span className="cssClass[content]">
                {theme === EButtonTheme.DOTS ? <DotsIcon className="cssClass[dotsIcon]" /> : children}
            </span>
            {loading && <span className="cssClass[spinner]">{spinnerIcon || renderLoadingIcon()}</span>}
        </ButtonBase>
    );
});

Button.displayName = 'Button';
