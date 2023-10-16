import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';

/**
 * Свойства компонента SubValue.
 * @prop {string} children Нередактируемый текст(значение).
 */
interface ISubValueProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Компонент SubValue. Предназначен для вывода нередактируемого значения совместно с компонентом SubLabel.
 * Должен лежать внутри компонента Col(колонка), который в свою очередь, в Row или SubRow.
 * Всё выводится в компоненте Field - с левой стороны SubLabel, справа SubValue.
 */
export const SubValue: React.FC<ISubValueProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[subValue]')} {...htmlDivAttributes}>
        {children}
    </div>
);
