import React from 'react';
import {Input} from '@sberbusiness/triplex/components/Input/Input';
import {TestIds} from '../../../dataTestIds/dataTestIds';
import {ISuggestTargetProps} from '../types';

export function TargetInput<T>(props: ISuggestTargetProps<T>): JSX.Element {
    const {
        disabled,
        tabIndex,
        onClick,
        onChange,
        dataTestId,
        focused,
        setRef,
        query,
        onFocus,
        opened,
        loading,
        optionsLength,
        renderTargetInput,
        renderTargetLabel,
        ...rest
    } = props;
    return (
        <Input
            {...rest}
            ref={setRef}
            tabIndex={disabled ? -1 : tabIndex}
            value={query}
            disabled={disabled}
            onFocus={onFocus}
            onClick={onClick}
            onChange={onChange}
            data-test-id={dataTestId && `${dataTestId}${TestIds.Suggest.input}`}
        />
    );
}
