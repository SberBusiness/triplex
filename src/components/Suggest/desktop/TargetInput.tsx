import React from 'react';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {TestIds} from '../../../dataTestIds/dataTestIds';
import {ISuggestTargetProps} from '../types';

export function TargetInput<T>({
    disabled,
    tabIndex,
    dataTestId,
    focused,
    setRef,
    query,
    opened,
    loading,
    optionsLength,
    renderTargetInput,
    renderTargetLabel,
    ...rest
}: ISuggestTargetProps<T>) {
    return (
        <Input
            {...rest}
            ref={setRef}
            tabIndex={disabled ? -1 : tabIndex}
            value={query}
            disabled={disabled}
            data-test-id={dataTestId && `${dataTestId}${TestIds.Suggest.input}`}
        />
    );
}
