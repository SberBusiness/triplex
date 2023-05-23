import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'Suggest',
    [
        ['Default', {}],
        ['Error', {checkboxOptions: [{id: 'error', checked: true}]}],
        ['Disabled', {checkboxOptions: [{id: 'disabled', checked: true}]}],
        ['Loading', {checkboxOptions: [{id: 'loading', checked: true}]}],
        ['Closed with value', {checkboxOptions: [{id: 'valued', checked: true}]}],
        ['Closed with long value', {checkboxOptions: [{id: 'withLongValue', checked: true}]}],
        ['Not Found', {checkboxOptions: [{id: 'notFound', checked: true}]}, 500],
        ['Opened without value', {checkboxOptions: [{id: 'openedWithoutValue', checked: true}]}, 500],
        ['Opened with value', {checkboxOptions: [{id: 'openWithSelectedValue', checked: true}]}, 500],
        ['Opened with value and with query', {checkboxOptions: [{id: 'openWithSelectedValueWithSavedQuery', checked: true}]}, 500],
    ],
    encodeURI('/#!/Screenshot tests/Suggest')
);
