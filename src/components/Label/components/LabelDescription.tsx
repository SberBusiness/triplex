import React from 'react';

/** Свойства компонента LabelDescription. */
interface ILabelDescriptionProps {
    children?: React.ReactNode;
}

/** Дополнительное описание лейбла в виде текста под ним. */
export const LabelDescription: React.FC<ILabelDescriptionProps> = ({children}) => <div className="cssClass[description]">{children}</div>;
