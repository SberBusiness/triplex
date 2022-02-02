import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'Input',
    [
        ['Default state', {}],
        ['Filled state', {inputOptions: [{id: 'value', value: 'value'}]}],
        ['Disabled state', {checkboxOptions: [{id: 'disabled', checked: true}]}],
        ['Error state', {checkboxOptions: [{id: 'error', checked: true}]}],
    ],
    encodeURI('/#!/Screenshot tests/Input')
);
