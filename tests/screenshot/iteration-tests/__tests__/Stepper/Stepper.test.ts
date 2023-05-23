import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'Stepper',
    [
        ['Default', {}],
        ['Selected', {inputOptions: [{id: 'selectedStepId', value: '0'}]}],
        ['Icon', {checkboxOptions: [{id: 'icon', checked: true}]}],
        ['Overflow', {inputOptions: [{id: 'count', value: '7'}]}],
        ['Disabled', {checkboxOptions: [{id: 'disabled', checked: true}]}],
        [
            'Selected Icon',
            {
                checkboxOptions: [{id: 'icon', checked: true}],
                inputOptions: [{id: 'selectedStepId', value: '0'}],
            },
        ],
        [
            'Selected Overflow',
            {
                inputOptions: [
                    {id: 'selectedStepId', value: '0'},
                    {id: 'count', value: '7'},
                ],
            },
        ],
        [
            'Selected Disabled',
            {
                checkboxOptions: [{id: 'disabled', checked: true}],
                inputOptions: [{id: 'selectedStepId', value: '0'}],
            },
        ],
        [
            'Icon Overflow',
            {
                checkboxOptions: [{id: 'icon', checked: true}],
                inputOptions: [{id: 'count', value: '7'}],
            },
        ],
        [
            'Icon Disabled',
            {
                checkboxOptions: [
                    {id: 'icon', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'Overflow Disabled',
            {
                checkboxOptions: [{id: 'disabled', checked: true}],
                inputOptions: [{id: 'count', value: '7'}],
            },
        ],
        [
            'Selected Icon Overflow',
            {
                checkboxOptions: [{id: 'icon', checked: true}],
                inputOptions: [
                    {id: 'selectedStepId', value: '0'},
                    {id: 'count', value: '7'},
                ],
            },
        ],
        [
            'Selected Icon Overflow',
            {
                checkboxOptions: [{id: 'icon', checked: true}],
                inputOptions: [
                    {id: 'selectedStepId', value: '0'},
                    {id: 'count', value: '7'},
                ],
            },
        ],
        [
            'Icon Overflow Disabled',
            {
                checkboxOptions: [
                    {id: 'icon', checked: true},
                    {id: 'disabled', checked: true},
                ],
                inputOptions: [{id: 'count', value: '7'}],
            },
        ],
        [
            'Icon Overflow Disabled',
            {
                checkboxOptions: [
                    {id: 'icon', checked: true},
                    {id: 'disabled', checked: true},
                ],
                inputOptions: [{id: 'count', value: '7'}],
            },
        ],
        [
            'Selected Icon Overflow Disabled',
            {
                checkboxOptions: [
                    {id: 'icon', checked: true},
                    {id: 'disabled', checked: true},
                ],
                inputOptions: [
                    {id: 'selectedStepId', value: '0'},
                    {id: 'count', value: '7'},
                ],
            },
        ],
    ],
    encodeURI('/#!/Screenshot tests/Stepper')
);
