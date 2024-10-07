import React from 'react';
import {classnames} from '@sberbusiness/triplex/utils/classnames/classnames';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';
import {EFontType, ETextSize, ELineType} from '@sberbusiness/triplex/components/Typography/enums';

/** Свойства компонента SubValue. */
interface ISubValueProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Компонент SubValue. Предназначен для вывода нередактируемого значения совместно с компонентом SubLabel.
 * Должен лежать внутри компонента Col(колонка), который в свою очередь, в Row или SubRow.
 * Всё выводится в компоненте Field - с левой стороны SubLabel, справа SubValue.
 */
export const SubValue: React.FC<ISubValueProps> = ({children, className, ...rest}) => (
    <Text
        tag="div"
        className={classnames('cssClass[subValue]', className)}
        type={EFontType.GENERAL}
        size={ETextSize.B1}
        line={ELineType.EXTRA}
        {...rest}
    >
        {children}
    </Text>
);
