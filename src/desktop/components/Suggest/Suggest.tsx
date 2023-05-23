import React from 'react';
import {SuggestCustom} from '@sberbusiness/triplex/desktop/components/Suggest/SuggestCustom';
import {TSuggestProps, ISuggestOption} from './types';

/**
 * Выпадающий список с возможностью поиска по введённому значению.
 * @example
 *   <Suggest value={...} /> - опция имеет тип по умолчанию ISuggestOption
 *   <Suggest<MyOption> value={...} /> - опция имеет тип MyOption
 */
export function Suggest<T extends ISuggestOption>(props: TSuggestProps<T>): JSX.Element {
    return <SuggestCustom {...props} />;
}
