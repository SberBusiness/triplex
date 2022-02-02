import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'CardAction',
    [
        ['default'],
        ['paddingSM', {inputOptions: [{id: 'paddingSize', value: 'SM'}]}],
        ['roundingSM', {inputOptions: [{id: 'roundingSize', value: 'SM'}]}],
        ['selected', {checkboxOptions: [{id: 'selected', checked: true}]}],
        [
            'paddingSM roundingSM',
            {
                inputOptions: [
                    {id: 'paddingSize', value: 'SM'},
                    {id: 'roundingSize', value: 'SM'},
                ],
            },
        ],
        [
            'paddingSM selected',
            {
                inputOptions: [{id: 'paddingSize', value: 'SM'}],
                checkboxOptions: [{id: 'selected', checked: true}],
            },
        ],
        [
            'roundingSM selected',
            {
                inputOptions: [{id: 'roundingSize', value: 'SM'}],
                checkboxOptions: [{id: 'selected', checked: true}],
            },
        ],
        [
            'paddingSM roundingSM selected',
            {
                inputOptions: [
                    {id: 'paddingSize', value: 'SM'},
                    {id: 'roundingSize', value: 'SM'},
                ],
                checkboxOptions: [{id: 'selected', checked: true}],
            },
        ],
    ],
    encodeURI('/#!/Screenshot tests/CardAction')
);
