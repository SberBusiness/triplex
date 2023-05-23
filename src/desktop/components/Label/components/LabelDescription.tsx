import * as React from 'react';

/**
 * Свойства компонента LabelDescription.
 * @prop {string} children Дополнительное описание лейбла.
 */
interface ILabelDescriptionProps {
    children: string;
}

/**
 * Компонент LabelDescription. Дополнительное описание лейбла в виде текста под ним.
 */
export class LabelDescription extends React.Component<ILabelDescriptionProps> {
    public render() {
        const {children} = this.props;

        return <div className="cssClass[description]">{children}</div>;
    }
}
