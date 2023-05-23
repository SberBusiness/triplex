import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'MonthYearPicker',
    [
        ['default'],
        ['filled', {inputOptions: [{id: 'value', value: '19700101'}]}],
        ['error', {checkboxOptions: [{id: 'error', checked: true}]}],
        ['disabled', {checkboxOptions: [{id: 'disabled', checked: true}]}],
        [
            'filled open',
            {
                checkboxOptions: [{id: 'focused', checked: true}],
                inputOptions: [{id: 'value', value: '19700101'}],
            },
            250,
        ],
        [
            'filled error',
            {
                checkboxOptions: [{id: 'error', checked: true}],
                inputOptions: [{id: 'value', value: '19700101'}],
            },
        ],
        [
            'filled disabled',
            {
                checkboxOptions: [{id: 'disabled', checked: true}],
                inputOptions: [{id: 'value', value: '19700101'}],
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
            'filled open reversed',
            {
                checkboxOptions: [
                    {id: 'focused', checked: true},
                    {id: 'reversed', checked: true},
                ],
                inputOptions: [{id: 'value', value: '19700101'}],
            },
            250,
        ],
        [
            'filled open error',
            {
                checkboxOptions: [
                    {id: 'focused', checked: true},
                    {id: 'error', checked: true},
                ],
                inputOptions: [{id: 'value', value: '19700101'}],
            },
            250,
        ],
        [
            'filled error disabled',
            {
                checkboxOptions: [
                    {id: 'error', checked: true},
                    {id: 'disabled', checked: true},
                ],
                inputOptions: [{id: 'value', value: '19700101'}],
            },
        ],
        [
            'filled open reversed error',
            {
                checkboxOptions: [
                    {id: 'focused', checked: true},
                    {id: 'reversed', checked: true},
                    {id: 'error', checked: true},
                ],
                inputOptions: [{id: 'value', value: '19700101'}],
            },
            250,
        ],
    ],
    encodeURI('/#!/Screenshot tests/MonthYearPicker')
);
