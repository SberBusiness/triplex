import React, {useState} from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

// Размеры компонента Link.
export enum ELinkSize {
    SM = 'sm',
    LG = 'lg',
}

// Типы компонента Link.
export enum ELinkType {
    TEXT = 'text',
    /** @deprecated Используйте TooltipLink. */
    LINE = 'line',
}

/** Общие свойства компонента Link. */
interface ILinkCommonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Размер текста. */
    size: ELinkSize;
    /** Тело гиперссылки. */
    children: React.ReactNode;
}

/** Свойства компонента Link типа Text. */
export interface ILinkTextProps extends ILinkCommonProps {
    /** Тип ссылки. */
    linkType?: ELinkType.TEXT;
    /** Рендер функция предшествующего контента. */
    contentBefore?: () => JSX.Element;
    /** Рендер функция последующего контента. */
    contentAfter?: () => JSX.Element;
}

/** Свойства компонента Link типа Line. */
export interface ILinkLineProps extends ILinkCommonProps {
    /** Тип ссылки. */
    linkType?: ELinkType.LINE;
    /** Рендер функция предшествующего контента. */
    contentBefore?: never;
    /** Рендер функция последующего контента. */
    contentAfter?: never;
}

/** Свойства компонента Link. */
type TLinkProps = ILinkTextProps | ILinkLineProps;

/** Гиперссылка. */
export const Link = React.forwardRef<HTMLAnchorElement, TLinkProps>(
    ({children, className, linkType = ELinkType.TEXT, size, onBlur, onMouseDown, contentBefore, contentAfter, ...rest}, ref) => {
        const [focusedByClick, setFocusedByClick] = useState(false);

        /** Обработчик нажатия мыши. */
        const handleMouseDown = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            onMouseDown?.(event);
            setFocusedByClick(true);
        };

        /** Обработчик потери фокуса. */
        const handleBlur = (event: React.FocusEvent<HTMLAnchorElement>) => {
            onBlur?.(event);
            if (event.target !== document.activeElement) {
                setFocusedByClick(false);
            }
        };

        /** Рендер функция предшествующего контента. */
        const renderContentBefore = () =>
            contentBefore ? (
                <>
                    {/* Zero-width space необходим для правильного выравнивания контента. */}
                    {'\u200B'}
                    {contentBefore()}
                </>
            ) : null;

        /** Рендер функция последующего контента. */
        const renderContentAfter = () => (contentAfter ? contentAfter() : null);

        /** Рендерит как простой текст. */
        const renderAsSimpleText = (text: string) => {
            const words = text.split(' ');

            if (words.length < 2 || (words.length < 3 && contentBefore && contentAfter)) {
                const className = classnames('cssClass[wordWithContent]', {
                    'cssClass[after]': Boolean(contentAfter),
                    'cssClass[before]': Boolean(contentBefore),
                });
                return (
                    <span className={className}>
                        {renderContentBefore()}
                        {text}
                        {renderContentAfter()}
                    </span>
                );
            }

            const firstWord = words[0];
            const lastWord = words[words.length - 1];
            const restWords = words.slice(1, -1).join(' ');

            const classNameBefore = classnames('cssClass[wordWithContent]', {
                'cssClass[before]': Boolean(contentBefore),
            });
            const firstNode = contentBefore ? (
                <span className={classNameBefore}>
                    {renderContentBefore()}
                    {firstWord}
                </span>
            ) : (
                firstWord
            );

            const classNameAfter = classnames('cssClass[wordWithContent]', {
                'cssClass[after]': Boolean(contentAfter),
            });
            const lastNode = contentAfter ? (
                <span className={classNameAfter}>
                    {lastWord}
                    {renderContentAfter()}
                </span>
            ) : (
                lastWord
            );

            return (
                <>
                    {firstNode} {restWords} {lastNode}
                </>
            );
        };

        /** Рендерит как React Nodes. */
        const renderAsReactNode = (node: React.ReactNode) => {
            const firstNode = contentBefore ? contentBefore() : null;
            const lastNode = contentAfter ? contentAfter() : null;
            return (
                <>
                    {firstNode}
                    {node}
                    {lastNode}
                </>
            );
        };

        const renderContent = (children: React.ReactNode) =>
            typeof children === 'string' ? renderAsSimpleText(children) : renderAsReactNode(children);

        const content = (contentBefore || contentAfter) && linkType === ELinkType.TEXT ? renderContent(children) : children;

        return (
            <a
                role="link"
                {...rest}
                className={classnames(className, 'cssClass[link]', 'hoverable', {
                    'cssClass[focusVisible]': !focusedByClick,
                    'cssClass[lg]': size === ELinkSize.LG,
                    'cssClass[line]': linkType === ELinkType.LINE,
                    'cssClass[sm]': size === ELinkSize.SM,
                    'cssClass[text]': linkType === ELinkType.TEXT,
                })}
                onBlur={handleBlur}
                onMouseDown={handleMouseDown}
                data-tx={process.env.npm_package_version}
                ref={ref}
            >
                {content}
            </a>
        );
    }
);

Link.displayName = 'Link';
