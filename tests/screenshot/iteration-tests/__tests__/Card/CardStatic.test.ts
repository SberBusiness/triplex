import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'CardStatic',
    [
        ['default'],
        ['paddingSM', {inputOptions: [{id: 'paddingSize', value: 'SM'}]}],
        ['roundingSM', {inputOptions: [{id: 'roundingSize', value: 'SM'}]}],
        [
            'paddingSM roundingSM',
            {
                inputOptions: [
                    {id: 'paddingSize', value: 'SM'},
                    {id: 'roundingSize', value: 'SM'},
                ],
            },
        ],
    ],
    encodeURI('/#!/Screenshot tests/CardStatic')
);
