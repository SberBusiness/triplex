//TableBasicExampleHandlers.ts
import * as React from 'react';

export const handleClickRow = (rowKey: string): void => {
    alert(`Успешный клик по строчке с техническим индетификатором: ${String(rowKey)}`);
};

export const handleButtonClick = (e: React.SyntheticEvent): void => {
    handlePrevent(e);
    alert('Успешный клик');
};

export const handlePrevent = (e: React.SyntheticEvent): void => {
    e.stopPropagation();
};
