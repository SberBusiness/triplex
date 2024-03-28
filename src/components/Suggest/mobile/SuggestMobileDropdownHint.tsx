import React from 'react';
import {ELineType, ETextSize} from '@sberbusiness/triplex/components/Typography/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';

/** Свойства компонента SuggestMobileDropdownHint. */
interface ISuggestMobileDropdownHintProps {
    children?: React.ReactNode;
}

/** Отображает текст подсказки. Например - "Ничего не найдено" или "Введите более 3 символов". */
export const SuggestMobileDropdownHint: React.FC<ISuggestMobileDropdownHintProps> = ({children}) => (
    <Text className="cssClass[suggestMobileDropdownHint]" size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
        {children}
    </Text>
);
