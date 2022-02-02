import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'MaskedInput',
    [
        ['default', {}],
        ['filled', {inputOptions: [{id: 'value', value: '1234567890'}]}],
        ['incomplete', {inputOptions: [{id: 'value', value: '12345'}]}],
        ['focused', {checkboxOptions: [{id: 'focused', checked: true}]}],
        ['error', {checkboxOptions: [{id: 'error', checked: true}]}],
        ['disabled', {checkboxOptions: [{id: 'disabled', checked: true}]}],
        [
            'filled focused',
            {
                inputOptions: [{id: 'value', value: '1234567890'}],
                checkboxOptions: [{id: 'focused', checked: true}],
            },
        ],
        [
            'filled error',
            {
                inputOptions: [{id: 'value', value: '1234567890'}],
                checkboxOptions: [{id: 'error', checked: true}],
            },
        ],
        [
            'filled disabled',
            {
                inputOptions: [{id: 'value', value: '1234567890'}],
                checkboxOptions: [{id: 'disabled', checked: true}],
            },
        ],
        [
            'incomplete focused',
            {
                inputOptions: [{id: 'value', value: '12345'}],
                checkboxOptions: [{id: 'focused', checked: true}],
            },
        ],
        [
            'incomplete error',
            {
                inputOptions: [{id: 'value', value: '12345'}],
                checkboxOptions: [{id: 'error', checked: true}],
            },
        ],
        [
            'incomplete disabled',
            {
                inputOptions: [{id: 'value', value: '12345'}],
                checkboxOptions: [{id: 'disabled', checked: true}],
            },
        ],
        [
            'focused error',
            {
                checkboxOptions: [
                    {id: 'focused', checked: true},
                    {id: 'error', checked: true},
                ],
            },
        ],
        [
            'focused disabled',
            {
                checkboxOptions: [
                    {id: 'focused', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'error disabled',
            {
                checkboxOptions: [
                    {id: 'error', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'filled focused error',
            {
                inputOptions: [{id: 'value', value: '1234567890'}],
                checkboxOptions: [
                    {id: 'focused', checked: true},
                    {id: 'error', checked: true},
                ],
            },
        ],
        [
            'filled error disabled',
            {
                inputOptions: [{id: 'value', value: '1234567890'}],
                checkboxOptions: [
                    {id: 'error', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'incomplete focused error',
            {
                inputOptions: [{id: 'value', value: '12345'}],
                checkboxOptions: [
                    {id: 'focused', checked: true},
                    {id: 'error', checked: true},
                ],
            },
        ],
        [
            'incomplete error disabled',
            {
                inputOptions: [{id: 'value', value: '12345'}],
                checkboxOptions: [
                    {id: 'error', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
    ],
    encodeURI('/#!/Screenshot tests/MaskedInput')
);
