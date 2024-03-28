import React from 'react';

/** Свойства компонента LabelCodeNumber. */
interface ILabelCodeNumberProps {
    children?: React.ReactNode;
}

/** Код-номер лейбла. */
export const LabelCodeNumber: React.FC<ILabelCodeNumberProps> = ({children}) => <span className="cssClass[codeNumber]">{children}</span>;
