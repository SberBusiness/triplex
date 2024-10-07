import React, {useEffect, useState} from 'react';
import {Select, ISelectOption} from '@sberbusiness/triplex/components/Select/Select';

interface ISelectExampleProps {
    children?: never;
    disabled?: boolean;
    error?: boolean;
    loading?: boolean;
    placeholder: React.ReactNode;
    inputValue: string;
}

const options: Array<ISelectOption> = [
    {value: 'i1', id: 'select-option-test-0', label: 'Первый'},
    {value: 'i2', id: 'select-option-test-1', label: 'Второй'},
    {value: 'i3', id: 'select-option-test-2', label: 'Третий'},
    {value: 'i4', id: 'select-option-test-3', label: 'Четвертый'},
    {value: 'i5', id: 'select-option-test-4', label: 'Пятый'},
    {value: 'i6', id: 'select-option-test-5', label: 'Шестой'},
    {value: 'i7', id: 'select-option-test-6', label: 'Седьмой'},
    {value: 'i8', id: 'select-option-test-7', label: 'Восьмой'},
];

export const SelectExample: React.FC<ISelectExampleProps> = ({inputValue, ...selectProps}) => {
    const [value, setValue] = useState<ISelectOption | undefined>(undefined);

    useEffect(() => {
        setValue(options.filter((option) => option.value === inputValue)[0]);
    }, [inputValue]);

    return <Select value={value} onChange={setValue} options={options} {...selectProps} />;
};
