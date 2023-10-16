import React from 'react';

/**
 * Свойства компонента CardTableTotalTitle.
 * @prop {string} children Текст заголовка.
 */
interface ICardTableTotalTitleProps {
    children: string;
}

/**
 * Компонент CardTableTotalTitle. Заголовок общей карточки.
 */
export class CardTableTotalTitle extends React.PureComponent<ICardTableTotalTitleProps> {
    public render(): JSX.Element {
        const {children} = this.props;

        return <div className="cssClass[cardTableTotalTitle]">{children}</div>;
    }
}
