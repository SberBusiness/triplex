import * as React from 'react';
import {classnames} from '@sberbusiness/triplex/common/utils/classnames/classnames';

/**
 * Свойства компонента SubLabel.
 * @prop {string} children Текст подлейбла.
 */
interface ISubLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Компонент SubLabel. Предназначен для вывода нередактируемого текста-описания совместно с компонентом SubValue.
 * Располагается в две строки максимум. Должен лежать внутри компонента Col(колонка), который в свою очередь, в SubRow(подстрока).
 * Всё выводится в компоненте Field - с левой стороны SubLabel, справа SubValue.
 */
export const SubLabel: React.FC<ISubLabelProps> = ({children, className, ...htmlDivAttributes}) => (
    <div className={classnames(className, 'cssClass[subLabel]')} {...htmlDivAttributes}>
        {children}
    </div>
);
