import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {FocusTrapUtils} from '@sberbusiness/triplex/utils/focus/FocusTrapUtils';

/** Свойства компонента HeaderTitleContentText. */
interface IHeaderTitleContentTextProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/** Основной заголовок. */
export const HeaderTitleContentText: React.FC<IHeaderTitleContentTextProps> = ({children, className, ...HTMLHeadingAttributes}) => (
    <h1
        className={classnames(className, 'cssClass[globalHeaderTitleContentText]')}
        //* При открытии LightBox/ModalWindow - заголовок будет зачитываться VoiceOverом.
        {...{[FocusTrapUtils.firstInteractionElementDataAttr]: true}}
        tabIndex={-1}
        {...HTMLHeadingAttributes}
    >
        {children}
    </h1>
);

HeaderTitleContentText.displayName = 'HeaderTitleContentText';
