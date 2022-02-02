import * as React from 'react';

/**
 * Свойства компонента LabelCodeNumber.
 * @prop {React.ReactText} children Код-номер лейбла.
 */
interface ILabelCodeNumberProps {
    children: React.ReactText;
}

/**
 * Компонент LabelCodeNumber. Код-номер лейбла. Может иметь максимум 3 строчные или прописные буквы и/или цифры.
 */
export class LabelCodeNumber extends React.Component<ILabelCodeNumberProps> {
    public render() {
        const {children} = this.props;

        if (!String(children).match(/^[А-яA-z0-9]{1,3}$/)) {
            throw new Error('You can use maximum of three characters(letters and/or numbers) in the code number');
        }

        return <span className="cssClass[codeNumber]">{children}</span>;
    }
}
