import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'Tabs',
    [
        ['Default', {}],
        ['Overflow', {inputOptions: [{id: 'count', value: '8'}]}, 1000],
        ['Unselected', {inputOptions: [{id: 'selectedTabId', value: ''}]}],
    ],
    encodeURI('/#!/Screenshot tests/Tabs')
);
