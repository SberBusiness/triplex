import React from 'react';

/** Свойства компонента CardTableTotalDescription. */
interface ICardTableTotalDescriptionProps {
    children?: React.ReactNode;
}

/** Общее описание счетов. */
export class CardTableTotalDescription extends React.PureComponent<ICardTableTotalDescriptionProps> {
    public render(): JSX.Element {
        const {children} = this.props;

        return <div className="cssClass[cardTableTotalDescription]">{children}</div>;
    }
}
