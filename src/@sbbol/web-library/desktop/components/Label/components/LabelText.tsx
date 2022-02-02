import * as React from 'react';

/**
 * Свойства компонента LabelText.
 * @prop {string} children Текст лейбла.
 * @prop {string} [htmlFor] Атрибут for для связанного с данным лейблом input.
 */
interface ILabelTextProps {
    children: string;
    htmlFor?: string;
}

/**
 * Компонент LabelText. Основной текст лейбла.
 */
export class LabelText extends React.Component<ILabelTextProps> {
    public render() {
        const {children, htmlFor} = this.props;

        return (
            <label htmlFor={htmlFor} className="cssClass[label]">
                {children}
            </label>
        );
    }
}
