import React from 'react';

/**
 * Свойства компонента LabelCodeNumber.
 */
interface ILabelCodeNumberProps {
    children: React.ReactText;
}

/**
 * Компонент LabelCodeNumber. Код-номер лейбла.
 */
export const LabelCodeNumber: React.FC<ILabelCodeNumberProps> = ({children}) => <span className="cssClass[codeNumber]">{children}</span>;
