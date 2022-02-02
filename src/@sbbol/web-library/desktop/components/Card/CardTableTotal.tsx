import {CardTableTotalDescription} from '@sbbol/web-library/desktop/components/Card/components/CardTableTotalDescription';
import {CardTableTotalTitle} from '@sbbol/web-library/desktop/components/Card/components/CardTableTotalTitle';
import {classnames} from '@sbbol/web-library/common/utils/classnames/classnames';
import * as React from 'react';

/**
 * Свойства компонента CardTableTotal.
 */
interface ICardTableTotalProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

/**
 * Компонент CardTableTotal. Общая карточка, состоящая из заголовка(Title) и описания счета(Description).
 */
export class CardTableTotal extends React.PureComponent<ICardTableTotalProps> {
    public static displayName = 'CardTableTotal';
    public static Title = CardTableTotalTitle;
    public static Description = CardTableTotalDescription;

    public render(): JSX.Element {
        const {children, className, ...htmlDivAttributes} = this.props;

        return (
            <div className={classnames(className, 'cssClass[cardTableTotal]')} {...htmlDivAttributes}>
                {children}
            </div>
        );
    }
}
