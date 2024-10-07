import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {EBodyBackgroundColor} from '@sberbusiness/triplex/components/Body/enums';

/** Свойства компонента Body. */
export interface IBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Цвет фона. */
    backgroundColor?: EBodyBackgroundColor;
}

/**
 * Компонент Body, используется как один из детей(Header, Body и Footer) компонента Page.
 * Используется как контейнер для контента страницы. Имеет дефолтные отступы со всех сторон.
 */
export const Body: React.FC<IBodyProps> = ({children, className, backgroundColor = EBodyBackgroundColor.WHITE, ...htmlDivAttributes}) => (
    <div
        className={classnames('cssClass[body]', className, {
            'cssClass[withDarkGrayBackground]': backgroundColor === EBodyBackgroundColor.DARKGRAY,
            'cssClass[withGrayBackground]': backgroundColor === EBodyBackgroundColor.GRAY,
            'cssClass[withWhiteBackground]': backgroundColor === EBodyBackgroundColor.WHITE,
        })}
        {...htmlDivAttributes}
        data-tx={process.env.npm_package_version}
    >
        <div className="cssClass[bodyInner]">{children}</div>
    </div>
);

Body.displayName = 'Body';
