import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import React, {useState} from 'react';

export enum ELinkSize {
    SM = 'SM',
    LG = 'LG',
}

export enum ELinkType {
    TEXT = 'text',
    LINE = 'line',
}

/** Свойства компонента Link. */
interface ILinkCommonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Размер текста. */
    size: ELinkSize;
    /** Тело гиперссылки. */
    children: React.ReactNode;
}

export interface ILinkTextProps extends ILinkCommonProps {
    /** Гиперссылка без подчеркивания. */
    linkType: ELinkType.TEXT;
    /** Рендер функция предшествующего контента. */
    contentBefore?: () => JSX.Element;
    /** Рендер функция последующего контента. */
    contentAfter?: () => JSX.Element;
}

export interface ILinkLineProps extends ILinkCommonProps {
    /** Гиперссылка с подчеркиванием. */
    linkType: ELinkType.LINE;
    /** Рендер функция предшествующего контента. */
    contentBefore?: never;
    /** Рендер функция последующего контента. */
    contentAfter?: never;
}

type TLinkProps = ILinkTextProps | ILinkLineProps;

/** Компонент гиперссылки. */
export const Link = React.forwardRef<HTMLAnchorElement, TLinkProps>(
    ({children, className, linkType, size, onBlur, onMouseDown, contentBefore, contentAfter, ...rest}, ref) => {
        const [focusedByClick, setFocusedByClick] = useState(false);

        const handleMouseDown = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            onMouseDown?.(event);
            setFocusedByClick(true);
        };

        const handleBlur = (event: React.FocusEvent<HTMLAnchorElement>) => {
            onBlur?.(event);
            if (event.target !== document.activeElement) {
                setFocusedByClick(false);
            }
        };

        const renderContentBefore = () =>
            contentBefore ? (
                <>
                    {/* Zero-width space необходим для правильного выравнивания контента. */}
                    {'\u200B'}
                    {contentBefore()}
                </>
            ) : null;

        const renderContentAfter = () => (contentAfter ? contentAfter() : null);

        /** Рендерит как простой текст. */
        const renderAsSimpleText = (text: string) => {
            const words = text.split(' ');

            if (words.length < 2 || (words.length < 3 && contentBefore && contentAfter)) {
                const className = classnames('cssClass[wordWithContent]', {
                    'cssClass[before]': Boolean(contentBefore),
                    'cssClass[after]': Boolean(contentAfter),
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
                ref={ref}
                tabIndex={0}
                role="link"
                {...rest}
                className={classnames(className, 'cssClass[link]', 'hoverable', {
                    'cssClass[sm]': size === ELinkSize.SM,
                    'cssClass[lg]': size === ELinkSize.LG,
                    'cssClass[text]': linkType === ELinkType.TEXT,
                    'cssClass[line]': linkType === ELinkType.LINE,
                    'cssClass[focusVisible]': !focusedByClick,
                })}
                onBlur={handleBlur}
                onMouseDown={handleMouseDown}
            >
                {content}
            </a>
        );
    }
);

Link.displayName = 'Link';
