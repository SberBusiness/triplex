import React from 'react';
import {ELineType, ETextSize} from '@sberbusiness/triplex/components/Typography/enums';
import {Text} from '@sberbusiness/triplex/components/Typography/Text';

/**
 * Отображает текст подсказки. Например - "Ничего не найдено" или "Введите более 3 символов".
 */
export const SuggestMobileDropdownHint: React.FC = ({children}) => (
    <Text className="cssClass[suggestMobileDropdownHint]" size={ETextSize.B1} line={ELineType.EXTRA} tag="div">
        {children}
    </Text>
);
