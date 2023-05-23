import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'TabsFolder',
    [
        ['default'],
        ['disabled', {checkboxOptions: [{id: 'disabled', checked: true}]}],
        ['overflow', {inputOptions: [{id: 'count', value: '8'}]}],
        ['overflow disabled', {checkboxOptions: [{id: 'disabled', checked: true}], inputOptions: [{id: 'count', value: '8'}]}],
        ['unselected', {inputOptions: [{id: 'selectedTabId', value: ''}]}],
    ],
    encodeURI('/#!/Screenshot tests/TabsFolder')
);
