import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

interface IHeaderTitleContentTextProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * Основной заголовок.
 */
export const HeaderTitleContentText: React.FC<IHeaderTitleContentTextProps> = ({children, className, ...HTMLHeadingAttributes}) => (
    <h1
        className={classnames(className, 'cssClass[globalHeaderTitleContentText]')}
        //* При открытии LightBox/ModalWindow - заголовок будет зачитываться VoiceOverом.
        data-first-interaction-element={true}
        tabIndex={-1}
        {...HTMLHeadingAttributes}
    >
        {children}
    </h1>
);

HeaderTitleContentText.displayName = 'HeaderTitleContentText';
