import React from 'react';

/** Свойства компонента CardTableTotalTitle. */
interface ICardTableTotalTitleProps {
    children?: React.ReactNode;
}

/** Заголовок общей карточки. */
export class CardTableTotalTitle extends React.PureComponent<ICardTableTotalTitleProps> {
    public render(): JSX.Element {
        const {children} = this.props;

        return <div className="cssClass[cardTableTotalTitle]">{children}</div>;
    }
}
