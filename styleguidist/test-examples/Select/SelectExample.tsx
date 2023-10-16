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
    {value: 'i1', label: 'Первый'},
    {value: 'i2', label: 'Второй'},
    {value: 'i3', label: 'Третий'},
    {value: 'i4', label: 'Четвертый'},
    {value: 'i5', label: 'Пятый'},
    {value: 'i6', label: 'Шестой'},
    {value: 'i7', label: 'Седьмой'},
    {value: 'i8', label: 'Восьмой'},
];

export const SelectExample: React.FC<ISelectExampleProps> = ({inputValue, ...selectProps}) => {
    const [value, setValue] = useState<ISelectOption | undefined>(undefined);

    useEffect(() => {
        setValue(options.filter((option) => option.value === inputValue)[0]);
    }, [inputValue]);

    return <Select value={value} onChange={setValue} options={options} {...selectProps} />;
};
