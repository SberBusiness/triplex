import React from 'react';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {ISuggestTargetProps, ISuggestOption} from '../types';

export function TargetLabel<T extends ISuggestOption>({
    renderTargetLabel,
    renderTargetInput,
    tabIndex,
    focused,
    opened,
    optionsLength,
    value,
    query,
    setRef,
    loading,
    dataTestId,
    ...rest
}: ISuggestTargetProps<T>) {
    return <Input value={value?.label || ''} readOnly aria-hidden="true" {...rest} />;
}
