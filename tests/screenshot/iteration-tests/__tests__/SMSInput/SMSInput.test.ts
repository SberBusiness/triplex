import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'SMSInput',
    [
        ['Default state'],
        ['SM size', {inputOptions: [{id: 'size', value: 'SM'}]}],
        ['Filled state', {checkboxOptions: [{id: 'filled', checked: true}]}],
        ['Open tooltip state', {checkboxOptions: [{id: 'openTooltip', checked: true}]}, 1000],
        ['Error state', {checkboxOptions: [{id: 'error', checked: true}]}],
        ['Disabled state', {checkboxOptions: [{id: 'disabled', checked: true}]}],
        [
            'Error disabled state',
            {
                checkboxOptions: [
                    {id: 'error', checked: true},
                    {id: 'disabled', checked: true},
                ],
            },
        ],
        [
            'Countdown state',
            {
                checkboxOptions: [
                    {id: 'openTooltip', checked: true},
                    {id: 'codeRequested', checked: true},
                ],
            },
            1000,
        ],
    ],
    encodeURI('/#!/Screenshot tests/SMSInput')
);
