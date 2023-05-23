import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'Tabs',
    [
        ['default'],
        ['overflow', {inputOptions: [{id: 'count', value: '8'}]}],
        ['focused', {checkboxOptions: [{id: 'focused', checked: true}]}],
        ['unselected', {inputOptions: [{id: 'selectedTabId', value: ''}]}],
        [
            'focused unselected',
            {
                checkboxOptions: [{id: 'focused', checked: true}],
                inputOptions: [{id: 'selectedTabId', value: ''}],
            },
        ],
    ],
    encodeURI('/#!/Screenshot tests/Tabs')
);
