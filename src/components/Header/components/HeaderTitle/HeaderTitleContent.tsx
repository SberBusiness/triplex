import {HeaderTitleContentText} from '@sberbusiness/triplex/components/Header/components/HeaderTitle/HeaderTitleContentText';
import {HeaderTitleContentSubhead} from '@sberbusiness/triplex/components/Header/components/HeaderTitle/HeaderTitleContentSubhead';
import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

interface IHeaderTitleContentProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IHeaderTitleContentFC extends React.FC<IHeaderTitleContentProps> {
    Text: typeof HeaderTitleContentText;
    Subhead: typeof HeaderTitleContentSubhead;
}
/**
 * Часть HeaderTitle с заголовком и подзаголовком.
 */
export const HeaderTitleContent: IHeaderTitleContentFC = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[headerTitleContent]')} {...htmlDivAttributes}>
        {children}
    </div>
);

HeaderTitleContent.Text = HeaderTitleContentText;
HeaderTitleContent.Subhead = HeaderTitleContentSubhead;
HeaderTitleContent.displayName = 'HeaderTitleContent';
