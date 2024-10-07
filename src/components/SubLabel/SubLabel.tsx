import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {EFontType, ETextSize, ELineType} from '@sberbusiness/triplex/components/Typography/enums';

/** Свойства компонента SubLabel. */
interface ISubLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Компонент SubLabel. Предназначен для вывода нередактируемого текста-описания совместно с компонентом SubValue.
 * Располагается в две строки максимум. Должен лежать внутри компонента Col(колонка), который в свою очередь, в SubRow(подстрока).
 * Всё выводится в компоненте Field - с левой стороны SubLabel, справа SubValue.
 */
export const SubLabel: React.FC<ISubLabelProps> = ({children, className, ...rest}) => (
    <Text
        tag="div"
        className={classnames('cssClass[subLabel]', className)}
        type={EFontType.SECONDARY}
        size={ETextSize.B1}
        line={ELineType.EXTRA}
        {...rest}
    >
        {children}
    </Text>
);
