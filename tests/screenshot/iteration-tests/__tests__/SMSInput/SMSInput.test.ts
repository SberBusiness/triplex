import {componentIterationTest} from '../../utils/componentIterationTest';

componentIterationTest(
    'SMSInput',
    [
        ['Default state'],
        [
            'Disabled state',
            {
                checkboxOptions: [{id: 'SMSInput-disabled', checked: true}],
            },
        ],
        [
            'Error state',
            {
                checkboxOptions: [{id: 'SMSInput-error', checked: true}],
            },
        ],
        [
            'Error disabled state',
            {
                checkboxOptions: [
                    {id: 'SMSInput-error', checked: true},
                    {id: 'SMSInput-disabled', checked: true},
                ],
            },
        ],
        [
            'Filled state',
            {
                checkboxOptions: [{id: 'SMSInput-filled', checked: true}],
            },
        ],
        [
            'Open tooltip state',
            {
                checkboxOptions: [{id: 'SMSInput-openTooltip', checked: true}],
            },
            1000,
        ],
        [
            'Countdown state',
            {
                checkboxOptions: [
                    {id: 'SMSInput-openTooltip', checked: true},
                    {id: 'SMSInput-codeRequested', checked: true},
                ],
            },
            1000,
        ],
    ],
    encodeURI('/#!/Screenshot tests/SMSInput')
);
