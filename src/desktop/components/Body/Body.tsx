import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';
import {EBodyBackgroundColor} from '@sberbusiness/triplex/desktop/components/Body/enums';
import * as React from 'react';

/**
 * Свойства компонента.
 *
 * @prop {boolean} [grayBackground] Добавляет серый фон для body.
 */
export interface IBodyProps extends React.HTMLAttributes<HTMLDivElement> {
    backgroundColor?: EBodyBackgroundColor;
}

/**
 * Компонент Body, используется как один из детей(Header, Body и Footer) компонента Page.
 * Используется как контейнер для контента страницы. Имеет дефолтные отступы со всех сторон.
 */
export const Body: React.FC<IBodyProps> = ({children, className, backgroundColor = EBodyBackgroundColor.WHITE, ...htmlDivAttributes}) => (
    <div
        className={classnames('cssClass[body]', className, {
            'cssClass[withGrayBackground]': backgroundColor === EBodyBackgroundColor.GRAY,
            'cssClass[withDarkGrayBackground]': backgroundColor === EBodyBackgroundColor.DARKGRAY,
            'cssClass[withWhiteBackground]': backgroundColor === EBodyBackgroundColor.WHITE,
        })}
        {...htmlDivAttributes}
    >
        <div className="cssClass[bodyInner]">{children}</div>
    </div>
);

Body.displayName = 'Body';
