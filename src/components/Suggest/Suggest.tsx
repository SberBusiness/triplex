import React from 'react';
import {SuggestCustom} from '@sberbusiness/triplex/components/Suggest/SuggestCustom';
import {TSuggestProps, ISuggestOption} from './types';
import {MobileView} from '@sberbusiness/triplex/components/MobileView/MobileView';
import {SuggestMobile} from '@sberbusiness/triplex/components/Suggest/mobile/SuggestMobile';

/**
 * Выпадающий список с возможностью поиска по введённому значению.
 * @example
 *   <Suggest value={...} /> - опция имеет тип по умолчанию ISuggestOption
 *   <Suggest<MyOption> value={...} /> - опция имеет тип MyOption
 */
export function Suggest<T extends ISuggestOption>(props: TSuggestProps<T>): JSX.Element {
    const {
        disabled,
        error,
        isTooltipOpened,
        loading,
        onFilter,
        onFocus,
        onScrollEnd,
        onSelect,
        options,
        placeholder,
        tooltipHint,
        saveFilterOnFocus,
        showListSpinner,
        value,
        groupPosition,
    } = props;

    const handleSelect = (value?: ISuggestOption) => {
        onSelect(value as T);
    };

    return (
        <MobileView fallback={<SuggestCustom {...props} />}>
            <SuggestMobile
                disabled={disabled}
                dropdownHint={isTooltipOpened ? tooltipHint : ''}
                error={error}
                loadingDropdownInput={loading}
                loadingDropdownList={showListSpinner}
                onFilter={onFilter}
                onFocus={onFocus}
                onScrollEnd={onScrollEnd}
                onSelect={handleSelect}
                options={options}
                placeholder={placeholder}
                saveFilterOnFocus={saveFilterOnFocus}
                value={value}
                groupPosition={groupPosition}
            />
        </MobileView>
    );
}
