import React from 'react';

/**
 * Свойства компонента CardTableTotalDescription.
 * @prop {string} children Общее описание счетов.
 */
interface ICardTableTotalDescriptionProps {
    children: string;
}

/**
 * Компонент CardTableTotalDescription. Общее описание счетов.
 */
export class CardTableTotalDescription extends React.PureComponent<ICardTableTotalDescriptionProps> {
    public render(): JSX.Element {
        const {children} = this.props;

        return <div className="cssClass[cardTableTotalDescription]">{children}</div>;
    }
}
